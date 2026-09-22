<template>
  <div class="mx-auto max-w-xl space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900">Exportar leads</h1>
      <p class="mt-1 text-sm text-slate-600">
        Baixe todos os leads em um arquivo CSV para análise externa.
      </p>
    </div>

    <div class="card space-y-4">
      <p class="text-sm text-slate-600">
        O arquivo contém as colunas <code class="text-slate-800">id</code>,
        <code class="text-slate-800">nome</code>, <code class="text-slate-800">email</code>,
        <code class="text-slate-800">telefone</code>, <code class="text-slate-800">status</code> e
        <code class="text-slate-800">criadoEm</code>, separadas por ponto e vírgula.
      </p>

      <a href="/api/leads/export" class="btn-primary w-full" download>
        Baixar CSV
      </a>
    </div>
  </div>
</template>
