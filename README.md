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

## Funcionalidades Implementadas (Changelog Recente)

A aplicação sofreu uma transformação estrutural profunda ("Fase 2" e "Fase 3" do Plano de Transformação) para melhorar a apresentação dos serviços e a experiência do utilizador:

### 1. Novo Layout ZigZag para Serviços
- Transição de descrições escondidas em modais para a página principal (fluxo de scroll).
- Implementação de um layout "Split" (ZigZag) elegante e intercalado para Desktop (Esquerda/Direita).
- Empilhamento vertical otimizado para Mobile (Imagem em cima, texto colado em baixo).
- Integração de imagens reais de alta qualidade (`.webp`) para os principais serviços (Estampagem, Corte Laser, Gravação Laser, Impressão 3D, Maquinação CNC, Modelação 3D).

### 2. O Novo Modal "Deep-Dive Técnico" (Split Layout)
O modal evoluiu de uma simples caixa de texto para uma ficha técnica interativa avançada:
- **Layout Split:** O ecrã do modal agora divide-se entre Media (Esquerda) e Dados Técnicos (Direita) no Desktop.
- **Especificações Técnicas (B2B):** Injeção de tabelas geradas dinamicamente via JS com dados concretos (Tolerâncias, Áreas de Corte, Eixos, etc.).
- **Visualizador 360º Nativo:** Implementação de um sistema de renderização de sequência de imagens (Sprite/Sequence) com suporte a interação por arrasto (Drag/Touch) para a Impressão 3D.
- **Visualizador 3D GLB:** Integração da tag `<model-viewer>` do Google para inspecionar peças modeladas em 3D em tempo real.
- **Otimização Media:** Suporte nativo para Imagens, Vídeos (`autoplay loop muted`), Visões 360º e Modelos 3D Genéricos, tudo gerido por um único JSON no ficheiro `modules/modal.js`.

### 3. Melhorias Visuais e de Performance
- **Comportamento Inteligente das Partículas:** As partículas globais (brasas) agora fazem fade-out automático ao entrar na zona de leitura dos serviços e fade-in no Hero e Contactos, reduzindo o ruído visual e poupando bateria/CPU (ScrollTrigger).
- **Hero & Slogan:** Adição e animação fluída do Slogan ("Excelência em Transformação de Metal") e correção de bugs ("Logo Fantasma" e espaçamentos) na renderização inicial do logótipo SVG.
- **Correções CSS/UI:** Isolamento do título principal, fixação da altura da janela no telemóvel para evitar saltos (100vh dinâmico), e remoção de barras de scroll horizontais extra introduzidas pelo modal.
- **Ritmo de Leitura (Espaçamento):** Ajuste fino da cadência de *scroll*. Redução do espaço vertical vazio (`min-height`, `margin`, e `padding`) entre secções e dentro dos cartões, gerando uma densidade de informação B2B mais coesa tanto no Desktop como no Mobile.
- **Auto-Rotação 360º:** O visualizador 360º de imagens (Impressão 3D) agora roda automaticamente para chamar a atenção. Inclui lógica de interrupção instantânea ao toque e um *standby* inteligente que retoma a rotação 1 segundo após o utilizador largar a peça.

### 4. Funcionalidades de Contacto & Segurança
- **Segurança Anti-Bot:** Implementação de ofuscação (concatenação de strings em execução) no JS para proteger o Email e o Telefone de web scrapers/bots de spam.
- **Blindagem de Scripts (Vendor Lock-in):** As dependências externas (GSAP, ScrollTrigger, Lenis e Model-Viewer) foram descarregadas e servidas localmente a partir da pasta `vendor/`. Isto imuniza o site contra injeções de código provenientes de CDNs comprometidas (Subresource Integrity protection) e mitiga quedas de rede de terceiros.
- **Layout Modal de Contacto:** O modal de contacto tem agora um design em ecrã inteiro focado puramente na ação rápida ("Ligar Agora" CTA) e direções de GPS.
---

## Próximos Passos (Backlog)

- [ ] **Efeitos Visuais Específicos:**
    - [ ] **Montagem de Medalhas:** Animar a vista explodida dos componentes a unirem-se com o scroll.

- [ ] **Expansão de Conteúdo:**
    - [ ] Adicionar assets fotográficos e ficheiros 3D (`.glb` / `.webp` sequência) em falta para os restantes serviços (Torneamento, Repuxamento, Galvanização, etc.).

- [ ] **Finalização e Deploy:**
    - [ ] Configurar Firebase Hosting para Testes Q/A.
