export type ValorCsv = string | number | null | undefined

const SEPARADOR = ';'
const QUEBRA_LINHA = '\r\n'

function escaparCampo(valor: ValorCsv): string {
  if (valor === null || valor === undefined) return ''

  const texto = String(valor)
  if (/[";\r\n]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`
  }
  return texto
}

export function gerarCsv(cabecalho: string[], linhas: ValorCsv[][]): string {
  const todas = [cabecalho, ...linhas]
  return todas.map((linha) => linha.map(escaparCampo).join(SEPARADOR)).join(QUEBRA_LINHA)
}
