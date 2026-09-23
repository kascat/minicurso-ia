# Entrega — T-02: Autenticação

## Descrição

Implementa o acesso restrito ao MiniCRM, conforme RF-01: login com e-mail e senha, sessão
válida por horas, logout e bloqueio de páginas e APIs para usuários não autenticados.

## O que foi feito

- `server/utils/password.ts` — hash de senha com `scrypt` e salt aleatório (formato `salt:hash`)
  e verificação com comparação em tempo constante.
- `server/utils/session.ts` — token de sessão assinado por HMAC-SHA256 com validade de 8 horas,
  armazenado em cookie HTTP-only (`minicrm_session`).
- `server/utils/prisma.ts` e `server/utils/validation.ts` — instância única do Prisma e validação
  do login com Zod (`loginSchema`).
- `server/middleware/auth.ts` — exige sessão em todas as rotas `/api/`, exceto `/api/auth/`.
- Rotas `POST /api/auth/login`, `POST /api/auth/logout` e `GET /api/auth/me`.
- `middleware/auth.global.ts` — redireciona para `/login` quando não há sessão.
- `layouts/auth.vue` e `pages/login.vue` — tela de login com feedback de erro; o layout padrão
  exibe o usuário logado e a ação de sair (`layouts/default.vue`).
- Testes automatizados de senha e sessão (`tests/password.test.ts`, `tests/session.test.ts`)
  e `vitest.config.ts`.

## Como testar

1. `docker compose exec minicrm npm test` (10 testes passando).
2. Acessar `http://localhost:3011`: sem sessão, qualquer página redireciona para `/login`.
3. Entrar com `admin@minicrm.com` / `admin123` e conferir o usuário no topo e o botão "Sair".

## Pontos de atenção / decisões

- Sessão em cookie HTTP-only assinado com HMAC-SHA256 (`AUTH_SECRET` mínimo de 32 caracteres);
  o middleware de rota consulta `/api/auth/me` via `useRequestFetch` para funcionar em SSR e SPA
  sem expor o token ao JavaScript.
- Logs exibem um warning do h3 sobre preferir `message` em vez de `statusMessage` nos erros —
  inofensivo hoje, mas pode exigir ajuste em versões futuras do h3.
- A skill `.opencode/skills/finalizar-tarefa` criada nesta sessão entrou em commit separado
  (`chore`), fora do escopo da feature.