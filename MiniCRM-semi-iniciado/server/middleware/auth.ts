import { getRequestURL } from 'h3'
import { obterIdUsuarioNoEvento } from '../../server/utils/session'

export default defineEventHandler((event) => {
  const url = getRequestURL(event).pathname
  if (!url.startsWith('/api/') || url.startsWith('/api/auth/')) {
    return
  }

  const userId = obterIdUsuarioNoEvento(event)
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Não autenticado' })
  }

  event.context.userId = userId
})