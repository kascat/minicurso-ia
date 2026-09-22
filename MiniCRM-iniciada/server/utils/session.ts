import { createHmac, timingSafeEqual } from 'node:crypto'

export const SESSION_COOKIE = 'minicrm_session'
export const SESSION_MAX_AGE = 8 * 60 * 60

export interface SessionPayload {
  userId: number
  exp: number
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('AUTH_SECRET não está definido.')
  }
  return secret
}

function assinar(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url')
}

export function createSessionToken(userId: number): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE
  const payload = Buffer.from(JSON.stringify({ userId, exp })).toString('base64url')
  return `${payload}.${assinar(payload)}`
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null

  const partes = token.split('.')
  if (partes.length !== 2) return null

  const [payload, assinatura] = partes
  if (!payload || !assinatura) return null

  const esperada = Buffer.from(assinar(payload))
  const recebida = Buffer.from(assinatura)
  if (esperada.length !== recebida.length || !timingSafeEqual(esperada, recebida)) {
    return null
  }

  try {
    const dados = JSON.parse(Buffer.from(payload, 'base64url').toString()) as SessionPayload
    if (typeof dados.userId !== 'number' || typeof dados.exp !== 'number') return null
    if (dados.exp < Math.floor(Date.now() / 1000)) return null
    return dados
  } catch {
    return null
  }
}
