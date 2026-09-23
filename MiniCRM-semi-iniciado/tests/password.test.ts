import { describe, expect, it } from 'vitest'
import { hashSenha, verificarSenha } from '../server/utils/password'

describe('hashSenha', () => {
  it('gera um hash no formato salt:hash', () => {
    const resultado = hashSenha('minha-senha')
    const partes = resultado.split(':')

    expect(partes).toHaveLength(2)
    expect(partes[0]).toMatch(/^[0-9a-f]{32}$/)
    expect(partes[1]).toMatch(/^[0-9a-f]{128}$/)
  })

  it('gera hashes diferentes para a mesma senha (salt aleatório)', () => {
    expect(hashSenha('admin123')).not.toBe(hashSenha('admin123'))
  })
})

describe('verificarSenha', () => {
  it('aceita a senha correta', () => {
    const hash = hashSenha('admin123')
    expect(verificarSenha('admin123', hash)).toBe(true)
  })

  it('rejeita senha incorreta', () => {
    const hash = hashSenha('admin123')
    expect(verificarSenha('outra-senha', hash)).toBe(false)
  })

  it('retorna false para formato inválido', () => {
    expect(verificarSenha('senha', 'sem-salt')).toBe(false)
  })
})