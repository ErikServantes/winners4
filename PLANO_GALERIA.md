# Plano de Implementação: Sistema de Media Dinâmica e Portefólio Global

Este documento descreve as fases para implementar um sistema de ficheiros "Drop & Forget" (Dinamismo Rotativo) e um Modal de Portefólio Global B2B.

## Visão Geral
O objetivo é acabar com as imagens estáticas codificadas no JavaScript. A aplicação passará a inspecionar inteligentemente as pastas físicas dos serviços (ex: `assets/estampagem/`) e a adaptar-se aos conteúdos que lá forem "despejados" (.webp, .mp4, ou pastas 360º), alterando o que é mostrado ao utilizador semanalmente.

Esta mesma inteligência vai alimentar uma galeria central de Portefólio acessível no cabeçalho do site.

---

## Fase 1: Padronização e Estruturação de Ficheiros (Assets)
*   **Ação:** Reorganizar a pasta `assets/` para acomodar o novo sistema numérico de pastas.
*   **Tarefas:**
    1. Criar uma pasta individual para cada serviço dentro de `assets/` (ex: `assets/estampagem/`, `assets/corte-laser/`, etc).
    2. Mover as imagens únicas atuais (ex: `CORTE_LASER.webp`) para as suas respetivas pastas e renomeá-las para `01.webp`.
    3. Reorganizar a sequência de Afonso Henriques movendo a pasta `assets/AfonsoHenriques/` para `assets/impressao-3d/01/` (passa a ser o primeiro recurso 360º desse serviço).

## Fase 2: O Motor de "Auto-Discovery" e Rotação Semanal (Modal de Serviços)
*   **Ação:** Refatorar o ficheiro `modules/modal.js` para usar o sistema de tentativa e erro inteligente (`onerror` handler).
*   **Tarefas:**
    1. Remover as chaves hardcoded `mediaType` e `mediaSrc` do objeto `serviceData`.
    2. Adicionar apenas o nome base da pasta (ex: `folder: 'estampagem'`).
    3. Criar a lógica que calcula o índice atual com base na Semana do Ano (ex: `Semana % 10` = ficheiro nº 3).
    4. Criar a função de "Ping Cego" em JavaScript que testa se o ficheiro existe:
       - Ficheiro `assets/servico/03.webp` (Imagem)
       - Ficheiro `assets/servico/03.mp4` (Vídeo Auto-play)
       - Ficheiro `assets/servico/03/frame_00.webp` (Motor 360º)
    5. O Motor injeta o HTML correto no Painel Esquerdo do Modal B2B.

## Fase 3: Dinamismo Híbrido nos Cartões da Página Inicial
*   **Ação:** Aplicar a lógica da Fase 2 às imagens estáticas que estão na Landing Page (no Layout ZigZag).
*   **Tarefas:**
    1. Quando a página carrega, o `script.js` faz o mesmo cálculo semanal.
    2. As tags `<img src="...">` dos cartões ZigZag são substituídas por um contentor inteligente que carrega exatamente a mesma foto, vídeo, ou "preview 360" (frame_00 estático) que foi decidida para aquela semana.
    3. *Nota de Otimização:* Se for um vídeo pesado a calhar na página principal, deve iniciar pausado e só tocar quando entrar no ecrã (ScrollTrigger).

## Fase 4: O Botão e a Galeria de Portefólio Global (Showroom)
*   **Ação:** Criar o botão superior esquerdo "PORTEFÓLIO" oposto ao contacto e a interface dedicada a ecrã inteiro.
*   **Tarefas:**
    1. **UI/HTML:** Injetar o botão `<a href="#portfolio" class="nav-portfolio-link">PORTEFÓLIO</a>` no header (ao lado esquerdo).
    2. **O "Scanner" Automático:** O JS percorre todos os 12 serviços (varrendo do índice 01 ao 10) e constrói um grande catálogo com todos os ficheiros detetados.
    3. **A Grelha de Miniaturas (Grid):** Renderizar um modal em ecrã inteiro escuro (`z-index: 10000`). O conteúdo será gerado dinamicamente: secções separadas por máquina/serviço, com miniaturas quadradas das fotos e vídeos (e do `frame_00` para os 360º).
    4. **O Slideshow / Lightbox Interativo:** 
       - Ao clicar ou tocar numa miniatura, esta expande para ocupar o ecrã.
       - Implementar botões (Próxima / Anterior) e suporte a gestos (Swipe) para passar ao longo de todas as imagens dessa categoria.
       - Permitir o gesto de pinça (Pinch-to-zoom) ou clique/duplo-toque para escalar/fazer zoom na imagem selecionada.
       - Se a miniatura clicada for um 360º, o visor de ecrã inteiro transforma-se automaticamente no player rotativo de 36 frames.
    5. **Categorização Tátil:** Botões no topo da galeria para filtrar peças apenas por "Estampagem", "Maquinação CNC", etc.

## Fase 5: Ajustes e Otimizações de Memória
*   **Ação:** Prevenir *Memory Leaks* com os vídeos e visualizadores pesados 360º.
*   **Tarefas:**
    1. Ao fechar o Modal do Serviço ou a Galeria, destruir ativamente as *tags* de `<video>` e os *timers* (setInterval) do 360º.
    2. Testar o fluxo de falhas rigorosamente para garantir que não há ecrãs em branco.
