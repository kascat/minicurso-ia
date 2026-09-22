import { describe, expect, it } from 'vitest'
import { formatarTelefone } from '../utils/formato'

describe('formatarTelefone', () => {
  it('retorna vazio para entrada vazia', () => {
    expect(formatarTelefone('')).toBe('')
  })

  it('formata telefone fixo de 10 dígitos', () => {
    expect(formatarTelefone('1198765432')).toBe('(11) 9876-5432')
  })

  it('formata celular de 11 dígitos', () => {
    expect(formatarTelefone('11987654321')).toBe('(11) 98765-4321')
  })

  it('ignora caracteres não numéricos', () => {
    expect(formatarTelefone('(11) 98765-4321')).toBe('(11) 98765-4321')
  })

  it('limita a 11 dígitos', () => {
    expect(formatarTelefone('11987654321099')).toBe('(11) 98765-4321')
  })
})
