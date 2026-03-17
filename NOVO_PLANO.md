# PLANO DE FINALIZAÇÃO - V2 (Branch v2)

Este plano foca-se na automatização total das capas e na garantia de performance (limpeza de memória), mantendo a simplicidade visual atual.

---

## FASE 1: Dinamismo Total da Landing Page
**Objetivo:** Eliminar a necessidade de editar o `index.html` para trocar tipos de media (Imagem vs Vídeo).

1.  **Injeção Dinâmica de Capas:** Alterar o `script.js` para que, ao carregar a página, ele procure o objeto `cover` no `inventory.json` para cada secção.
2.  **Suporte a Vídeo em Loop:** Se a capa (`00`) for um ficheiro `.mp4` ou `.webm`, o site criará automaticamente um fundo de vídeo em loop suave.
3.  **Fallback de Segurança:** Se o ficheiro `00` não for encontrado, o site usará uma imagem padrão de backup para não ficar um buraco negro.

## FASE 2: Gestão de Memória e Performance (Crítico)
**Objetivo:** Garantir que o site não fica lento depois de o utilizador ver muitas fotos/vídeos.

1.  **Destruição Real de Objetos:** No `MediaEngine`, garantir que ao fechar um vídeo ou 360, o elemento é removido do DOM, a memória é libertada (`video = null`) e todos os listeners de eventos são limpos.
2.  **Pre-loading Inteligente:** Otimizar o carregamento das sequências 360 para que só comecem a carregar quando o utilizador clica no item, poupando dados inicialmente.

## FASE 3: Polimento Mobile e Testes Finais
**Objetivo:** Garantir que a experiência é perfeita em todos os dispositivos.

1.  **Revisão de Toque (Touch):** Verificar se o arrasto do 360 está fluido no telemóvel e se não interfere com o scroll da página.
2.  **Bateria de Testes:**
    - Testar navegação por setas no Lightbox.
    - Testar fecho de modais por botão 'X' e tecla ESC.
    - Testar carregamento de novos ficheiros com nomes genéricos.

---
**ESTADO:** Aguardando aprovação para iniciar FASE 1.
