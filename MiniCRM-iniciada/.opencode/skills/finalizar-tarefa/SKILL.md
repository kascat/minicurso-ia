---
name: finalizar-tarefa
description: Finaliza uma tarefa do backlog do MiniCRM. Use quando o usuário pedir para finalizar a tarefa, finalizar a entrega ou algo do tipo.
---

# Finalizar tarefa

1. Identifique a tarefa no `TASKS.md`.
2. Se não souber a qual tarefa as alterações pertencem, pergunte. Se for uma tarefa nova, registre-a antes no `TASKS.md`, seguindo a numeração existente (ex.: `T-09`).
3. Rode os testes dentro do container: `docker compose exec minicrm npm test`.
4. Marque os critérios de aceite e mude o status da tarefa para "concluída".
5. Atualize o `CHANGELOG.md`.
6. Pergunte se deve criar uma branch nova. Em caso afirmativo, use o identificador da tarefa seguido do padrão de mercado — prefixo como `feat/`, `fix/`, `chore/` etc. e uma descrição breve separada por `/` (ex.: `T-03-feat/implementacao-formulario-leads`).
7. Pergunte se deve fazer o commit. Em caso afirmativo, use uma mensagem breve que descreva as alterações.
8. Pergunte se deve fazer o push.
9. Pergunte se deve criar a descrição da entrega para a revisão de código (ex.: descrição da PR no GitHub). Em caso afirmativo, salve em `entregas/<nome-da-branch-com-barra-trocada-por-traco>.md` (ex.: a branch `T-03-feat/implementacao-formulario-leads` gera `entregas/T-03-feat-implementacao-formulario-leads.md`).
10. Reporte o resultado dos testes e o hash do commit.
