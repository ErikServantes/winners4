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

## 🛠 Guia de Atualização (Gestão de Media V3)

O sistema deste site baseia-se num ficheiro de "mapa central" (`assets/inventory.json`). O site lê este ficheiro no arranque para não ter de bombardear o servidor lentamente a procurar que imagens existem ao longo da navegação. A reconstrução deste mapa é agora totalmente flexível e inteligente.

### 1. Preparação da Media (Upload Múltiplo via FTP)
*   **Capas Opcionais de Categoria (Globais):** Para mudar o vídeo ou imagem base *fullscreen* da secção a que o serviço pertence (ex: fundo global do Grupo *Design*), basta colocar o novo vídeo na pasta central **`assets/servicos/`** estritamente com o número da secção correspondente (ex: `01.mp4`, `02.mp4` para Manufatura Aditiva, etc.).
*   **Capas Individuais de Sub-Serviços:** Para forçar a imagem de demonstração que aparece ao fazer 'hover' com o rato no nome de um sub-serviço e na capa do seu Portefólio Modal, o ficheiro deve ser arrastado para a pasta correspondente e chame-se **`00.webp`** (ou .mp4). Se não for fornecida a capa `00`, aplica-se o *Fallback Automático* e herda-se a "Capa Global" dessa Categoria.
*   **Media Normais do Portefólio (Projetos):** Arrastar as peças de portefólio e fotografias finais diretamente para a pasta da categoria-base (ex: `assets/corte-laser/minha-peca-inox.jpg`). O nome não interessa. O sistema ordena sempre publicações baseadas na **Data de Criação do Ficheiro** (New-First).
*   **Interações Dinâmicas 360º:** Criar obrigatoriamente uma pasta finalizada no sufixo `_360` (ex: `nova-medalha_360/`) e despejar sem interrupções os ficheiros iterativos base (desde `frame_00.webp`, `frame_01.webp`, etc.).

### 2. Sincronizar Tudo (A Nova Arquitetura Automática)

*(**Nota Ténica:** O robusto script sentinela `watch-assets.mjs` deve estar ativado 24h na máquina ou servidor de produção via Process Manager como o PM2.)*

**A Magia Remota (Para quem apenas usa Clientes de FTP):**
Quando acabares de deitar dezenas de ficheiros para dentro de diferentes pastas nas `assets/`, basta ires à raiz do teu projeto, copiares ou arrastares o pequeno ficheiro isco vazio chamado **`atualizar.now`** também para a pasta `assets/`.
O sentinela furtivo do servidor repara, injeta preventivamente uma espera unificada (*Debounce* de 500ms para salvaguardar *uploads* arrastados intermitentes), corre o motor de processamento lógico subjacente ultra-rápido Assíncrono (`generate-inventory.mjs`), emite o novo site internamente e arruma o ficheiro `atualizar.now` atirando-o de volta à raiz para voltar a acionar este reset remotamente quando quiseres. Nunca necessitas de ver a consola do Windows ou do Linux.

**Desenvolvedor Manual:**
Podes reconstruir toda a árvore iterativa em qualquer altura forçando compilação com a consola de ambiente:
```bash
node generate-inventory.mjs
```

---

## 💎 Design System
*   **Paleta:** Black Industrial (#000000) e Premium Gold (#d4af37).
*   **Tipografia:** Helvetica Neue / Monospace para dados técnicos.
*   **Interatividade:** Foco total em gestos de arrasto para o 360 e navegação por teclado (Setas/ESC) no Lightbox.
