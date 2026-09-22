<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <header class="bg-white shadow-sm">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span class="text-lg font-semibold">MiniCRM</span>
      </div>
    </header>
    <main class="mx-auto max-w-5xl px-4 py-8">
      <slot />
    </main>
  </div>
</template>
