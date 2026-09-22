import { Prisma } from '@prisma/client'
import { prisma } from '../../utils/prisma'
import { leadSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = leadSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos.',
      data: { campos: parsed.error.flatten().fieldErrors }
    })
  }

  const { nome, email, telefone } = parsed.data

  const existente = await prisma.lead.findUnique({ where: { email } })
  if (existente) {
    throw createError({
      statusCode: 409,
      message: 'Já existe um lead com este e-mail.'
    })
  }

  try {
    const lead = await prisma.lead.create({
      data: { nome, email, telefone, status: 'novo' }
    })
    setResponseStatus(event, 201)
    return lead
  } catch (erro) {
    if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'Já existe um lead com este e-mail.'
      })
    }
    throw erro
  }
})
