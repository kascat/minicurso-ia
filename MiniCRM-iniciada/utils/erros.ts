interface ErroApi {
  statusMessage?: string
  message?: string
  data?: {
    statusMessage?: string
    message?: string
    campos?: Record<string, string[]>
  }
}

export function mensagemErro(erro: unknown, padrao: string): string {
  const e = erro as ErroApi

  const campos = e?.data?.campos
  if (campos) {
    const primeiro = Object.values(campos).flat()[0]
    if (primeiro) return primeiro
  }

  return e?.data?.statusMessage || e?.data?.message || e?.statusMessage || e?.message || padrao
}
