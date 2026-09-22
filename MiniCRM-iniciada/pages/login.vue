<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { entrar } = useAuth()

const email = ref('admin@minicrm.com')
const senha = ref('admin123')
const erro = ref('')
const carregando = ref(false)

async function onSubmit() {
  erro.value = ''
  carregando.value = true

  try {
    await entrar(email.value, senha.value)
    await navigateTo('/')
  } catch (e) {
    erro.value = mensagemErro(e, 'Não foi possível entrar.')
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <form class="card space-y-4" @submit.prevent="onSubmit">
    <div>
      <h2 class="text-lg font-semibold text-slate-900">Entrar</h2>
      <p class="mt-1 text-sm text-slate-600">Acesse com seu e-mail e senha.</p>
    </div>

    <div
      v-if="erro"
      class="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
      role="alert"
    >
      {{ erro }}
    </div>

    <div>
      <label class="label" for="email">E-mail</label>
      <input
        id="email"
        v-model="email"
        class="input"
        type="email"
        autocomplete="username"
        required
      >
    </div>

    <div>
      <label class="label" for="senha">Senha</label>
      <input
        id="senha"
        v-model="senha"
        class="input"
        type="password"
        autocomplete="current-password"
        required
      >
    </div>

    <button class="btn-primary w-full" type="submit" :disabled="carregando">
      {{ carregando ? 'Entrando...' : 'Entrar' }}
    </button>
  </form>
</template>
