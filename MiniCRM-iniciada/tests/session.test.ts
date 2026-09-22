import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import {
  createSessionToken,
  verifySessionToken,
  SESSION_MAX_AGE
} from '../server/utils/session'

beforeAll(() => {
  process.env.AUTH_SECRET = 'segredo-de-teste'
})

afterEach(() => {
  process.env.AUTH_SECRET = 'segredo-de-teste'
  vi.useRealTimers()
})

describe('token de sessão', () => {
  it('cria e valida um token', () => {
    const token = createSessionToken(7)
    const sessao = verifySessionToken(token)

    expect(sessao).not.toBeNull()
    expect(sessao?.userId).toBe(7)
  })

  it('rejeita token ausente ou malformado', () => {
    expect(verifySessionToken(undefined)).toBeNull()
    expect(verifySessionToken('')).toBeNull()
    expect(verifySessionToken('sem-assinatura')).toBeNull()
    expect(verifySessionToken('a.b.c')).toBeNull()
  })

  it('rejeita token adulterado', () => {
    const token = createSessionToken(7)
    const [payload] = token.split('.')
    const adulterado = `${payload}.assinatura-falsa`

    expect(verifySessionToken(adulterado)).toBeNull()
  })

  it('rejeita token assinado com outro segredo', () => {
    const token = createSessionToken(7)
    process.env.AUTH_SECRET = 'outro-segredo'

    expect(verifySessionToken(token)).toBeNull()
  })

  it('rejeita token expirado', () => {
    const token = createSessionToken(7)

    vi.useFakeTimers()
    vi.setSystemTime(Date.now() + (SESSION_MAX_AGE + 60) * 1000)

    expect(verifySessionToken(token)).toBeNull()
  })
})
