import { prisma } from '../utils/prisma'
import { SESSION_COOKIE, verifySessionToken } from '../utils/session'

export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname
  if (!pathname.startsWith('/api/')) return

  const token = getCookie(event, SESSION_COOKIE)
  const sessao = verifySessionToken(token)

  if (sessao) {
    const usuario = await prisma.user.findUnique({
      where: { id: sessao.userId },
      select: { id: true, nome: true, email: true }
    })
    if (usuario) {
      event.context.user = usuario
    }
  }

  if (pathname.startsWith('/api/auth/')) return

  if (!event.context.user) {
    throw createError({ statusCode: 401, message: 'Não autenticado.' })
  }
})
