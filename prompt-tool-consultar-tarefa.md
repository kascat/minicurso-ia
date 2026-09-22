# Prompt — Ferramenta personalizada de consulta de tarefa

Crie uma ferramenta personalizada (custom tool) chamada `consultar-tarefa`, salva em `.opencode/tools/consultar-tarefa.ts`, seguindo o padrão do OpenCode: usa `tool` de `@opencode-ai/plugin`, com `description`, `args` tipados e a função `execute`.

A ferramenta deve receber um identificador de tarefa (por exemplo, `T-03`), ler o `TASKS.md` e retornar a descrição, o requisito, a etapa e o status da tarefa. Se a tarefa não existir, retornar uma mensagem informando que não foi encontrada.
