const ROTULOS_STATUS: Record<string, string> = {
  novo: 'Novo',
  contatado: 'Contatado',
  qualificado: 'Qualificado',
  perdido: 'Perdido'
}

export function formatarData(valor: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(valor))
}

export function rotuloStatus(status: string): string {
  return ROTULOS_STATUS[status] ?? status
}
