import { describe, expect, it } from 'vitest'
import { criarTokenSessao, verificarTokenSessao } from '../server/utils/session'

describe('criarTokenSessao', () => {
  it('gera um token no formato payload.assinatura', () => {
    const token = criarTokenSessao(7)
    expect(token.split('.')).toHaveLength(2)
  })
})

describe('verificarTokenSessao', () => {
  it('devolve o id do usuário para um token válido', () => {
    const token = criarTokenSessao(7)
    expect(verificarTokenSessao(token)).toBe(7)
  })

  it('retorna null para um token adulterado', () => {
    const token = criarTokenSessao(7)
    const [payload] = token.split('.')
    const adulterado = `${payload}.${'x'.repeat(43)}`
    expect(verificarTokenSessao(adulterado)).toBeNull()
  })

  it('retorna null para formato inválido', () => {
    expect(verificarTokenSessao('sem-assinatura')).toBeNull()
  })

  it('retorna null para payload inválido', () => {
    const token = criarTokenSessao(7)
    const [, assinatura] = token.split('.')
    const corruptoTam = Buffer.from(JSON.stringify({ uid: 'x' })).toString('base64url')
    expect(verificarTokenSessao(`${corruptoTam}.${assinatura}`)).toBeNull()
  })
})