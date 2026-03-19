# PLANO DE RECUPERAÇÃO E IMPLEMENTAÇÃO V3

**Objetivo:** Implementar a arquitetura de "Grupos de Serviços" da V3, garantindo que o logótipo, os cliques nos modais e o efeito de *mouseover* funcionam de forma consistente, sem conflitos ou erros.

---

### **FASE 0: Verificação de Infraestrutura e Caminhos (O Diagnóstico Inicial)**
**Objetivo:** Garantir que todos os ficheiros e pastas estão no sítio certo e que os scripts os conseguem encontrar, antes de escrever qualquer código novo.

1.  **Ação (Análise de Pastas):**
    *   Listar a estrutura completa da pasta `assets/` para confirmar que as pastas dos novos serviços (ex: `desenho-vectorial`, `modelacao-3d`) existem e que as capas (`00.webp`) estão lá.
2.  **Ação (Análise de Configuração):**
    *   Inspecionar o `modules/services-config.js` para garantir que as chaves (ex: `desenho-vectorial`) correspondem aos nomes das pastas.
3.  **Ação (Análise de Imports):**
    *   Verificar o topo de todos os ficheiros `.js` (`script.js`, `modal.js`, etc.) para confirmar que os caminhos de importação (`import ... from './modules/...'`) estão corretos.
4.  **Critério de Teste:** No final desta fase, teremos a certeza absoluta de que não existem erros de "ficheiro não encontrado" (404) ou de caminhos "hardcoded".

---

### **FASE 1: Diagnóstico de Eventos (Isolar o Bug do Clique)**
**Objetivo:** Descobrir porque é que o clique nos itens da lista não está a ser registado.

1.  **Ação:** Editar o `script.js` para adicionar um *listener* de clique global que nos dirá na consola *exatamente* em que elemento HTML estamos a clicar.
2.  **Critério de Teste:**
    *   **Teste A:** Clicar em "Design Gráfico". A consola do browser **deve** mostrar o clique no elemento `<li>` com `data-service="desenho-vectorial"`.
    *   **Teste B:** Clicar no botão "CONTACTO" no topo. A consola **deve** mostrar o clique no `<a>` com `data-service="contacto"`.

---

### **FASE 2: Centralização da Lógica (A Solução Arquitetónica)**
**Objetivo:** Simplificar o código para que um único "chefe" (`script.js`) controle todas as interações da página principal, eliminando conflitos de cache e de eventos.

1.  **Ação:**
    *   O `script.js` passa a ser o **único** a carregar o `inventory.json`.
    *   O `script.js` terá o **único** `addEventListener` para os cliques nos serviços.
    *   O `modules/modal.js` será "simplificado" para apenas **receber ordens** do `script.js`.
2.  **Critério de Teste:**
    *   **Teste A:** Ao abrir a página, a consola deve mostrar um único log de "Inventário Carregado Centralmente".
    *   **Teste B:** Ao clicar em "Modelação 3D", a consola deve mostrar que o `script.js` está a enviar o comando para o `modal.js`.

---

### **FASE 3: Re-implementação Segura da V3 (A Funcionalidade Final)**
**Objetivo:** Reconstruir as funcionalidades de clique e *mouseover* sobre a nova base sólida.

1.  **Ação (Cliques):** Ligar a lógica da Fase 2 para que o modal abra com o conteúdo correto do "Design Gráfico" e "Modelação 3D".
2.  **Ação (Mouseover com "Lock" e "Memória"):** Implementar o efeito de *mouseover* no `script.js` com o sistema de "bloqueio" e o temporizador de 3 segundos.
3.  **Critério de Teste:**
    *   Passar o rato de "Design Gráfico" para "Modelação 3D". A imagem de fundo deve trocar suavemente sem flashes pretos.
    *   Clicar em "Modelação 3D" deve abrir o modal correto com a sua imagem e textos.
    *   Tirar o rato da lista mantém a imagem por 3 segundos.
