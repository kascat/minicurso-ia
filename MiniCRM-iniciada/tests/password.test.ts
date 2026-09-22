import { describe, expect, it } from 'vitest'
import { hashPassword, verifyPassword } from '../server/utils/password'

describe('hashPassword / verifyPassword', () => {
  it('gera um hash no formato salt:hash', () => {
    const hash = hashPassword('admin123')
    const partes = hash.split(':')

    expect(partes).toHaveLength(2)
    expect(partes[0]).toMatch(/^[0-9a-f]{32}$/)
    expect(partes[1]).toMatch(/^[0-9a-f]{128}$/)
  })

  it('não armazena a senha em texto puro', () => {
    const hash = hashPassword('admin123')
    expect(hash).not.toContain('admin123')
  })

  it('aceita a senha correta', () => {
    const hash = hashPassword('admin123')
    expect(verifyPassword('admin123', hash)).toBe(true)
  })

  it('rejeita a senha incorreta', () => {
    const hash = hashPassword('admin123')
    expect(verifyPassword('outra-senha', hash)).toBe(false)
  })

  it('gera hashes diferentes para a mesma senha (salt aleatório)', () => {
    expect(hashPassword('admin123')).not.toBe(hashPassword('admin123'))
  })

  it('rejeita hash malformado sem lançar erro', () => {
    expect(verifyPassword('admin123', 'invalido')).toBe(false)
  })
})
