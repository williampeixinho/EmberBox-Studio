# Ember Box Studios — Site

Site estático (HTML/CSS/JS puro, sem build) para o estúdio Ember Box Studios.
Idioma padrão: **inglês**, com seletor para **português** e **espanhol** (EN/PT/ES) em todas as páginas.

## Estrutura

```
website/
├── index.html                  # Home — hero + grid dos 5 jogos
├── about.html                  # Sobre o estúdio
├── privacy.html                # Política de privacidade
├── games/
│   ├── mel-the-cat.html
│   ├── mel-the-space-cat.html
│   ├── mel-the-pyramid-cat.html
│   ├── find-the-cats.html
│   └── find-the-cats-2.html
├── css/style.css               # Estilo pixel art (fonte "Press Start 2P" + "VT323")
├── js/
│   ├── translations.js         # Dicionário de textos em en / pt / es
│   ├── i18n.js                 # Aplica o idioma salvo e liga o seletor EN/PT/ES
│   └── main.js                 # Toggle do menu mobile
└── images/
    ├── logo-placeholder.svg
    ├── games/                  # coloque as artes de capa de cada jogo aqui
    └── screenshots/             # coloque os screenshots reais aqui
```

## Como funciona o sistema de idiomas (i18n)

- O texto **escrito diretamente no HTML é sempre em inglês** — é o texto padrão que aparece
  se o JavaScript falhar ou demorar (e é o texto usado por leitores de tela até o JS rodar).
- Elementos traduzíveis têm um atributo `data-i18n="chave"` (texto) ou
  `data-i18n-attr="atributo:chave"` (ex.: `alt`, `title`, `content` de meta tags).
- `js/translations.js` guarda as três versões de cada texto, indexadas por chave, em
  `window.EMBERBOX_I18N = { en: {...}, pt: {...}, es: {...} }`.
- `js/i18n.js` lê o idioma salvo em `localStorage` (chave `emberbox_lang`, padrão `en`),
  substitui todo texto marcado com `data-i18n`/`data-i18n-attr` e liga os botões `.lang-switch`
  do menu (EN / PT / ES). A escolha do usuário é lembrada entre as páginas.
- Para **adicionar um texto novo**: dê uma chave nova ao elemento (`data-i18n="minha.chave"`),
  e adicione essa chave nos três blocos (`en`, `pt`, `es`) de `js/translations.js`.
- Para **editar uma tradução existente**: procure a chave em `js/translations.js` e altere o
  texto — não precisa mexer no HTML.
- Nomes próprios (Mel the Cat, Xbox One, Xbox Series X, Windows, PS4, PS5, Nintendo Switch)
  não são traduzidos — ficam fixos no HTML.

## O que ainda precisa ser preenchido

Tudo marcado com `[colchetes]` ou dentro de uma caixa laranja "[DRAFT]" / "[IMPORTANT]"
no site é placeholder e precisa ser substituído (em inglês em `translations.js` → `en`, e
depois também em `pt` e `es` para manter as três versões consistentes):

1. ~~**Logo**~~ — ok, `images/emberbox.png` (logo real) já está no nav de todas as páginas,
   no favicon e no quadro "team photo" do `about.html`.
2. ~~**Screenshots dos jogos**~~ — ok, todas as 5 páginas de jogo já usam os screenshots reais
   em `images/screenshots/`.
3. ~~**Arte de capa de cada jogo**~~ — ok, todas as 5 páginas de jogo (e os cards da home) já
   usam as artes reais em `images/games/`.
4. **Links de loja** — em cada página de jogo, troque os `href="#"` dos 3 botões de SKU
   (Xbox One, Xbox Series X, Windows) pelos links reais de cada versão na loja.
5. **Trailer** — em cada página de jogo, na seção "Trailer", troque `YOUR_VIDEO_ID_HERE` na
   URL do iframe pelo ID do vídeo do YouTube (ex.: `https://www.youtube.com/embed/dQw4w9WgXcQ` →
   ID é `dQw4w9WgXcQ`).
6. **Plataformas** — os badges já vêm configurados com Xbox One, Xbox Series X e Windows como
   "disponível" (`badge-available`) e PS4, PS5 e Nintendo Switch como "em breve" (`badge-soon`).
   Quando um jogo lançar em um novo console, basta trocar a classe do badge correspondente de
   `badge-soon` para `badge-available`.
7. **Descrições dos jogos** — os textos atuais (em `js/translations.js`) são rascunhos
   plausíveis baseados no nome de cada jogo; revise e ajuste com a descrição real, nos três
   idiomas.
8. **Sobre (`about.html` / chaves `about.*`)** — história real do estúdio, fundação, equipe.
9. **Política de privacidade (`privacy.html` / chaves `privacy.*`)** — já usa o texto oficial
   fornecido pelo estúdio (não é mais um modelo genérico).
10. ~~**E-mail de contato**~~ — ok, `contact@emberboxstudio.com` em todo o site.
11. **Redes sociais** — Discord, YouTube e Instagram já apontam para os perfis reais no rodapé
    de todas as páginas. O ícone **X** ainda está com `href="#"` — falta o link correto (o link
    enviado para "twitter" era o mesmo do Instagram).

## Como testar localmente

Basta abrir `index.html` no navegador, ou rodar um servidor local simples:

```bash
npx serve website
```

> **Importante sobre os trailers:** os vídeos do YouTube embutidos nas páginas de jogo
> **não funcionam se você abrir o HTML direto do disco** (`file:///...`, ex.: dando duplo
> clique no arquivo) — o player do YouTube exige uma origem HTTP(S) válida e recusa a conexão
> com "Erro 153 / erro de configuração do player" quando não há servidor. Sempre teste os
> trailers rodando um servidor local (`npx serve website` acima, ou qualquer outro) ou depois
> de publicado no Netlify — em ambos os casos funciona normalmente.

## Deploy no Netlify

**Opção 1 — arrastar e soltar:**
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta `website/` inteira para o navegador.

**Opção 2 — via Git (recomendado, com deploy automático):**
1. Suba a pasta `website/` para um repositório no GitHub.
2. No Netlify, clique em "Add new site" → "Import an existing project".
3. Conecte o repositório. Como não há build step, deixe:
   - **Build command:** (vazio)
   - **Publish directory:** `website` (ou a raiz, se o repo só contiver o site)
4. Deploy.

Não é necessário nenhum arquivo de configuração adicional (`netlify.toml`) para este site,
já que é 100% estático.
