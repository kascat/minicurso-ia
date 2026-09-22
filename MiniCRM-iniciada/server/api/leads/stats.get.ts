import { prisma } from '../../utils/prisma'
import { STATUS_LEAD } from '../../utils/validation'

const SETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000

export default defineEventHandler(async () => {
  const limite = new Date(Date.now() - SETE_DIAS_MS)

  const [total, ultimos7, agrupado] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { criadoEm: { gte: limite } } }),
    prisma.lead.groupBy({ by: ['status'], _count: { _all: true } })
  ])

  const porStatus = STATUS_LEAD.map((status) => {
    const encontrado = agrupado.find((item) => item.status === status)
    const quantidade = encontrado?._count._all ?? 0
    const percentual = total > 0 ? Math.round((quantidade / total) * 1000) / 10 : 0

    return { status, quantidade, percentual }
  })

  return { total, ultimos7, porStatus }
})
