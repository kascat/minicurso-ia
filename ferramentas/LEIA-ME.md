# Ferramentas — gerador do HTML da teoria

Converte `../conteudo-teoria.md` em um arquivo HTML autocontido (`../conteudo-teoria.html`), com CSS embutido e uma barra de progresso flutuante que acompanha a rolagem.

## Uso

```bash
cd ferramentas
npm install          # apenas na primeira vez
npm run html         # gera o HTML uma vez
npm run html:watch   # regenera automaticamente quando o .md mudar
```

Depois, abra `conteudo-teoria.html` no navegador.

## Como funciona

- `gerar-html.mjs` lê o Markdown, converte com a biblioteca `marked` e injeta o conteúdo em um template com CSS e JavaScript embutidos.
- URLs soltas viram links clicáveis.
- No modo `--watch`, o script observa `conteudo-teoria.md` e regenera o HTML a cada alteração.
