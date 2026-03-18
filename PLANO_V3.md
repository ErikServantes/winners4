# PLANO DE IMPLEMENTAÇÃO - V3 (Arquitetura de Catálogo Agrupado)

Este plano descreve a transição de uma landing page de serviços individuais para um sistema de 6 grupos industriais com navegação por listas dinâmicas e efeitos visuais avançados.

---

## FASE 1: Reestruturação de Dados e Infraestrutura
**Objetivo:** Preparar as pastas e a configuração lógica para a nova hierarquia.

1.  **Criação de Novas Pastas em `assets/`:**
    - `desenho-vectorial/`, `fundicao/`, `polimento/`, `evaporacao-vacuo/`, `pintura-envernizamento/`, `gravacao-fresa/`.
2.  **Atualização do `modules/services-config.js`:**
    - Implementar o objeto `serviceGroups` com a nova taxonomia.
    - Corrigir terminologias: "Abrilhantamento" e "Gravação por fresa".
    - Manter/Atualizar as especificações técnicas para cada um dos 18 sub-serviços.

## FASE 2: Transformação da Interface (Landing Page)
**Objetivo:** Reduzir as 12+ secções atuais para apenas 6 secções de impacto (Grupos).

1.  **Redesenho dos Cartões no `index.html`:**
    - Substituir textos longos por listas `<ul>` interativas.
    - Cada `<li>` terá um atributo `data-service="slug-do-servico"`.
2.  **Ajustes de Layout:**
    - Garantir que os painéis de vidro (Glass Effect) acomodam bem as listas.
    - Manter a alternância Zig-Zag para os 6 blocos principais.

## FASE 3: Interatividade Dinâmica (Mouseover & Modais)
**Objetivo:** Criar o efeito "Wow" e a navegação funcional.

1.  **Efeito Mouseover (Desktop):**
    - Implementar lógica no `script.js`: ao passar o rato num item da lista, a imagem/vídeo de fundo do cartão (`section-media`) muda suavemente para a capa desse sub-serviço.
2.  **Gatilho de Modais Dinâmicos:**
    - Cliques nos itens da lista abrem o modal correspondente com as especificações técnicas e media específica (usando o `MediaEngine V2.6`).
3.  **Sincronização com o Inventário:**
    - O `generate-inventory.mjs` continuará a alimentar todo o sistema automaticamente.

## FASE 4: UX Mobile e Otimização Final
**Objetivo:** Garantir que o catálogo é funcional em todos os contextos.

1.  **Adaptabilidade Mobile:**
    - Em touch, a imagem de fundo será a do primeiro serviço do grupo por defeito.
    - Garantir que os itens da lista têm altura suficiente para cliques precisos.
2.  **Limpeza de Memória:**
    - Reforçar que a troca de imagens no mouseover também respeita a política de performance e não acumula lixo no DOM.

---
**LISTA OFICIAL DE GRUPOS E SERVIÇOS:**
1. **Design**: Desenho Vectorial, Modelação 3D.
2. **Manufactura Aditiva**: Impressão 3D, Fundição Metais/Resina.
3. **Manufatura Subtrativa**: Corte Laser, Maquinação CNC, Torneamento.
4. **Conformação**: Estampagem/Ambutissagem, Repuxamento, Quinagem, Calandragem.
5. **Acabamento de Superfícies**: Polimento/Abrilhantamento, Evaporação Metálica, Processos Galvânicos, Pintura/Envernizamento.
6. **Personalização**: Gravação Laser, Gravação por Fresa, Impressão Directa.

---
**ESTADO:** Plano atualizado. Pronto para iniciar FASE 1.
