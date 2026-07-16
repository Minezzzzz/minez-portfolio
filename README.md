# Portefólio Minez

Website estático de Rafael Minez, construído com HTML, CSS e JavaScript sem frameworks ou processo de build.

## Estrutura publicada

- `index.html` — conteúdo e estrutura do website.
- `styles.css` — sistema visual e comportamento responsivo.
- `script.js` — filtros, interações, menu e estados de curadoria.
- `assets/images/hero-collage-v2.webp` — imagem principal otimizada.
- `assets/docs/Rafael_Minez_CV.pdf` — curriculum vitae público.
- `_headers` — cabeçalhos de segurança usados pelo Cloudflare Pages.

Os projetos estão identificados como **em curadoria** até serem substituídos por casos reais. Não existem clientes, resultados ou métricas inventadas.

## Abrir localmente

```powershell
cd "C:\Users\PC GAMING\Documents\Codex\2026-07-14\cr\outputs\portfolio"
py -m http.server 4176
```

Depois abre `http://127.0.0.1:4176/`.

## Atualizar o website publicado

Depois de alterares os ficheiros, podes publicar tudo com:

```powershell
.\publicar.ps1 -Mensagem "Atualiza o portefólio"
```

O script cria um commit e envia-o para o GitHub. O Cloudflare Pages deteta o envio e atualiza automaticamente o mesmo endereço público.

Também podes usar os comandos Git diretamente:

```powershell
git add --all
git commit -m "Descreve a alteração"
git push
```

## Antes de revelar um projeto

1. Substituir o título e a descrição provisórios em `script.js`.
2. Indicar claramente contexto, função pessoal, equipa e ferramentas.
3. Mostrar processo, resultado real e aprendizagem.
4. Otimizar imagens para WebP ou AVIF.
5. Confirmar créditos e licenças.

Três a cinco projetos fortes são preferíveis a uma lista extensa sem contexto.
