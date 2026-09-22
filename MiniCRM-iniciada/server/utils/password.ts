import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const KEY_LENGTH = 64

export function hashPassword(senha: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(senha, salt, KEY_LENGTH).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(senha: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false

  const storedBuffer = Buffer.from(hash, 'hex')
  const derivedBuffer = scryptSync(senha, salt, KEY_LENGTH)

  if (storedBuffer.length !== derivedBuffer.length) return false

  return timingSafeEqual(storedBuffer, derivedBuffer)
}
