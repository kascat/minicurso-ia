<script setup lang="ts">
const links = [
  { to: '/cadastro', label: 'Cadastro de leads' },
  { to: '/leads', label: 'Listagem de leads' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/exportar', label: 'Exportação' },
]
</script>

<template>
  <section class="rounded-lg bg-white p-8 shadow-sm">
    <h1 class="text-2xl font-bold">Bem-vindo ao MiniCRM</h1>
    <p class="mt-2 text-slate-600">
      Sistema interno para capturar e acompanhar leads da equipe comercial.
    </p>
    <nav class="mt-6 grid gap-3 sm:grid-cols-2">
      <a
        v-for="link in links"
        :key="link.to"
        :href="link.to"
        class="rounded-md border border-slate-200 p-4 hover:bg-slate-50"
      >
        {{ link.label }}
      </a>
    </nav>
  </section>
</template>
