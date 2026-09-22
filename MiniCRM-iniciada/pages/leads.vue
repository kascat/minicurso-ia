<script setup lang="ts">
interface Lead {
  id: number
  nome: string
  email: string
  telefone: string
  status: string
  criadoEm: string
}

const STATUS = [
  { valor: '', rotulo: 'Todos os status' },
  { valor: 'novo', rotulo: 'Novo' },
  { valor: 'contatado', rotulo: 'Contatado' },
  { valor: 'qualificado', rotulo: 'Qualificado' },
  { valor: 'perdido', rotulo: 'Perdido' }
]

const classesStatus: Record<string, string> = {
  novo: 'bg-blue-100 text-blue-800',
  contatado: 'bg-amber-100 text-amber-800',
  qualificado: 'bg-emerald-100 text-emerald-800',
  perdido: 'bg-rose-100 text-rose-800'
}

const busca = ref('')
const status = ref('')
const leads = ref<Lead[]>([])
const carregando = ref(true)
const erro = ref('')
const sucesso = ref('')

const leadParaExcluir = ref<Lead | null>(null)
const excluindo = ref(false)

async function carregar() {
  carregando.value = true
  erro.value = ''

  try {
    leads.value = await $fetch<Lead[]>('/api/leads', {
      query: {
        busca: busca.value || undefined,
        status: status.value || undefined
      }
    })
  } catch (e) {
    erro.value = mensagemErro(e, 'Não foi possível carregar os leads.')
  } finally {
    carregando.value = false
  }
}

function confirmarExclusao(lead: Lead) {
  leadParaExcluir.value = lead
}

function cancelarExclusao() {
  if (!excluindo.value) {
    leadParaExcluir.value = null
  }
}

async function executarExclusao() {
  const lead = leadParaExcluir.value
  if (!lead) return

  excluindo.value = true
  erro.value = ''
  sucesso.value = ''

  try {
    await $fetch(`/api/leads/${lead.id}`, { method: 'DELETE' })
    leadParaExcluir.value = null
    sucesso.value = `Lead "${lead.nome}" excluído com sucesso.`
    await carregar()
  } catch (e) {
    erro.value = mensagemErro(e, 'Não foi possível excluir o lead.')
  } finally {
    excluindo.value = false
  }
}

onMounted(carregar)

let temporizador: ReturnType<typeof setTimeout> | undefined
watch([busca, status], () => {
  clearTimeout(temporizador)
  temporizador = setTimeout(carregar, 300)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900">Leads</h1>
        <p class="mt-1 text-sm text-slate-600">Consulte, busque e filtre os contatos cadastrados.</p>
      </div>
      <NuxtLink to="/cadastro" class="btn-primary">Novo lead</NuxtLink>
    </div>

    <div class="card grid gap-4 sm:grid-cols-2">
      <div>
        <label class="label" for="busca">Buscar por nome ou e-mail</label>
        <input
          id="busca"
          v-model="busca"
          class="input"
          type="search"
          placeholder="Digite para buscar..."
        >
      </div>
      <div>
        <label class="label" for="status">Status</label>
        <select id="status" v-model="status" class="input">
          <option v-for="opcao in STATUS" :key="opcao.valor" :value="opcao.valor">
            {{ opcao.rotulo }}
          </option>
        </select>
      </div>
    </div>

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

    <div class="card overflow-hidden p-0">
      <div v-if="carregando" class="p-6 text-center text-sm text-slate-500">
        Carregando leads...
      </div>

      <div v-else-if="leads.length === 0" class="p-6 text-center text-sm text-slate-500">
        Nenhum lead encontrado.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-4 py-3">Nome</th>
              <th class="px-4 py-3">E-mail</th>
              <th class="px-4 py-3">Telefone</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Criado em</th>
              <th class="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="lead in leads" :key="lead.id" class="hover:bg-slate-50">
              <td class="px-4 py-3 font-medium text-slate-900">{{ lead.nome }}</td>
              <td class="px-4 py-3 text-slate-600">{{ lead.email }}</td>
              <td class="px-4 py-3 text-slate-600">{{ lead.telefone }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex rounded-full px-2 py-1 text-xs font-medium"
                  :class="classesStatus[lead.status] ?? 'bg-slate-100 text-slate-700'"
                >
                  {{ rotuloStatus(lead.status) }}
                </span>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ formatarData(lead.criadoEm) }}</td>
              <td class="px-4 py-3 text-right">
                <button
                  type="button"
                  class="inline-flex items-center gap-1 rounded-md p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                  title="Excluir lead"
                  aria-label="Excluir lead"
                  @click="confirmarExclusao(lead)"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.5 3.5h3M4.5 5.5h11M7 5.5v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-10M9 8.5v4M11 8.5v4"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="leadParaExcluir"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-exclusao"
      @click.self="cancelarExclusao"
    >
      <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 id="titulo-exclusao" class="text-lg font-semibold text-slate-900">
          Excluir lead
        </h2>
        <p class="mt-2 text-sm text-slate-600">
          Tem certeza de que deseja excluir o lead
          <strong class="text-slate-900">{{ leadParaExcluir.nome }}</strong>?
          Essa ação não pode ser desfeita.
        </p>
        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            class="btn-secondary"
            :disabled="excluindo"
            @click="cancelarExclusao"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="excluindo"
            @click="executarExclusao"
          >
            {{ excluindo ? 'Excluindo...' : 'Excluir' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
