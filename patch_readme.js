const fs = require('fs');
let readme = fs.readFileSync('README.md', 'utf8');

const newText = `### 3. Melhorias Visuais e de Performance
- **Comportamento Inteligente das Partículas:** As partículas globais (brasas) agora fazem fade-out automático ao entrar na zona de leitura dos serviços e fade-in no Hero e Contactos, reduzindo o ruído visual e poupando bateria/CPU (ScrollTrigger).
- **Hero & Slogan:** Adição e animação fluída do Slogan ("Excelência em Transformação de Metal") e correção de bugs ("Logo Fantasma" e espaçamentos) na renderização inicial do logótipo SVG.
- **Correções CSS/UI:** Isolamento do título principal, fixação da altura da janela no telemóvel para evitar saltos (100vh dinâmico), e remoção de barras de scroll horizontais extra introduzidas pelo modal.
- **Ritmo de Leitura (Espaçamento):** Ajuste fino da cadência de *scroll*. Redução do espaço vertical vazio (\`min-height\`, \`margin\`, e \`padding\`) entre secções e dentro dos cartões, gerando uma densidade de informação B2B mais coesa tanto no Desktop como no Mobile.
- **Auto-Rotação 360º:** O visualizador 360º de imagens (Impressão 3D) agora roda automaticamente para chamar a atenção. Inclui lógica de interrupção instantânea ao toque e um *standby* inteligente que retoma a rotação 1 segundo após o utilizador largar a peça.

### 4. Funcionalidades de Contacto & Segurança
- **Segurança Anti-Bot:** Implementação de ofuscação (concatenação de strings em execução) no JS para proteger o Email e o Telefone de web scrapers/bots de spam.
- **Blindagem de Scripts (Vendor Lock-in):** As dependências externas (GSAP, ScrollTrigger, Lenis e Model-Viewer) foram descarregadas e servidas localmente a partir da pasta \`vendor/\`. Isto imuniza o site contra injeções de código provenientes de CDNs comprometidas (Subresource Integrity protection) e mitiga quedas de rede de terceiros.
- **Layout Modal de Contacto:** O modal de contacto tem agora um design em ecrã inteiro focado puramente na ação rápida ("Ligar Agora" CTA) e direções de GPS.`;

readme = readme.replace(/### 3\. Melhorias Visuais e de Performance[\s\S]*?### 4\. Funcionalidades de Contacto & Segurança[\s\S]*?(?=\n---)/, newText);

fs.writeFileSync('README.md', readme);
