import { prisma } from '../../utils/prisma'
import { verifyPassword } from '../../utils/password'
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '../../utils/session'
import { loginSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos.',
      data: { campos: parsed.error.flatten().fieldErrors }
    })
  }

  const { email, senha } = parsed.data
  const usuario = await prisma.user.findUnique({ where: { email } })

  if (!usuario || !verifyPassword(senha, usuario.senhaHash)) {
    throw createError({
      statusCode: 401,
      message: 'E-mail ou senha inválidos.'
    })
  }

  const token = createSessionToken(usuario.id)
  setCookie(event, SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE
  })

  return { id: usuario.id, nome: usuario.nome, email: usuario.email }
})
