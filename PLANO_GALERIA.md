# Plano de Implementação: Sistema de Media Dinâmica e Portefólio Global

Este documento descreve as fases para implementar um sistema de ficheiros "Drop & Forget" e um Modal de Portefólio Global B2B.

## Visão Geral

O objetivo é ter um sistema onde a media do site (imagens, vídeos, 360s) é gerida simplesmente arrastando ficheiros para as pastas corretas, sem necessidade de alterar código. Um script de automação gera um inventário (`inventory.json`), e o site usa esse inventário para alimentar dinamicamente tanto o conteúdo rotativo nos detalhes dos serviços como uma galeria de portefólio global e filtrável.

---

## Arquitetura do Sistema de Media

O sistema assenta em três pilares:

1.  **Convenção de Estrutura de Pastas:** Dentro de `assets/`, cada serviço tem uma pasta com o seu nome (ex: `assets/impressao-3d/`). Dentro de cada pasta, os ficheiros de portefólio são nomeados sequencialmente (`01.webp`, `02.mp4`, `03/` para 360, etc.). O ficheiro `00.webp` é a imagem de capa.

2.  **Script de Geração de Inventário (`generate-inventory.mjs`):** Um script Node.js que é executado manualmente no terminal (`node generate-inventory.mjs`). Este script varre a diretoria `assets/`, analisa o conteúdo de cada pasta de serviço e gera um ficheiro `assets/inventory.json`.

3.  **O Inventário (`assets/inventory.json`):** Este ficheiro é a "única fonte de verdade" para a aplicação. Contém uma lista estruturada de toda a media disponível para cada serviço. O site carrega este ficheiro uma única vez para saber instantaneamente que media mostrar.

**Fluxo de Trabalho:** Sempre que se adicionam, removem ou renomeiam ficheiros de media na pasta `assets`, basta executar o script `generate-inventory.mjs` para que o site reflita as alterações.

---

## Fases do Projeto

### Fase 1: Setup da Estrutura de Ficheiros **[CONCLUÍDO]**

*   **Ação:** Organizar os ficheiros de media na estrutura de pastas correta.
*   **Tarefas:**
    1.  Criar uma pasta para cada serviço dentro de `assets/`.
    2.  Colocar a imagem de capa de cada serviço como `00.webp`.
    3.  Adicionar os ficheiros de portefólio numerados sequencialmente (ex: `01.webp`, `02/frame_00.webp`, etc.).

### Fase 2: Implementação do Sistema de Inventário **[CONCLUÍDO]**

*   **Ação:** Substituir o sistema original de "Scan Binário" pelo novo sistema de inventário baseado em JSON.
*   **Tarefas:**
    1.  **Script de Geração:** Criado o ficheiro `generate-inventory.mjs`.
    2.  **Inventário Inicial:** Gerado o ficheiro `assets/inventory.json`.
    3.  **Refatoração do JavaScript:** O `modules/modal.js` foi modificado para carregar o `inventory.json` no arranque e usar essa informação para popular a media.
    4.  **Dinamismo Rotativo:** A lógica para mostrar uma media diferente a cada semana no modal de detalhes foi mantida, mas agora usa os dados do inventário.

### Fase 3: Dinamismo - Thumbnails dos Serviços **[CONCLUÍDO]**

*   **Ação:** Fazer com que os cartões de serviço na página principal também usem o sistema de media.
*   **Tarefas:**
    1.  Cada `.service-card` carrega dinamicamente a sua imagem de capa (`00.webp`) correspondente, servindo de base para o dinamismo futuro.

### Fase 4: Showroom de Portefólio - Modal Global **[A FAZER]**

*   **Ação:** Construir o modal de portefólio global, que agrega toda a media de todos os serviços numa única interface.
*   **Tarefas:**
    1.  **Ponto de Acesso:** Adicionar um link/botão "Portefólio" no cabeçalho (`#main-header`) do site.
    2.  **Estrutura do Modal:** Criar o HTML e CSS para um novo modal de ecrã inteiro (`#portfolio-modal`).
    3.  **Grelha de Media:** No arranque, ler o `inventory.json` e construir dinamicamente uma grelha (`grid`) com todas as miniaturas de todos os serviços.
    4.  **Filtros de Categoria:** Adicionar botões no topo do modal para filtrar a grelha (ex: "Todos", "Estampagem", "Maquinação CNC", etc.).
    5.  **Implementar o Lightbox:**
        -   Ao clicar numa miniatura da grelha, abrir um visualizador "lightbox" em ecrã inteiro.
        -   Se for uma imagem, mostrar a imagem. Se for um vídeo, mostrar o vídeo. Se for um 360, **o lightbox deve tornar-se no visualizador 360 interativo**.
        -   Adicionar controlos de navegação (setas Próxima/Anterior) e suporte a gestos (swipe) para navegar entre os itens **dentro da categoria filtrada atualmente**.

### Fase 5: Ajustes e Otimizações de Memória **[PENDENTE]**

*   **Ação:** Prevenir *Memory Leaks* com os vídeos e visualizadores 360º.
*   **Tarefas:**
    1.  Ao fechar o Lightbox do portefólio ou o Modal de Detalhes, garantir que as tags de `<video>` são removidas do DOM e que os *timers* (`setInterval`) dos visualizadores 360º são destruídos.
    2.  Testar o fluxo de falhas rigorosamente (ex: o que acontece se o `inventory.json` não for encontrado?).
