<script setup lang="ts">
const { usuario, sair } = useAuth()

const links = [
  { to: '/', label: 'Início' },
  { to: '/cadastro', label: 'Cadastro' },
  { to: '/leads', label: 'Leads' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/exportar', label: 'Exportar' }
]

const saindo = ref(false)

async function onSair() {
  saindo.value = true
  try {
    await sair()
  } finally {
    saindo.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NuxtLink to="/" class="text-lg font-semibold text-indigo-700">
          MiniCRM
        </NuxtLink>
        <nav class="flex items-center gap-1">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-3">
          <span v-if="usuario" class="hidden text-sm text-slate-600 sm:inline">
            {{ usuario.nome }}
          </span>
          <button class="btn-secondary" type="button" :disabled="saindo" @click="onSair">
            Sair
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <slot />
    </main>

    <footer class="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
      MiniCRM — sistema interno de gestão de leads
    </footer>
  </div>
</template>
