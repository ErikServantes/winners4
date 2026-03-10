# Landing Page Industrial-Chic - Scrollytelling

Este projeto é uma Single Page Application (SPA) estática com foco em uma experiência de scrollytelling fluida e visualmente impactante, seguindo uma estética "Industrial-Chic".

## DNA Visual (The Master Style)

- **Background:** Preto Obsidiana Infinito (`#000000`)
- **Iluminação:** Chiaroscuro com Rim Lighting
- **Paleta:** Latão Polido (Warm Gold), Gunmetal Grey e Azul Néon
- **Assets:** Imagens Ultra-Wide 21:9 geradas por IA

---

## Implementado até agora

1.  **Estrutura do Projeto:**
    *   `index.html`: Estrutura semântica com 3 seções principais (Estamparia, Laser, Acrílico) e um contentor para as camadas de fundo.
    *   `style.css`: Estilização base com o fundo preto, seções de ecrã inteiro e a lógica visual para as camadas de fundo (com cores placeholder).
    *   `script.js`: Onde a interatividade do scrollytelling é implementada.

2.  **Ambiente de Desenvolvimento (no `.idx/dev.nix`):
    *   **Servidor de Pré-visualização:** Um servidor web Python foi configurado para iniciar automaticamente, permitindo a pré-visualização em tempo real do site.
    *   **Configuração do IDX:** O ambiente está configurado para abrir os ficheiros `index.html`, `style.css` e `script.js` por defeito, agilizando o desenvolvimento.

3.  **Mecanismo de Scrollytelling (com GSAP):
    *   **Inclusão do GSAP:** A biblioteca de animação GreenSock (GSAP) e o seu plugin `ScrollTrigger` foram adicionados ao projeto via CDN.
    *   **Transição de Fundo:** O `script.js` foi reescrito para usar o `ScrollTrigger`. Ele agora sincroniza a opacidade das camadas de fundo com a posição do scroll, criando um efeito de transição suave e de alta performance à medida que o utilizador navega verticalmente pelas seções.
    *   **Animação de Conteúdo:** Animações de "fade-in" e "slide-in" para os títulos e parágrafos de cada seção foram implementadas com o `ScrollTrigger`.
    *   **Efeitos Visuais Específicos:**
        *   **Estamparia:** Foi adicionada uma animação de escala específica para a seção "Estamparia" para simular um efeito de "prensa" ou "impacto".
        *   **Laser de Fibra:** Foi desenvolvido um sistema de partículas em JavaScript/Canvas para simular as faíscas de corte em tempo real, ativado pelo `ScrollTrigger`.
        *   **Acrílico Premium:** Efeito de vidro com `backdrop-filter` e rotação animada para simular refração de luz.

---

## Próximos Passos (A Implementar)

- [ ] **Efeitos Visuais Específicos:**
    - [ ] **Montagem de Medalhas:** Animar a vista explodida dos componentes a unirem-se com o scroll.

- [ ] **Assets e Otimização:**
    - [ ] Substituir as cores de fundo placeholder pelas imagens Ultra-Wide 21:9 finais.
    - [ ] Implementar *lazy loading* para as imagens para otimizar o tempo de carregamento inicial da página.

- [ ] **Finalização e Deploy:**
    - [ ] Refinar a paleta de cores e a tipografia no `style.css` para alinhar perfeitamente com o DNA visual.
    - [ ] Configurar o Firebase Hosting e fazer o deploy do site para testes em múltiplos dispositivos.
