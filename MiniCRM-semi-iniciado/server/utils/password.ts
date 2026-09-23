import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export function hashSenha(senha: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(senha, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verificarSenha(senha: string, armazenado: string): boolean {
  const partes = armazenado.split(':')
  if (partes.length !== 2) return false
  const [salt, hash] = partes

  const hashCalculado = scryptSync(senha, salt, 64)
  const hashEsperado = Buffer.from(hash, 'hex')
  if (hashCalculado.length !== hashEsperado.length) return false
  return timingSafeEqual(hashCalculado, hashEsperado)
}