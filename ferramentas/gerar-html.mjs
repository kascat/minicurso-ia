import { readFileSync, writeFileSync, watch } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { marked } from 'marked'

const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = join(aqui, '..')
const ENTRADA = join(raiz, 'conteudo-teoria.md')
const SAIDA = join(raiz, 'conteudo-teoria.html')

function linkificar(markdown) {
  const linhas = markdown.split('\n')
  let dentroDeCodigo = false

  return linhas
    .map((linha) => {
      if (linha.trimStart().startsWith('```')) {
        dentroDeCodigo = !dentroDeCodigo
        return linha
      }
      if (dentroDeCodigo) return linha

      return linha.replace(/(?<!\]\()(https?:\/\/[^\s)]+)/g, (url) => `[${url}](${url})`)
    })
    .join('\n')
}

function extrairTitulo(markdown) {
  const linha = markdown.split('\n').find((l) => l.startsWith('# '))
  return linha ? linha.replace(/^#\s+/, '').trim() : 'Material Teórico'
}

function montarHtml(titulo, corpo) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titulo}</title>
<style>
:root {
  --primaria: #4f46e5;
  --primaria-clara: #eef2ff;
  --texto: #1e293b;
  --texto-suave: #475569;
  --fundo: #f8fafc;
  --borda: #e2e8f0;
  --codigo-fundo: #1e293b;
  --codigo-texto: #e2e8f0;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 18px;
  line-height: 1.75;
  color: var(--texto);
  background: var(--fundo);
}
.conteudo { max-width: 900px; margin: 0 auto; padding: 64px 28px 160px; }
h1 { font-size: 2.4rem; line-height: 1.2; margin: 0 0 1.5rem; color: #0f172a; }
h2 { font-size: 1.8rem; line-height: 1.3; margin: 3rem 0 1rem; padding-top: 1.5rem; border-top: 2px solid var(--borda); color: #0f172a; }
h3 { font-size: 1.35rem; margin: 2.25rem 0 0.75rem; color: var(--primaria); }
h4 { font-size: 1.1rem; margin: 1.75rem 0 0.5rem; color: #334155; }
p { margin: 0.9rem 0; }
a { color: var(--primaria); text-decoration: none; word-break: break-word; }
a:hover { text-decoration: underline; }
strong { color: #0f172a; }
ul, ol { padding-left: 1.5rem; }
li { margin: 0.35rem 0; }
code {
  background: #e2e8f0; padding: 0.15em 0.4em; border-radius: 5px;
  font-family: "JetBrains Mono", "Fira Code", Consolas, monospace; font-size: 0.85em;
}
pre {
  background: var(--codigo-fundo); color: var(--codigo-texto);
  padding: 18px 20px; border-radius: 12px; overflow-x: auto;
  font-size: 0.85rem; line-height: 1.6;
}
pre code { background: none; padding: 0; color: inherit; }
blockquote {
  margin: 1.25rem 0; padding: 1rem 1.25rem;
  background: var(--primaria-clara); border-left: 4px solid var(--primaria);
  border-radius: 0 10px 10px 0; color: var(--texto-suave);
}
blockquote p { margin: 0.35rem 0; }
table { width: 100%; border-collapse: collapse; margin: 1.25rem 0; font-size: 0.95rem; }
th, td { border: 1px solid var(--borda); padding: 10px 12px; text-align: left; }
th { background: #f1f5f9; }
tr:nth-child(even) td { background: #fafbfc; }
hr { border: none; border-top: 1px solid var(--borda); margin: 2.5rem 0; }
.barra-topo { position: fixed; top: 0; left: 0; width: 100%; height: 4px; z-index: 50; }
.barra-topo-preenchimento {
  height: 100%; width: 0%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transition: width 0.1s linear;
}
.progresso-flutuante {
  position: fixed; right: 18px; bottom: 18px; z-index: 50;
  display: flex; align-items: center; gap: 10px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--borda); border-radius: 999px;
  padding: 8px 14px; box-shadow: 0 6px 20px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(6px);
}
.progresso-barra { width: 90px; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
.progresso-preenchimento {
  height: 100%; width: 0%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 999px; transition: width 0.1s linear;
}
.progresso-texto {
  font-size: 0.8rem; font-variant-numeric: tabular-nums; font-weight: 600;
  color: var(--primaria); min-width: 36px; text-align: right;
}
@media (max-width: 640px) {
  body { font-size: 16px; }
  .conteudo { padding: 40px 18px 120px; }
  h1 { font-size: 1.9rem; }
  h2 { font-size: 1.5rem; }
}
@media print {
  .barra-topo, .progresso-flutuante { display: none; }
  body { background: #fff; }
}
</style>
</head>
<body>
<div class="barra-topo"><div class="barra-topo-preenchimento" id="topo-fill"></div></div>
<main class="conteudo">
${corpo}
</main>
<div class="progresso-flutuante" title="Progresso de leitura">
  <div class="progresso-barra"><div class="progresso-preenchimento" id="progresso-fill"></div></div>
  <span class="progresso-texto" id="progresso-texto">0%</span>
</div>
<script>
(function () {
  var fill = document.getElementById('progresso-fill')
  var texto = document.getElementById('progresso-texto')
  var topo = document.getElementById('topo-fill')

  function atualizar() {
    var altura = document.documentElement.scrollHeight - window.innerHeight
    var progresso = altura > 0 ? (window.scrollY / altura) * 100 : 0
    var valor = Math.min(100, Math.max(0, Math.round(progresso)))
    fill.style.width = valor + '%'
    topo.style.width = valor + '%'
    texto.textContent = valor + '%'
  }

  window.addEventListener('scroll', atualizar, { passive: true })
  window.addEventListener('resize', atualizar)
  atualizar()
})()
</script>
</body>
</html>
`
}

async function gerar() {
  const markdown = readFileSync(ENTRADA, 'utf8')
  const titulo = extrairTitulo(markdown)
  const corpo = await marked.parse(linkificar(markdown), { gfm: true })
  writeFileSync(SAIDA, montarHtml(titulo, corpo))
  const agora = new Date().toLocaleTimeString('pt-BR')
  console.log(`[${agora}] HTML gerado: ${SAIDA}`)
}

const observando = process.argv.includes('--watch')

if (observando) {
  await gerar()
  console.log('Observando alterações em conteudo-teoria.md (Ctrl+C para sair)...')
  let timer = null
  watch(ENTRADA, () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      gerar().catch((erro) => console.error('Falha ao gerar:', erro))
    }, 150)
  })
} else {
  await gerar()
}
