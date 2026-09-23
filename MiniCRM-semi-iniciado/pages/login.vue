<script setup lang="ts">
import type { FetchError } from 'ofetch'

definePageMeta({ layout: 'auth' })

const email = ref('')
const senha = ref('')
const carregando = ref(false)
const erro = ref('')

async function entrar() {
  erro.value = ''
  carregando.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, senha: senha.value },
    })
    await navigateTo('/')
  } catch (err) {
    const fetchErr = err as FetchError
    erro.value = (fetchErr.data as { statusMessage?: string } | undefined)?.statusMessage
      ?? (err instanceof Error ? err.message : 'Não foi possível entrar')
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <section class="rounded-lg bg-white p-8 shadow-sm">
    <h1 class="text-2xl font-bold">Entrar no MiniCRM</h1>
    <p class="mt-1 text-sm text-slate-600">Informe seu e-mail e senha para acessar.</p>

    <form class="mt-6 space-y-4" @submit.prevent="entrar">
      <div>
        <label for="email" class="block text-sm font-medium text-slate-700">E-mail</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="username"
          required
          placeholder="voce@empresa.com"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
        >
      </div>

      <div>
        <label for="senha" class="block text-sm font-medium text-slate-700">Senha</label>
        <input
          id="senha"
          v-model="senha"
          type="password"
          name="senha"
          autocomplete="current-password"
          required
          placeholder="Sua senha"
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
        >
      </div>

      <p v-if="erro" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{{ erro }}</p>

      <button
        type="submit"
        :disabled="carregando"
        class="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ carregando ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
  </section>
</template>