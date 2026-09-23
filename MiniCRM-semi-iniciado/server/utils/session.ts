import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'
import { getCookie, setCookie, deleteCookie } from 'h3'

export const COOKIE_NAME = 'minicrm_session'
export const DURACAO_MILISEGUNDOS = 8 * 60 * 60 * 1000

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: DURACAO_MILISEGUNDOS / 1000,
}

function segredoSessao(): string {
  const segredo = process.env.AUTH_SECRET
  if (!segredo || segredo.length < 32) {
    throw new Error('AUTH_SECRET não configurado ou muito curto')
  }
  return segredo
}

function assinar(payload: string): Buffer {
  return createHmac('sha256', segredoSessao()).update(payload).digest()
}

function paraBase64Url(valor: string | Buffer): string {
  return Buffer.isBuffer(valor)
    ? valor.toString('base64url')
    : Buffer.from(valor, 'utf8').toString('base64url')
}

function deBase64Url(valor: string): Buffer {
  return Buffer.from(valor, 'base64url')
}

export function criarTokenSessao(userId: number): string {
  const exp = Date.now() + DURACAO_MILISEGUNDOS
  const payload = paraBase64Url(JSON.stringify({ uid: userId, exp }))
  return `${payload}.${paraBase64Url(assinar(payload))}`
}

export function verificarTokenSessao(token: string): number | null {
  const partes = token.split('.')
  if (partes.length !== 2) return null
  const [payload, assinatura] = partes

  const assinaturaEsperada = assinar(payload)
  const assinaturaRecebida = deBase64Url(assinatura)
  if (
    assinaturaEsperada.length !== assinaturaRecebida.length ||
    !timingSafeEqual(assinaturaEsperada, assinaturaRecebida)
  ) {
    return null
  }

  try {
    const dados = JSON.parse(deBase64Url(payload).toString('utf8')) as {
      uid?: number
      exp?: number
    }
    if (typeof dados.uid !== 'number' || typeof dados.exp !== 'number') return null
    if (Date.now() > dados.exp) return null
    return dados.uid
  } catch {
    return null
  }
}

export function obterIdUsuarioNoEvento(event: H3Event): number | null {
  const token = getCookie(event, COOKIE_NAME)
  if (!token) return null
  return verificarTokenSessao(token)
}

export function definirCookieSessao(event: H3Event, userId: number): void {
  setCookie(event, COOKIE_NAME, criarTokenSessao(userId), COOKIE_OPTIONS)
}

export function limparCookieSessao(event: H3Event): void {
  deleteCookie(event, COOKIE_NAME, COOKIE_OPTIONS)
}