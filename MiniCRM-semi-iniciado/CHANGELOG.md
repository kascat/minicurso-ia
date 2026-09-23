# CHANGELOG

Todas as mudanças relevantes do projeto serão registradas aqui.

## [Etapa 2] Autenticação (RF-01)

- Utilitários de servidor: hash de senha com `scrypt` (formato `salt:hash`), token de sessão assinado por HMAC-SHA256 com validade de 8 horas (cookie HTTP-only `minicrm_session`), instância única do Prisma e schema de validação do login com Zod.
- Middleware de servidor que exige sessão em todas as rotas `/api/`, exceto `/api/auth/`.
- Rotas de autenticação: `POST /api/auth/login`, `POST /api/auth/logout` e `GET /api/auth/me`.
- Middleware de rota global que redireciona para `/login` quando não há sessão.
- Layout de autenticação e página `/login` com formulário e feedback de erro.
- Layout padrão exibe o usuário logado e a ação de sair.
- Testes automatizados de senha e sessão (10 casos) e `vitest.config.ts`.

## [Etapa 1] Estrutura base e ambiente

- Projeto Nuxt 3 + TypeScript criado do zero.
- Tailwind CSS 3 configurado.
- Dockerfile, docker-compose.yml (container `minicrm-semi`, porta 3011), `.dockerignore`, `.env` e `.env.example`.
- Prisma 6 configurado com schema `User` e `Lead` e seed idempotente (1 usuário admin + 12 leads de exemplo).
- Layout base, página inicial e CSS global.
- Container sobe, aplica o banco/seed e sobe o Nuxt dev.
