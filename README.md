# 4Winners Industrial-Chic Platform (V2)

Este é o repositório da plataforma digital da 4Winners, desenvolvida com uma arquitetura de alta performance focada na fluidez visual ("Luxurious Inertia") e na facilidade de gestão de conteúdos ("Drop & Forget").

---

## 🏗 Estrutura do Projeto

```text
.
├── assets/                  # Base de Media e Assets
│   ├── [serviço]/           # Pastas por categoria (ex: corte-laser)
│   │   ├── 00.webp          # Capa principal (pode ser .mp4 para vídeo em loop)
│   │   ├── peca-final.webp  # Media genérica (detetada automaticamente)
│   │   └── peca_360/        # Sequência de frames WebP para visualização 360
│   └── inventory.json       # Manifesto de media gerado automaticamente
├── modules/                 # Lógica Modular (Vanilla JS ES6)
│   ├── media-engine.js      # Motor unificado de media (Performance e 360)
│   ├── modal.js             # Gestão dinâmica dos modais de serviço
│   ├── portfolio.js         # Galeria global com lógica New-First
│   ├── smooth-scroll.js     # Motor Lenis (Sincronização absoluta com GSAP)
│   ├── services-config.js   # Especificações técnicas e títulos dos serviços
│   ├── glass-effect.js      # Lógica dos painéis Frosted Glass
│   ├── global-particles.js  # Sistema de partículas 3D em camadas
│   ├── hero-animation.js    # Animação de entrada do logótipo SVG
│   └── scrollytelling.js    # Orquestração de animações baseadas em scroll
├── vendor/                  # Bibliotecas externas (GSAP, Lenis, Model-Viewer)
├── generate-inventory.mjs   # Script Node.js de automação de inventário
├── script.js                # Inicializador e orquestrador dinâmico
├── style.css                # Design System, Layouts e Media Queries
└── index.html               # Estrutura semântica e placeholders
```

---

## 🚀 Funcionalidades e Problemas Resolvidos

### 1. Sistema "Drop & Forget" (Gestão Automatizada)
*   **Vantagem:** Elimina a necessidade de editar código HTML/JS para atualizar o site.
*   **Problema Resolvido:** Antigamente, mudar uma imagem de capa ou adicionar um vídeo exigia mexer no código. Agora, o site adapta-se ao que estiver na pasta.
*   **Suporte Híbrido:** O sistema deteta automaticamente se a capa (`00`) é uma imagem ou vídeo e injeta a tag correta (`<img>` ou `<video>`) com as propriedades de performance adequadas.

### 2. Motor de Media V2.5 (Estabilidade e Performance)
*   **Problema Resolvido:** O uso intensivo de vídeos e sequências 360º pode causar "Memory Leaks", tornando o site lento ou provocando o crash do browser em mobile.
*   **Solução:** Implementámos uma gestão de ciclo de vida rigorosa. Ao fechar qualquer conteúdo, o motor:
    1.  Interrompe carregamentos em curso (Abort).
    2.  Limpa fontes de vídeo (`src = ""`) e descarrega buffers.
    3.  Destrói timers e referências de memória.
    4.  Garante que nenhuma animação tenta aceder a objetos já removidos (Prevenção de erros `null/undefined`).

### 3. Inércia Luxuosa (Experiência Premium)
*   **Vantagem:** Navegação suave que simula a massa de um objeto físico.
*   **Sincronização GSAP:** O motor de scroll está ligado ao ciclo de renderização do GSAP (`ticker`), garantindo que os efeitos de profundidade e as animações de texto não têm "jitter" (trepidação).

### 4. Inteligência de Conteúdo (Smart Selection)
*   **Lógica New-First:** O inventário rastreia a data de criação dos ficheiros. O site prioriza automaticamente novidades dos últimos 14 dias para manter o conteúdo sempre fresco para o utilizador recorrente.
*   **Rotação Semanal:** Caso não existam novidades, a media dos serviços roda automaticamente todas as segundas-feiras, garantindo dinamismo visual.

---

## 🛠 Guia de Atualização

### Como adicionar novos trabalhos:
1.  **Imagens/Vídeos:** Arrastar para a pasta do serviço em `assets/[serviço]/`. Pode ter qualquer nome.
2.  **Interação 360º:** Criar uma pasta que termine em `_360` (ex: `medalha_360/`) e colocar os frames lá dentro (`frame_00.webp`, `frame_01.webp`, etc.).
3.  **Atualizar o Site:** No terminal, executar:
    ```bash
    node generate-inventory.mjs
    ```
    Isto gera o novo `inventory.json`. O site reflete as mudanças instantaneamente após o próximo refresh.

---

## 💎 Design System
*   **Paleta:** Black Industrial (#000000) e Premium Gold (#d4af37).
*   **Tipografia:** Helvetica Neue / Monospace para dados técnicos.
*   **Interatividade:** Foco total em gestos de arrasto para o 360 e navegação por teclado (Setas/ESC) no Lightbox.
