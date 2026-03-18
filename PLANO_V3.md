# PLANO DE IMPLEMENTAÇÃO - V3 (Arquitetura de Catálogo Agrupado)

Este plano descreve a transição de uma landing page de serviços individuais para um sistema de grupos de serviços com navegação por listas dinâmicas.

---

## FASE 1: Reestruturação de Dados (Configuração)
**Objetivo:** Organizar os serviços em categorias lógicas no código.

1.  **Refatorar `modules/services-config.js`:**
    - Criar um novo objeto `serviceGroups` que mapeia IDs de grupos para uma lista de serviços.
    - Manter o objeto `serviceConfig` para os detalhes técnicos de cada sub-serviço.
2.  **Definição das Capas de Grupo:**
    - Decidir se cada grupo tem uma pasta própria de assets (ex: `assets/grupo-acabamentos/00.webp`) ou se usa a capa do primeiro serviço da lista.

## FASE 2: Transformação da Interface (Landing Page)
**Objetivo:** Atualizar o `index.html` para mostrar grupos e listas clicáveis.

1.  **Redesenho dos Cartões no `index.html`:**
    - Substituir os blocos de texto individuais por títulos de grupos (ex: "ACABAMENTOS DE SUPERFÍCIE").
    - Injetar uma lista `<ul>` em cada cartão onde cada `<li>` representa um serviço.
2.  **Atributos de Gatilho:**
    - Cada item da lista terá um `data-service="ID-DO-SERVICO"` para que o JavaScript saiba qual modal abrir.
3.  **Ajustes de CSS:**
    - Estilizar a lista para que os itens pareçam botões elegantes e tenham uma área de clique (hitbox) confortável para mobile.

## FASE 3: Lógica de Navegação e Media
**Objetivo:** Adaptar o `script.js` e `modules/modal.js` para a nova forma de navegar.

1.  **Interceção de Cliques na Lista:**
    - O `script.js` deve ouvir cliques nos itens da lista e disparar a abertura do modal correspondente.
2.  **Sincronização de Capas Dinâmicas:**
    - Garantir que o fundo do cartão do grupo carrega a media correta do inventário.
3.  **Consolidação do Modal:**
    - Ajustar o título e o corpo do modal para refletir o serviço específico selecionado na lista.

## FASE 4: Testes de UX e Responsividade
**Objetivo:** Garantir que a lista é fácil de usar em todos os dispositivos.

1.  **Feedback Visual:** Adicionar efeitos de hover/active nos itens da lista para o utilizador saber que são clicáveis.
2.  **Scroll Interno:** Garantir que se a lista for muito longa, o cartão lida bem com isso (ou colunas duplas).

---
**ESTADO:** Aguardando lista oficial de Grupos e Serviços para iniciar FASE 1.
