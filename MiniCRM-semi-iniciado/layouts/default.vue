<script setup lang="ts">
const { data: usuario } = await useFetch<{ id: number; nome: string; email: string }>(
  '/api/auth/me',
)

async function sair() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <header class="bg-white shadow-sm">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span class="text-lg font-semibold">MiniCRM</span>
        <div v-if="usuario" class="flex items-center gap-4">
          <span class="text-sm text-slate-600">Olá, {{ usuario.nome }}</span>
          <button
            type="button"
            class="rounded-md border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
            @click="sair"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
    <main class="mx-auto max-w-5xl px-4 py-8">
      <slot />
    </main>
  </div>
</template>
