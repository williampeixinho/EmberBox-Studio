# Ember Box Studio — Site

Site estático (HTML/CSS/JS puro, sem build) da Ember Box Studio.
Idioma padrão: **inglês**, com seletor para **português** e **espanhol** (EN/PT/ES) em todas as páginas.

Este repositório é a **única fonte** do site: edite aqui (depois de um `git pull`), não em cópias
em outras pastas.

## Estrutura

```
├── index.html                  # Home — hero + cards dos jogos
├── about.html                  # Sobre o estúdio
├── publishing.html             # Publicação de jogos de parceiros + formulário de pitch
├── privacy.html                # Política de privacidade
├── games/                      # Uma página por jogo
├── css/style.css               # Estilo (fontes "Press Start 2P" + "VT323")
├── js/
│   ├── translations.js         # Dicionário de textos em en / pt / es
│   ├── i18n.js                 # Aplica o idioma salvo e liga o seletor EN/PT/ES
│   └── main.js                 # Menu mobile, formulário de pitch, lightbox dos screenshots
├── images/
│   ├── games/                  # Artes de capa (cards da home + topo de cada página de jogo)
│   └── screenshots/            # Screenshots dos jogos
└── videos/                     # Trailers hospedados no próprio site (ex.: Mel's Jigsaw)
```

## Como funciona o sistema de idiomas (i18n)

- O texto **escrito diretamente no HTML é sempre em inglês** — é o texto que aparece se o
  JavaScript falhar (e o que leitores de tela leem até o JS rodar).
- Elementos traduzíveis têm `data-i18n="chave"` (texto) ou `data-i18n-attr="atributo:chave"`
  (ex.: `alt`, `title`, `content` de meta tags).
- `js/translations.js` guarda as três versões de cada texto em
  `window.EMBERBOX_I18N = { en: {...}, pt: {...}, es: {...} }`.
- `js/i18n.js` lê o idioma salvo em `localStorage` (chave `emberbox_lang`, padrão `en`) e troca
  os textos. Se uma chave não existir, o texto em inglês do HTML continua lá.
- Para **adicionar um texto novo**: dê uma chave ao elemento e adicione essa chave nos três
  blocos (`en`, `pt`, `es`) de `js/translations.js`.
- **Cuidado ao editar `translations.js`**: aspas `"` dentro de um texto precisam ser escritas
  como `\"`. Um erro de sintaxe nesse arquivo faz o site inteiro ficar só em inglês.

> A página começa invisível e aparece assim que o idioma é aplicado (para não piscar inglês
> em quem escolheu PT/ES). Se algum script falhar, ela aparece mesmo assim depois de 1,5 s —
> não remova a animação `reveal-fallback` do `style.css`.

## Imagens

- Use **WebP** (ou JPG) com no máximo **1920 px de largura**. Uma imagem 4K de 6 MB vira
  ~200 KB em WebP qualidade 90 sem diferença visível — e a home carrega dezenas delas.
- Para screenshots 4K de pixel art, reduza exatamente pela metade com filtro "point"
  (nearest neighbor) para os pixels continuarem nítidos:
  `magick in.png -filter point -resize 50% -quality 90 out.webp`
- Clicar em qualquer imagem de `.screenshot-gallery` abre o lightbox (setas ← → e Esc).

## O que ainda falta

- **Find the Cats 3: Halloween Hunt** e **Panda: Curse of the Pumpkin** (Em breve): arte de
  capa, trailer e links de loja. Os botões de loja foram removidos até as páginas da loja
  existirem — ao lançar, copie o bloco `store-buttons` de outro jogo.
- **Mel's Jigsaw Adventures** (Em breve): links de loja.
- **Formulário de pitch**: hoje abre o app de e-mail do visitante (com um quadro de "copiar
  pitch" se o app não abrir). Quando o site estiver no Netlify, troque por Netlify Forms para
  receber os pitches direto por e-mail.

## Como testar localmente

```bash
npx serve .
```

> Os trailers do YouTube **não funcionam abrindo o HTML direto do disco** (`file:///...`) — o
> player exige uma origem HTTP(S) e mostra "Erro 153". Teste sempre com um servidor local ou
> no site publicado.

## Deploy

Netlify ou Vercel, importando este repositório do GitHub: sem build command, publish directory
na raiz. Não precisa de arquivo de configuração.
