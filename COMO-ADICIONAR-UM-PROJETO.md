# Como adicionar um projeto ao portefólio

Os projetos vivem todos em [`projects.json`](projects.json). Para adicionar, editar, esconder ou remover um trabalho, não precisas de mexer no HTML, no CSS ou no JavaScript.

## Adicionar um projeto, passo a passo

1. Escolhe um `slug`: uma versão curta do título, sem espaços, acentos ou letras maiúsculas. Exemplo: `videoclipe-gorilas`.
2. Dentro de `assets`, cria a pasta `projects/nome-do-slug/`.
3. Coloca nessa pasta a capa, as imagens e, se necessário, os vídeos.
4. Abre `projects.json` num editor de texto.
5. Copia um projeto completo e cola-o antes do último `]` do ficheiro.
6. Confirma que existe uma vírgula entre os projetos, mas não depois do último projeto.
7. Preenche os campos. Usa `[A CONFIRMAR: ...]` onde ainda não tens informação.
8. Enquanto o projeto não estiver pronto, mantém `"draft": true`.
9. Testa localmente com `py -m http.server 4176` e abre `http://127.0.0.1:4176/`.

O ficheiro é JSON estrito: usa aspas duplas e não coloques comentários dentro de `projects.json`.

## Modelo comentado

Este bloco está em JSONC para poderes perceber cada campo. Ao copiá-lo para `projects.json`, apaga as linhas que começam por `//`.

```jsonc
{
  // Título apresentado no site.
  "title": "[A CONFIRMAR: título do projeto]",

  // Identificador único: minúsculas, sem acentos, com hífen em vez de espaços.
  "slug": "nome-do-projeto",

  // Ano de conclusão. Pode ser texto, por exemplo "2025".
  "year": "[A CONFIRMAR: ano]",

  // Explica apenas o que tu fizeste, sobretudo se foi um trabalho de grupo.
  "role": "[A CONFIRMAR: o meu papel]",

  // Inclui uma área reconhecida pelo filtro e depois as competências/ferramentas.
  // Áreas disponíveis: Design, Web, Vídeo + Motion, Fotografia ou 3D.
  "tags": ["Design", "[A CONFIRMAR: ferramenta]"],

  // Imagem principal. Usa WebP ou AVIF e escreve uma descrição objetiva em alt.
  "cover": {
    "src": "assets/projects/nome-do-projeto/cover.webp",
    "alt": "[A CONFIRMAR: descrição da imagem de capa]"
  },

  // Galeria opcional. Podes misturar imagens e vídeos locais.
  "gallery": [
    {
      "type": "image",
      "src": "assets/projects/nome-do-projeto/01-processo.webp",
      "alt": "[A CONFIRMAR: descrição desta imagem]",
      "caption": "[A CONFIRMAR: legenda opcional]"
    },
    {
      "type": "video",
      "src": "assets/projects/nome-do-projeto/final.webm",
      "poster": "assets/projects/nome-do-projeto/video-poster.webp",
      "caption": "[A CONFIRMAR: legenda opcional]"
    }
  ],

  // Frase curta que cria interesse e resume o projeto.
  "pitch": "[A CONFIRMAR: pitch de uma frase]",

  // Briefing, público, objetivo e limitações conhecidas.
  "context": "[A CONFIRMAR: contexto e briefing]",

  // Pesquisa, ideias, testes, iterações e decisões importantes.
  "process": "[A CONFIRMAR: processo]",

  // O que foi difícil, o que correu mal e como reagiste.
  "challenges": "[A CONFIRMAR: desafios]",

  // Resultado, evidência real, aprendizagem e o que melhorarias.
  "outcome": "[A CONFIRMAR: resultado e aprendizagens]",

  // Opcional. A nota fica guardada nos dados, mas escondida no site por defeito.
  "grade": "[A CONFIRMAR: nota]",

  // Opcional. Remove links que ainda não existem.
  "links": [
    {
      "label": "Ver projeto",
      "url": "https://exemplo.pt"
    }
  ],

  // true coloca o projeto antes dos restantes.
  "featured": false,

  // true esconde completamente o projeto sem apagar os dados.
  "draft": true
}
```

## Exemplo: videoclipe sobre gorilas

Este exemplo só usa os factos já confirmados: é um videoclipe com tema de gorilas, teve 19/20 e deve ser destacado. Tudo o resto continua assinalado para confirmação. Fica escondido até preencheres o conteúdo e colocares os ficheiros certos.

```json
{
  "title": "Videoclipe — [A CONFIRMAR: título final]",
  "slug": "videoclipe-gorilas",
  "year": "[A CONFIRMAR: ano]",
  "role": "[A CONFIRMAR: o meu papel e a contribuição da equipa]",
  "tags": [
    "Vídeo + Motion",
    "[A CONFIRMAR: ferramentas e competências]"
  ],
  "cover": {
    "src": "assets/projects/videoclipe-gorilas/cover.webp",
    "alt": "[A CONFIRMAR: descrição do frame de capa]"
  },
  "gallery": [
    {
      "type": "video",
      "src": "assets/projects/videoclipe-gorilas/final.webm",
      "poster": "assets/projects/videoclipe-gorilas/video-poster.webp",
      "caption": "[A CONFIRMAR: duração e créditos]"
    }
  ],
  "pitch": "Um videoclipe com o tema de gorilas. [A CONFIRMAR: frase final de apresentação]",
  "context": "O tema do videoclipe era gorilas. [A CONFIRMAR: briefing, público e objetivo]",
  "process": "[A CONFIRMAR: pesquisa, conceito, storyboard, captação, edição e decisões importantes]",
  "challenges": "[A CONFIRMAR: dificuldades e forma de resolução]",
  "outcome": "[A CONFIRMAR: resultado, feedback, aprendizagem e o que melhorarias]",
  "grade": "19/20",
  "links": [],
  "featured": true,
  "draft": true
}
```

## Organização e nomes dos ficheiros

Usa uma pasta por projeto e nomes previsíveis:

```text
assets/
└── projects/
    └── nome-do-projeto/
        ├── cover.webp
        ├── 01-processo.webp
        ├── 02-processo.webp
        ├── 03-resultado.webp
        ├── video-poster.webp
        ├── final.webm
        └── final.mp4
```

Regras simples:

- Usa letras minúsculas, números e hífenes; evita espaços e acentos nos nomes.
- Prefere WebP ou AVIF para imagens.
- Para vídeo, WebM costuma ser mais leve; podes usar MP4 quando precisares de maior compatibilidade.
- Usa `cover.webp` para a imagem que aparece primeiro.
- Numera a galeria pela ordem em que deve aparecer: `01-`, `02-`, `03-`.
- Não coloques um caminho em `projects.json` antes de o ficheiro existir.

## Esconder sem apagar

Muda apenas esta linha:

```json
"draft": true
```

O projeto deixa de aparecer no grid, nos filtros, no modal e na navegação entre projetos. Para o publicar novamente, muda para `false`.

Cada projeto publicado também recebe automaticamente um endereço partilhável com o respetivo `slug`, por exemplo:

```text
https://minez-portfolio.pages.dev/#projeto/videoclipe-gorilas
```

Não precisas de criar páginas ou alterar o HTML para este endereço funcionar.

## Verificações antes de publicar

- O `slug` é único.
- Não existem vírgulas em falta ou a mais no JSON.
- Todas as imagens e vídeos referidos existem na pasta indicada.
- A capa tem texto alternativo (`alt`).
- Não ficaram campos `[A CONFIRMAR: ...]` num projeto com `"draft": false`.
- O projeto abre no modal e os botões anterior/seguinte funcionam.
