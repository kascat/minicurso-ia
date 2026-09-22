<template>
  <div class="space-y-6">
    <div class="card">
      <h1 class="text-2xl font-semibold text-slate-900">Bem-vindo ao MiniCRM</h1>
      <p class="mt-2 text-slate-600">
        Centralize o cadastro, o acompanhamento e a análise dos seus leads.
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink to="/cadastro" class="card transition hover:border-indigo-300 hover:shadow">
        <h2 class="font-medium text-slate-900">Cadastro</h2>
        <p class="mt-1 text-sm text-slate-600">Incluir um novo lead.</p>
      </NuxtLink>
      <NuxtLink to="/leads" class="card transition hover:border-indigo-300 hover:shadow">
        <h2 class="font-medium text-slate-900">Leads</h2>
        <p class="mt-1 text-sm text-slate-600">Consultar, buscar e filtrar.</p>
      </NuxtLink>
      <NuxtLink to="/dashboard" class="card transition hover:border-indigo-300 hover:shadow">
        <h2 class="font-medium text-slate-900">Dashboard</h2>
        <p class="mt-1 text-sm text-slate-600">Ver métricas de captação.</p>
      </NuxtLink>
      <NuxtLink to="/exportar" class="card transition hover:border-indigo-300 hover:shadow">
        <h2 class="font-medium text-slate-900">Exportar</h2>
        <p class="mt-1 text-sm text-slate-600">Baixar os leads em CSV.</p>
      </NuxtLink>
    </div>
  </div>
</template>
