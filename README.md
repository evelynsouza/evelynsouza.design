# Evelyn Souza — Portfólio

Site estático (HTML, CSS e JavaScript puros), sem dependências nem etapa de build.

## Estrutura

```
index.html                 Página inicial
sobre.html                 Sobre
case-nps-com-ia.html       Case 01 — NPS com IA
case-bolsa.html            Case 02 — Evolução da experiência de Bolsa
case-brflog.html           Case 03 — BRFLOG
case-mais-capital.html     Case 04 — +Capital
css/navegacao.css          Rolagem suave e âncoras abaixo do cabeçalho (todas as páginas)
css/<página>.css           Estilos de cada página (layout responsivo e temas claro/escuro)
js/main.js                 Tema, menu mobile, copiar e-mail, atalho "Projetos" e vídeo
assets/images, assets/video
```

## Publicar no GitHub Pages

1. Crie um repositório e envie o conteúdo desta pasta para a raiz (o `index.html` deve ficar na raiz).
2. No repositório: **Settings › Pages › Build and deployment › Source: Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/ (root)` e salve. Em alguns minutos o site fica disponível em `https://<usuário>.github.io/<repositório>/`.

Para testar localmente: `python3 -m http.server` dentro da pasta e abra `http://localhost:8000`.

## Observações

- A fonte Manrope fica no próprio site (`assets/fonts/`, recortes `latin` e `latin-ext` do Google Fonts, licença SIL OFL), declarada em `css/navegacao.css`.
- As imagens têm versões WebP em várias larguras em `assets/images/webp/`, entregues com `<picture>`/`srcset`; os arquivos originais continuam em `assets/images/` e servem de alternativa. Ao trocar uma imagem, gere de novo as versões WebP com o mesmo nome base (`nome-LARGURA.webp`).
- Google Analytics 4 (`G-DX0S1H62YM`) no início do `<head>` de cada página. O script do Google só é baixado depois do evento `load` (para não pesar no carregamento); Google Signals e personalização de anúncios estão desativados. Página nova precisa receber o mesmo bloco.
- A preferência de tema fica salva no navegador (`localStorage`, chave `es-theme`).
- O e-mail copiado pelo botão de contato é o texto exibido no próprio botão (`.contact-value`).
- Os links de CSS e JS levam uma versão (`?v=20261019`) para os navegadores não usarem arquivos antigos do cache. Ao publicar mudanças em `css/` ou `js/`, troque esse número em todas as páginas (por exemplo, pela data do dia).
