import { describe, expect, it } from 'vitest'
import { leadSchema, loginSchema } from '../server/utils/validation'

describe('leadSchema', () => {
  const valido = {
    nome: 'Maria Silva',
    email: 'maria@exemplo.com',
    telefone: '(42) 99999-0000'
  }

  it('aceita um lead válido', () => {
    expect(leadSchema.safeParse(valido).success).toBe(true)
  })

  it('usa o status "novo" por padrão', () => {
    const resultado = leadSchema.parse(valido)
    expect(resultado.status).toBe('novo')
  })

  it('aceita um status permitido', () => {
    expect(leadSchema.safeParse({ ...valido, status: 'qualificado' }).success).toBe(true)
  })

  it('rejeita status inválido', () => {
    expect(leadSchema.safeParse({ ...valido, status: 'desconhecido' }).success).toBe(false)
  })

  it('rejeita nome com menos de 3 caracteres', () => {
    expect(leadSchema.safeParse({ ...valido, nome: 'Jo' }).success).toBe(false)
  })

  it('rejeita e-mail inválido', () => {
    expect(leadSchema.safeParse({ ...valido, email: 'invalido' }).success).toBe(false)
  })

  it('rejeita telefone curto', () => {
    expect(leadSchema.safeParse({ ...valido, telefone: '123' }).success).toBe(false)
  })

  it('remove espaços das pontas', () => {
    const resultado = leadSchema.parse({ ...valido, nome: '  Maria Silva  ' })
    expect(resultado.nome).toBe('Maria Silva')
  })
})

describe('loginSchema', () => {
  it('aceita credenciais válidas', () => {
    expect(loginSchema.safeParse({ email: 'admin@minicrm.com', senha: 'admin123' }).success).toBe(true)
  })

  it('rejeita e-mail inválido', () => {
    expect(loginSchema.safeParse({ email: 'invalido', senha: 'admin123' }).success).toBe(false)
  })

  it('rejeita senha curta', () => {
    expect(loginSchema.safeParse({ email: 'admin@minicrm.com', senha: '123' }).success).toBe(false)
  })
})
