import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, message: 'Identificador inválido.' })
  }

  const lead = await prisma.lead.findUnique({ where: { id } })

  if (!lead) {
    throw createError({ statusCode: 404, message: 'Lead não encontrado.' })
  }

  await prisma.lead.delete({ where: { id } })

  setResponseStatus(event, 204)
  return null
})
