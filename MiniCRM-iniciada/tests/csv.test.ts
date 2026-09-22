import { describe, expect, it } from 'vitest'
import { gerarCsv } from '../server/utils/csv'

const CABECALHO = ['id', 'nome', 'email', 'telefone', 'status', 'criadoEm']

describe('gerarCsv', () => {
  it('usa ponto e vírgula como separador', () => {
    const csv = gerarCsv(CABECALHO, [[1, 'Ana', 'ana@exemplo.com', '42999', 'novo', '2026-01-01']])
    expect(csv).toContain('id;nome;email;telefone;status;criadoEm')
    expect(csv).toContain('1;Ana;ana@exemplo.com;42999;novo;2026-01-01')
  })

  it('separa linhas com CRLF', () => {
    const csv = gerarCsv(CABECALHO, [])
    expect(csv).toBe(CABECALHO.join(';'))
    const comLinha = gerarCsv(CABECALHO, [[1, 'Ana', 'a@b.com', '1', 'novo', 'x']])
    expect(comLinha.split('\r\n')).toHaveLength(2)
  })

  it('escapa campos que contêm ponto e vírgula', () => {
    const csv = gerarCsv(['nome'], [['Silva; Maria']])
    expect(csv).toContain('"Silva; Maria"')
  })

  it('escapa aspas duplicando-as', () => {
    const csv = gerarCsv(['nome'], [['Maria "Mia" Silva']])
    expect(csv).toContain('"Maria ""Mia"" Silva"')
  })

  it('escapa quebras de linha', () => {
    const csv = gerarCsv(['obs'], [['linha1\nlinha2']])
    expect(csv).toContain('"linha1\nlinha2"')
  })

  it('trata nulos e indefinidos como vazio', () => {
    const csv = gerarCsv(['a', 'b', 'c'], [[null, undefined, 'x']])
    expect(csv).toBe('a;b;c\r\n;;x')
  })

  it('converte números para texto', () => {
    const csv = gerarCsv(['id'], [[42]])
    expect(csv).toBe('id\r\n42')
  })
})
