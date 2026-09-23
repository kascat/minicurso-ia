import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.{test,spec}.ts'],
    env: {
      AUTH_SECRET: 'chave-de-teste-com-trinta-e-dois-bytes!!',
    },
  },
})