# CHANGELOG

Todas as mudanças relevantes do projeto serão registradas aqui.

## [Etapa 1] Estrutura base e ambiente

- Projeto Nuxt 3 + TypeScript criado do zero.
- Tailwind CSS 3 configurado.
- Dockerfile, docker-compose.yml (container `minicrm-semi`, porta 3011), `.dockerignore`, `.env` e `.env.example`.
- Prisma 6 configurado com schema `User` e `Lead` e seed idempotente (1 usuário admin + 12 leads de exemplo).
- Layout base, página inicial e CSS global.
- Container sobe, aplica o banco/seed e sobe o Nuxt dev.
