export default defineNuxtRouteMiddleware(async (to) => {
  const { carregar } = useAuth()
  const usuario = await carregar()

  if (!usuario && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (usuario && to.path === '/login') {
    return navigateTo('/')
  }
})
