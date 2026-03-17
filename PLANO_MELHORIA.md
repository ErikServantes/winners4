# Plano de Melhoria: Performance, Unificação e Inteligência de Media

Este plano foca-se na otimização técnica da galeria, na transição do sistema 360 para vídeo e na implementação de uma lógica de rotação de conteúdo mais inteligente ("New First").

---

## Fase 1: Evolução do Inventário (inventory.json)
**Objetivo:** Tornar o manifesto de media mais inteligente e independente de nomes rígidos.

1.  **Remoção da Rigidez (01, 02, 03):** O script `generate-inventory.mjs` deixará de exigir números sequenciais. Usará a data de modificação do ficheiro (`mtime`) para ordenar a media.
    *   *Excepção:* O ficheiro `00.webp` continuará a ser a "Capa" (Cover) por convenção.
2.  **Deteção Infalível de 360:** Um vídeo será tratado como 360 se o nome do ficheiro contiver o sufixo `_360`.
    *   Exemplo: `peça-especial_360.webm` ou `engrenagem_360.mp4`.
3.  **Metadados de Data:** O script incluirá um campo `timestamp` para cada ficheiro, permitindo ao site saber a "idade" do conteúdo.

## Fase 2: Unificação e Motor 360 (WebM/MP4)
**Objetivo:** Substituir as 36 fotos por um único vídeo de alta performance.

1.  **Criação do `modules/media-engine.js`:** Um módulo centralizado que gere:
    *   Reprodução de vídeo normal.
    *   **Motor de Scrubbing 360:** Em vez de trocar `src` de imagens, o motor vai mapear o arrasto do rato/touch diretamente para o `currentTime` do vídeo.
2.  **Otimização de Performance:** Implementar a limpeza rigorosa de memória (destruir instâncias de vídeo e remover listeners) ao fechar modais ou o portefólio.

## Fase 3: Lógica de Rotação "Smart Week"
**Objetivo:** Priorizar novidades e manter o site dinâmico semanalmente.

1.  **Regra dos 14 dias:** Se existirem ficheiros com menos de 2 semanas, o site ignora o carrossel e mostra o mais recente.
2.  **Carrossel Semanal:** Se não houver novidades, a media roda todas as segundas-feiras (baseado no `getWeekNumber()`).
3.  **Fallback Garantido:** Se nada for encontrado, volta à capa `00.webp`.

## Fase 4: Refatoração de Código (DRY)
1.  **Centralização de Configuração:** Mover todos os `serviceData` para um ficheiro único `modules/services-config.js`.
2.  **Limpeza de Assets:** Substituir os placeholders do Unsplash por media real de cada serviço.
