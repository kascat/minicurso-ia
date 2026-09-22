export default defineEventHandler((event) => {
  const usuario = event.context.user

  if (!usuario) {
    throw createError({ statusCode: 401, message: 'Não autenticado.' })
  }

  return usuario
})
