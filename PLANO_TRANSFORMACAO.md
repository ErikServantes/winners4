# Plano de Implementação: Transformação Visual e Estrutural (Industrial-Chic)

Este documento descreve as etapas para transformar a landing page, focando no destaque dos serviços no fluxo principal e refinando a experiência visual com partículas dinâmicas.

## Visão Geral
*   **Hero & Contactos:** Ambiente imersivo com fundo preto absoluto e partículas 3D.
*   **Serviços:** Foco na informação e imagem real. Layout ZigZag elegante (sem partículas) para facilitar a leitura.
*   **Modal "Saber Mais":** Evolui de um ecrã de descrição geral para um hub de especificações técnicas detalhadas (materiais, tolerâncias, espessuras e modelos 3D).

---

## Fase 1: Comportamento Dinâmico das Partículas (Ocultação Inteligente)
O objetivo é "desligar" o ruído visual durante a leitura dos serviços e voltar a ligá-lo no final.

*   **Ficheiro:** `modules/global-particles.js` (ou através de GSAP no `script.js`).
*   **Ação:** Implementar `ScrollTrigger` do GSAP associado aos canvas `#particles-bg` e `#particles-fg`.
*   **Comportamento:**
    1.  **Início:** Opacidade a 100% durante a secção `#hero-4winners`.
    2.  **Meio:** Ao entrar na primeira secção de serviço (`#corte-laser`), animar a opacidade para 0% (fade-out suave). Pausar o cálculo de animação no `requestAnimationFrame` para poupar bateria/CPU (Opcional, mas recomendado).
    3.  **Fim:** Ao entrar na secção `#contacto`, reativar os cálculos e animar a opacidade de volta para 100% (fade-in mágico).

## Fase 2: Reestruturação dos Cartões de Serviço (Fluxo Principal)
Trazer as descrições ricas e o impacto visual que antes estavam escondidos no modal para a página principal.

*   **Ficheiro:** `index.html` e `style.css`
*   **Ação:** Expandir o modelo já testado em "Corte de Laser" e "Gravação a Laser" a todas as outras secções.
*   **Tarefas HTML:**
    1.  Aplicar classes `layout-split` e alternar `zigzag-left` / `zigzag-right` em todas as `<section>` de serviços.
    2.  Transferir o texto descritivo longo de `modules/modal.js` para o `<p>` de cada cartão em `index.html`.
    3.  Adicionar a estrutura `<div class="section-media"><img src="..." loading="lazy" alt="..."></div>` para cada serviço.
    4.  Manter os botões `<button class="details-btn">Saber Mais</button>`.
*   **Tarefas de Imagem:** Para os serviços sem imagem atual (ex: Estampagem, Torneamento, etc.), colocar um *placeholder* temporário elegante ou adicionar as imagens que faltam à pasta `assets/`.

## Fase 3: A Nova Vida do Modal "Saber Mais" (Deep-Dive Técnico)
Com a descrição principal já na página, o modal transforma-se numa ferramenta para o cliente técnico.

*   **Ficheiro:** `modules/modal.js` e `style.css`
*   **Ação:** Limpar descrições redundantes do objeto `serviceData` e focar em dados técnicos.
*   **Estrutura da Informação a adicionar ao `serviceData`:**
    *   `materials`: (Já existente) Lista de materiais suportados.
    *   `technical_specs`: (Novo - Futuro) Dados como tolerâncias de corte, espessuras máximas/mínimas, áreas de trabalho das máquinas.
    *   `mediaType`: Transição gradual de imagens estáticas para foco em `3d` (`<model-viewer>`) ou vídeos de demonstração (`video`).
*   **Refatoração do HTML injetado:** O modal abrirá diretamente para as especificações e *showcase* da peça (com visualizador de modelo 3D).

## Fase 4: Limpeza e Otimização
*   **Fundos (Backgrounds):** Garantir que o CSS de fundo dos serviços apoia o contraste sem necessitar das partículas. Verificar o `#background-layers`.
*   **Mobile Review:** Testar extensivamente o empilhamento vertical (imagem em cima, texto colado em baixo com margem negativa) nos diferentes tamanhos de telemóvel para garantir proporção e leitura fáceis.

---
**Próximo Passo:** Se estiveres de acordo com este plano, o ideal será começar pela **Fase 1** (Comportamento das Partículas via ScrollTrigger) ou pela **Fase 2** (Propagar o HTML ZigZag aos restantes 10 serviços com os textos do `modal.js`).