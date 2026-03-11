# Landing Page Industrial-Chic - Scrollytelling

Este projeto é uma Single Page Application (SPA) estática com foco em uma experiência de scrollytelling fluida e visualmente impactante, seguindo uma estética "Industrial-Chic".

## DNA Visual (The Master Style)

- **Background:** Preto Obsidiana Infinito (`#000000`)
- **Iluminação:** Chiaroscuro com Rim Lighting
- **Paleta Temática:** 
  - Laser (Azul Néon: `#00d4ff`)
  - 3D (Laranja: `#ff6b00`)
  - CNC/Estampa (Azul Cinza: `#5d7b93`)
  - Quin/Caland (Vermelho: `#e63946`)
  - Repux/Torn (Verde: `#2a9d8f`)
  - Galv/UV (Amarelo: `#e9c46a`)
- **Assets:** Imagens Ultra-Wide 21:9 geradas por IA

---

## Arquitetura de Animação: O Padrão "Absolute Scroll"

Para garantir que animações complexas baseadas em scroll (Scrollytelling) funcionam sem falhas independentemente de refreshes, direção do scroll ou velocidade, implementámos o paradigma de **Absolute Scroll Sync**:

1.  **Lenis RAF Sync:** O motor de smooth scroll (Lenis) não corre no seu próprio loop de *requestAnimationFrame*. Ele está diretamente acoplado à *ticker* interna do GSAP. Isto significa que quando o GSAP calcula uma animação (ex: o título a explodir), usa exatamente o mesmo valor de pixel sub-frame que o Lenis calculou. Zero desfasamento ou *jitter*.
2.  **`lagSmoothing(0)`:** Desativado no GSAP. Se o browser tiver um solavanco de performance, a animação vai "saltar" para a posição matemática correta (absoluta) do scroll, em vez de tentar animar suavemente até lá (o que arruinaria o efeito de scrollytelling amarrado à posição física).
3.  **A Regra do `.fromTo` + `scrub: true`:** Animações complexas ligadas ao scroll **NÃO DEVEM** usar `gsap.to()` ou `gsap.from()`, pois estes herdam o estado do ecrã no momento da inicialização (que é imprevisível em refreshes a meio da página). Usa sempre `.fromTo()` para definir rigidamente o estado `0%` e o estado `100%` da animação, com `scrub: true` no ScrollTrigger para atar a cabeça de leitura ao scroll.
4.  **Isolamento de Estado Inicial:** Se uma secção tem uma animação de "Montagem" no carregamento inicial da página e também reage ao scroll, elas devem ser isoladas. Se o refresh for feito fora do topo da página, a animação de "Montagem" é cancelada via JavaScript e apenas o estado do ScrollTrigger (`.fromTo`) assume o controlo da geometria dos elementos baseada na posição exata da barra de scroll.

---

## Estratégia de Cores em Pares (Em Teste A/B)

Para agrupar os serviços visualmente e manter o design minimalista, implementámos um sistema de temas por pares, injetado via variáveis CSS (`--theme-color`).

Atualmente o site está dividido em duas abordagens para avaliar qual se encaixa melhor no estilo Industrial-Chic:

**Fase 1 (Secções Iniciais - Metade 1): AURA DE LUZ**
- O agrupamento de serviços (ex: Laser, 3D) partilha a mesma cor temática.
- A cor manifesta-se através de um *glow* subtil na interface (títulos, hover de botões) e um gradiente radial gigante, extremamente ténue (10% opacidade) no fundo, como se houvesse um holofote de estúdio colorido atrás da secção. O fundo contínua maioritariamente negro.

**Fase 2 (Secções Finais - Metade 2): VIDRO FUMADO (GLASMORPHISM)**
- O fundo é mantido 100% escuro e técnico (Grid de pontos/linhas).
- A distinção visual acontece envolvendo o conteúdo da secção num painel de vidro escuro (`backdrop-filter`) com bordas e reflexos suaves pintados com a `--theme-color` do par atual. Confere uma sensação tátil e premium de profundidade.

---

## Implementado até agora

1.  **Estrutura do Projeto:**
    *   `index.html`: Estrutura semântica com 3 seções principais (Estamparia, Laser, Acrílico) e um contentor para as camadas de fundo.
    *   `style.css`: Estilização base com o fundo preto, seções de ecrã inteiro e a lógica visual para as camadas de fundo.
    *   `script.js`: Orquestrador central com Absolute Scroll Sync.

2.  **Ambiente de Desenvolvimento (no `.idx/dev.nix`):
    *   Servidor web Python (`dev.nix`) configurado.

3.  **Mecanismo de Scrollytelling:**
    *   GSAP e ScrollTrigger instalados. Lenis Smooth Scroll calibrado para *Absolute Sync*.
    *   **Título 4winners (`hero-animation.js`):** Implementado o sistema de fragmentação condicional (Resolve o bug de refresh).
    *   **Transição de Fundo:** Sincroniza a opacidade das camadas de fundo com a posição do scroll.
    *   **Estamparia:** Animação de escala (simulação de prensa).
    *   **Laser de Fibra:** Sistema de partículas dinâmico (`laser-animation.js`).
    *   **Acrílico Premium:** Efeito de refração de vidro (`glass-effect.js`).

---

## Próximos Passos (A Implementar)

- [ ] **Efeitos Visuais Específicos:**
    - [ ] **Montagem de Medalhas:** Animar a vista explodida dos componentes a unirem-se com o scroll, utilizando o paradigma `fromTo + scrub: true` rigoroso para evitar sobreposição de estados.

- [ ] **Assets e Otimização:**
    - [ ] Substituir as cores de fundo placeholder pelas imagens Ultra-Wide 21:9 finais.
    - [ ] Implementar *lazy loading* para as imagens para otimizar o tempo de carregamento inicial da página.

- [ ] **Finalização e Deploy:**
    - [ ] Refinar a paleta de cores e a tipografia no `style.css` para alinhar perfeitamente com o DNA visual.
    - [ ] Configurar o Firebase Hosting e fazer o deploy do site.