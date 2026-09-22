import { tool } from "@opencode-ai/plugin"
import { readFile } from "node:fs/promises"

export default tool({
  description:
    "Consulta no TASKS.md o status de uma tarefa do MiniCRM pelo identificador (por exemplo, T-03).",
  args: {
    id: tool.schema.string().describe("Identificador da tarefa, como T-03"),
  },
  async execute({ id }) {
    const conteudo = await readFile("TASKS.md", "utf8")
    const linha = conteudo
      .split("\n")
      .find((l) => l.trim().startsWith(`| ${id} `))

    if (!linha) return `Tarefa ${id} não encontrada no TASKS.md.`

    const [tarefa, descricao, requisito, etapa, status] = linha
      .split("|")
      .map((celula) => celula.trim())
      .filter(Boolean)

    return `${tarefa} — ${descricao}\nRequisito: ${requisito} | Etapa: ${etapa} | Status: ${status}`
  },
})
