export default defineNuxtRouteMiddleware(async (to) => {
  const rotasPublicas = ['/login']
  if (rotasPublicas.includes(to.path)) {
    return
  }

  const fetchAutenticado = useRequestFetch()
  let autenticado = false

  try {
    await fetchAutenticado('/api/auth/me')
    autenticado = true
  } catch {
    autenticado = false
  }

  if (!autenticado) {
    return navigateTo('/login')
  }
})