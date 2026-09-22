# Prompt — Skill de finalização de tarefa

Crie uma skill chamada `finalizar-tarefa`, salva em `.opencode/skills/finalizar-tarefa/SKILL.md`, seguindo o padrão de skills: cabeçalho com `name` e `description` e o passo a passo no corpo.

A skill deve ser acionada sempre que o usuário pedir para finalizar a tarefa, finalizar a entrega ou algo do tipo.

O procedimento da skill deve:

1. Identificar a tarefa no `TASKS.md`.
2. Se não souber a qual tarefa as alterações pertencem, perguntar. Se for uma tarefa nova, registrar antes no `TASKS.md`, seguindo a numeração existente (ex.: `T-09`).
3. Rodar os testes dentro do container: `docker compose exec minicrm npm test`.
4. Marcar os critérios de aceite e mudar o status da tarefa para "concluída".
5. Atualizar o `CHANGELOG.md`.
6. Perguntar ao usuário se deve criar uma branch nova. Em caso afirmativo, usar o identificador da tarefa seguido do padrão de mercado: um prefixo como `feat/`, `fix/`, `chore/` etc. e uma descrição breve separada por `/` — por exemplo, `T-03-feat/implementacao-formulario-leads`.
7. Perguntar se deve fazer o commit. Em caso afirmativo, usar uma mensagem breve que descreva as alterações.
8. Perguntar se deve fazer o push.
9. Perguntar se deve criar a descrição da entrega para a revisão de código (por exemplo, a descrição da PR no GitHub). Em caso afirmativo, salvar essa descrição em um arquivo na pasta `entregas/`, com o nome igual ao da branch trocando apenas a barra `/` por traço — por exemplo, a branch `T-03-feat/implementacao-formulario-leads` gera `entregas/T-03-feat-implementacao-formulario-leads.md`.
10. Ao final, reportar o resultado dos testes e o hash do commit.
