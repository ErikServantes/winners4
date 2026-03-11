# Landing Page Industrial-Chic - Scrollytelling

Este projeto é uma Single Page Application (SPA) estática com foco em uma experiência de scrollytelling fluida e visualmente impactante, seguindo uma estética "Industrial-Chic" premium.

## DNA Visual (The Master Style)

- **Background:** Preto Obsidiana Infinito (`#000000`) com grelha técnica a 150º.
- **Iluminação:** Chiaroscuro com Rim Lighting.
- **Paleta Temática:** Dourado Premium (`#d4af37`) unificado em todo o site.
- **Elementos Físicos:** Painéis de vidro fumado translúcidos (Glasmorphism) com cortes de luz oblíquos a 150º.
- **Iconografia:** Marcas de água gigantes de símbolos técnicos (Material Symbols).
- **Ambiente:** Sistema global de partículas 3D em parallax (Brasas industriais lentas ao fundo, Bokeh rápido na frente).

---

## Arquitetura de Animação: O Padrão "Absolute Scroll"

Para garantir que animações complexas baseadas em scroll funcionam sem falhas, implementámos o paradigma de **Absolute Scroll Sync**:

1.  **Lenis RAF Sync:** O motor de smooth scroll (Lenis) está diretamente acoplado à *ticker* interna do GSAP para zero desfasamento sub-frame.
2.  **Inércia Luxuosa no Desktop:** O Lenis está afinado com `duration: 2.5` e `mouseMultiplier: 1.5`. Isto substitui o frustrante "Scroll Snap" por uma física pesada e amanteigada. Um rodar de rato desliza o ecrã longamente até à próxima secção, mantendo o controlo na mão do utilizador.
3.  **A Regra do `.fromTo` + `scrub: true`:** Animações ligadas ao scroll usam sempre `.fromTo()` para definir rigidamente estados (em vez de herdar estados atuais, o que quebra em refreshes).
4.  **Isolamento de Estado Inicial:** Animações de carregamento (ex: montagem do título) são canceladas se a página for carregada abaixo do topo, entregando o controlo puramente à linha de scroll.

---

## Plano de Integração de Mídia Mista nos Modais (Pop-ups)

A estrutura atual dos modais (`modules/modal.js`) suporta texto dinâmico. Para o futuro, onde cada serviço precisará de um "Showcase" visual quando aberto, o modal deve ser adaptado para suportar **Mídia Híbrida**.

### Estratégia de Arquitetura (A Implementar)
O objeto de dados `modalData` no JS deixará de ter apenas `description` e passará a ter uma chave genérica de `media`. O script lerá o tipo de mídia e injetará o HTML correspondente no `#modal-media-container` (que criaremos dentro do modal).

**1. Imagens de Destaque (Alta Resolução)**
*   **Formato nos Dados:** `{ mediaType: 'image', mediaSrc: 'assets/cnc-highres.webp' }`
*   **Renderização:** Uma tag `<img loading="lazy">` com `object-fit: cover` para preencher o topo do modal.
*   **Otimização:** Uso estrito de `.webp` para manter o site rápido.

**2. Vídeos (B-Roll e Processo de Fabrico)**
*   **Formato nos Dados:** `{ mediaType: 'video', mediaSrc: 'assets/laser-cut.mp4' }`
*   **Renderização:** Tag `<video autoplay loop muted playsinline>` (Crucial: sem som e autoplay para agir como um GIF de altíssima qualidade).
*   **UX:** O vídeo dá vida imediata ao processo industrial assim que o cartão abre.

**3. Modelos 3D (Inspeção Interativa)**
*   **Formato nos Dados:** `{ mediaType: '3d', mediaSrc: 'assets/medal-model.glb' }`
*   **Renderização:** Uso do web component `<model-viewer>` (do Google).
*   **Vantagem:** Permite ao cliente rodar a peça 3D com o rato/dedo diretamente dentro do modal, suportando inclusivamente Realidade Aumentada (AR) em telemóveis.

**Layout do Modal Futuro:**
O modal deixará de ser apenas um quadrado de texto. Passará a ter um layout "Split" (Desktop) ou "Stack" (Mobile): Metade esquerda com o Showcase visual (Imagem/Vídeo/3D), metade direita com as especificações técnicas, tolerâncias de maquinagem e o texto atual.

---

## Implementado até agora

1.  **Estrutura e Estilo:**
    *   Arquitetura SPA baseada em Secções de Altura Total (100vh).
    *   Painéis de Vidro (`backdrop-filter`) com textura diagonal (150º) a simular chapa cortada.
    *   Marcas de água tipográficas através da fonte "Material Symbols Outlined" gigante a 5% de opacidade.
    *   Hitboxes de navegação lateral contínuas para zero frustração de clique.

2.  **Animação e Partículas:**
    *   `global-particles.js`: 2 Telas de partículas (fundo lento com blur refrativo, ecrã frontal com Bokeh rápido) atadas à inércia do scroll Lenis.
    *   Fragmentação condicional do título Hero ("4WINNERS").

3.  **Ambiente de Desenvolvimento:**
    *   Servidor web Python via Nix e IDX (`dev.nix`).

---

## Próximos Passos (A Implementar)

- [ ] **Efeitos Visuais Específicos:**
    - [ ] **Montagem de Medalhas:** Animar a vista explodida dos componentes a unirem-se com o scroll.

- [ ] **Evolução dos Modais (Details):**
    - [ ] Injetar `<model-viewer>` e estrutura híbrida de vídeos/imagens detalhada na seção de Estratégia acima.

- [ ] **Finalização e Deploy:**
    - [ ] Configurar Firebase Hosting para Testes Q/A.
