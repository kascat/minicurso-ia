<script setup lang="ts">
const nome = ref('')
const email = ref('')
const telefone = ref('')
const telefoneMascarado = computed({
  get: () => telefone.value,
  set: (valor: string) => {
    telefone.value = formatarTelefone(valor)
  }
})
const erro = ref('')
const sucesso = ref('')
const carregando = ref(false)

async function onSubmit() {
  erro.value = ''
  sucesso.value = ''
  carregando.value = true

  try {
    await $fetch('/api/leads', {
      method: 'POST',
      body: { nome: nome.value, email: email.value, telefone: telefone.value }
    })
    sucesso.value = 'Lead cadastrado com sucesso.'
    nome.value = ''
    email.value = ''
    telefone.value = ''
  } catch (e) {
    erro.value = mensagemErro(e, 'Não foi possível cadastrar o lead.')
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-xl space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900">Cadastro de lead</h1>
      <p class="mt-1 text-sm text-slate-600">Inclua um novo contato de potencial cliente.</p>
    </div>

    <form class="card space-y-4" @submit.prevent="onSubmit">
      <div
        v-if="erro"
        class="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
        role="alert"
      >
        {{ erro }}
      </div>

      <div
        v-if="sucesso"
        class="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
        role="status"
      >
        {{ sucesso }}
      </div>

      <div>
        <label class="label" for="nome">Nome completo</label>
        <input id="nome" v-model="nome" class="input" type="text" required>
      </div>

      <div>
        <label class="label" for="email">E-mail</label>
        <input id="email" v-model="email" class="input" type="email" required>
      </div>

      <div>
        <label class="label" for="telefone">Telefone</label>
        <input id="telefone" v-model="telefoneMascarado" class="input" type="tel" inputmode="tel" placeholder="(11) 99999-9999" maxlength="15" required>
      </div>

      <button class="btn-primary w-full" type="submit" :disabled="carregando">
        {{ carregando ? 'Salvando...' : 'Cadastrar lead' }}
      </button>
    </form>
  </div>
</template>
