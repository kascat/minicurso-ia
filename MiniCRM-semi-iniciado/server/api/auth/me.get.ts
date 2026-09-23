import { obterIdUsuarioNoEvento } from '../../../server/utils/session'

export default defineEventHandler(async (event) => {
  const userId = obterIdUsuarioNoEvento(event)
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Não autenticado' })
  }

  const usuario = await prisma.user.findUnique({ where: { id: userId } })
  if (!usuario) {
    throw createError({ statusCode: 401, statusMessage: 'Não autenticado' })
  }

  return { id: usuario.id, nome: usuario.nome, email: usuario.email }
})