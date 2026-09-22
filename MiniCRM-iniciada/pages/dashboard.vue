<script setup lang="ts">
interface StatusContagem {
  status: string
  quantidade: number
  percentual: number
}

interface Estatisticas {
  total: number
  ultimos7: number
  porStatus: StatusContagem[]
}

const classesBarra: Record<string, string> = {
  novo: 'bg-blue-500',
  contatado: 'bg-amber-500',
  qualificado: 'bg-emerald-500',
  perdido: 'bg-rose-500'
}

const stats = ref<Estatisticas | null>(null)
const carregando = ref(true)
const erro = ref('')

onMounted(async () => {
  try {
    stats.value = await $fetch<Estatisticas>('/api/leads/stats')
  } catch (e) {
    erro.value = mensagemErro(e, 'Não foi possível carregar as estatísticas.')
  } finally {
    carregando.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900">Dashboard</h1>
      <p class="mt-1 text-sm text-slate-600">Visão consolidada da captação de leads.</p>
    </div>

    <div
      v-if="erro"
      class="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
      role="alert"
    >
      {{ erro }}
    </div>

    <div v-if="carregando" class="card text-center text-sm text-slate-500">
      Carregando estatísticas...
    </div>

    <template v-else-if="stats">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="card">
          <p class="text-sm text-slate-500">Total de leads</p>
          <p class="mt-1 text-3xl font-semibold text-slate-900">{{ stats.total }}</p>
        </div>
        <div class="card">
          <p class="text-sm text-slate-500">Leads nos últimos 7 dias</p>
          <p class="mt-1 text-3xl font-semibold text-slate-900">{{ stats.ultimos7 }}</p>
        </div>
      </div>

      <div class="card">
        <h2 class="text-lg font-semibold text-slate-900">Distribuição por status</h2>

        <p v-if="stats.total === 0" class="mt-2 text-sm text-slate-500">
          Ainda não há leads cadastrados.
        </p>

        <ul v-else class="mt-4 space-y-4">
          <li v-for="item in stats.porStatus" :key="item.status">
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium text-slate-700">{{ rotuloStatus(item.status) }}</span>
              <span class="text-slate-500">
                {{ item.quantidade }} ({{ item.percentual }}%)
              </span>
            </div>
            <div class="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full"
                :class="classesBarra[item.status] ?? 'bg-slate-400'"
                :style="{ width: `${item.percentual}%` }"
              />
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
