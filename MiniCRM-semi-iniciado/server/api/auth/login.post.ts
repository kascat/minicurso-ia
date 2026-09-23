import { definirCookieSessao } from '../../../server/utils/session'
import { verificarSenha } from '../../../server/utils/password'
import { loginSchema } from '../../../server/utils/validation'

export default defineEventHandler(async (event) => {
  const corpo = await readBody(event)
  const resultado = loginSchema.safeParse(corpo)

  if (!resultado.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dados inválidos',
      data: resultado.error.flatten().fieldErrors,
    })
  }

  const { email, senha } = resultado.data
  const usuario = await prisma.user.findUnique({ where: { email } })

  if (!usuario || !verificarSenha(senha, usuario.senhaHash)) {
    throw createError({ statusCode: 401, statusMessage: 'E-mail ou senha incorretos' })
  }

  definirCookieSessao(event, usuario.id)

  return { id: usuario.id, nome: usuario.nome, email: usuario.email }
})