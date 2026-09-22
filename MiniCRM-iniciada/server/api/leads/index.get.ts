import type { Prisma } from '@prisma/client'
import { prisma } from '../../utils/prisma'
import { STATUS_LEAD, type StatusLead } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const busca = typeof query.busca === 'string' ? query.busca.trim() : ''
  const status = typeof query.status === 'string' ? query.status.trim() : ''

  const where: Prisma.LeadWhereInput = {}

  if (busca) {
    where.OR = [{ nome: { contains: busca } }, { email: { contains: busca } }]
  }

  if (status && (STATUS_LEAD as readonly string[]).includes(status)) {
    where.status = status as StatusLead
  }

  return prisma.lead.findMany({
    where,
    orderBy: { criadoEm: 'desc' }
  })
})
