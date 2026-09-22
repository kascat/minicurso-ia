interface Usuario {
  id: number
  nome: string
  email: string
}

export function useAuth() {
  const usuario = useState<Usuario | null>('auth:usuario', () => null)
  const carregado = useState<boolean>('auth:carregado', () => false)

  async function carregar(forcar = false): Promise<Usuario | null> {
    if (carregado.value && !forcar) return usuario.value

    try {
      usuario.value = await useRequestFetch()<Usuario>('/api/auth/me')
    } catch {
      usuario.value = null
    } finally {
      carregado.value = true
    }

    return usuario.value
  }

  async function entrar(email: string, senha: string): Promise<Usuario> {
    const dados = await $fetch<Usuario>('/api/auth/login', {
      method: 'POST',
      body: { email, senha }
    })
    usuario.value = dados
    carregado.value = true
    return dados
  }

  async function sair(): Promise<void> {
    await $fetch('/api/auth/logout', { method: 'POST' })
    usuario.value = null
    carregado.value = true
    await navigateTo('/login')
  }

  return { usuario, carregar, entrar, sair }
}
