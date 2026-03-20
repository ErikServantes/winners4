# Plano de Implementação: Otimização Performance V3

Este plano foca-se em resolver os problemas críticos de performance identificados na branch `V3`, começando pela gestão de recursos das partículas globais.

## 1. Otimização do Motor de Partículas (#1)
**Objetivo:** Parar o desenho no Canvas quando as partículas estão ocultas.

### Alterações:
- **`modules/global-particles.js`**:
  - Adicionar variáveis `isPaused` e `animationFrameId`.
  - Modificar a função `animate()` para verificar `isPaused`.
  - Retornar um objeto com métodos `pause()` e `resume()`.
- **`script.js`**:
  - Capturar o controlador retornado pelo `initializeGlobalParticles()`.
  - No `ScrollTrigger` de `setupParticleFading`, chamar `pause()` após o fade-out e `resume()` antes do fade-in.

## 2. Otimização de Filtros CSS (#2)
**Objetivo:** Reduzir o peso do rendering nos painéis de vidro.

### Alterações:
- **`style.css`**:
  - Adicionar `will-change: transform, opacity` aos elementos animados.
  - Otimizar o `backdrop-filter` para ser menos agressivo ou desativar em mobile se a performance continuar baixa.

## 3. Melhoria do Media Engine (#3)
**Objetivo:** Sincronizar a rotação 360 com o refresh rate do ecrã.

### Alterações:
- **`modules/media-engine.js`**:
  - Substituir `setInterval` por `requestAnimationFrame` na função de rotação automática.

---
## Verificação
1. **Monitorização de CPU:** Abrir o Chrome DevTools > Performance Monitor e verificar se o uso de CPU desce para ~0% quando as partículas estão "hidden".
2. **Teste Visual:** Verificar se o regresso das partículas é suave (sem saltos).
3. **Teste 360:** Rodar o visualizador 360 e confirmar que a rotação é fluida sem *jank*.
