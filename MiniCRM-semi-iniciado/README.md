# MiniCRM

Sistema interno para capturar e acompanhar leads da equipe comercial.

## Stack

- Node.js 22 (container), Nuxt 3 (Vue 3) + TypeScript, Tailwind CSS 3, SQLite + Prisma 6, Zod 3, Vitest 3, Docker Compose.

## Como executar

```bash
docker compose up -d --build
# acesse http://localhost:3011
```

- Usuário de demonstração: `admin@minicrm.com` / `admin123`.
- O banco fica em `data/minicrm.db` (persistente).
- Toda configuração do Prisma, seed e dev é executada automaticamente na subida do container.

## Scripts (dentro do container)

```bash
docker compose exec minicrm npm test          # testes
docker compose exec minicrm npm run db:seed   # seed
docker compose exec minicrm npm run db:studio # Prisma Studio
```

## Variáveis de ambiente

Definidas em `.env` (e `.env.example`):

- `DATABASE_URL` — caminho do banco SQLite.
- `AUTH_SECRET` — segredo para assinatura de sessão.
- `APP_UID` / `APP_GID` — usuário do host para mapear permissões.

Consulte `REQUISITOS.md` e `PLANO.md` para o detalhamento completo.
