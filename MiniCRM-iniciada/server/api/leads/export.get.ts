import { prisma } from '../../utils/prisma'
import { gerarCsv } from '../../utils/csv'

export default defineEventHandler(async (event) => {
  const leads = await prisma.lead.findMany({ orderBy: { id: 'asc' } })

  const csv = gerarCsv(
    ['id', 'nome', 'email', 'telefone', 'status', 'criadoEm'],
    leads.map((lead) => [
      lead.id,
      lead.nome,
      lead.email,
      lead.telefone,
      lead.status,
      lead.criadoEm.toISOString()
    ])
  )

  setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
  setHeader(event, 'Content-Disposition', 'attachment; filename="leads.csv"')

  return `\uFEFF${csv}`
})
