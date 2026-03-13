const fs = require('fs');

let code = fs.readFileSync('modules/modal.js', 'utf8');

// Replace the setupInteraction function definition to include auto-rotation logic
code = code.replace(
    'function setupInteraction() {\n        let isDragging = false;\n        let startX = 0;\n        let currentFrameIndex = 0;',
    `function setupInteraction() {
        let isDragging = false;
        let startX = 0;
        let currentFrameIndex = 0;
        
        // --- LÓGICA DE AUTO-ROTAÇÃO ---
        let autoRotateInterval = null;
        let isAutoRotating = true;

        // Inicia a rotação automática a 15fps (ou o que for suave)
        function startAutoRotate() {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(() => {
                if (isAutoRotating && !isDragging) {
                    currentFrameIndex++;
                    if (currentFrameIndex >= data.mediaCount) currentFrameIndex = 0;
                    imgElement.src = images[currentFrameIndex].src;
                }
            }, 60); // Ajusta os milissegundos para controlar a velocidade (60ms ≈ 16 FPS)
        }

        // Para definitivamente a auto-rotação quando o utilizador interagir
        function stopAutoRotate() {
            isAutoRotating = false;
            if (autoRotateInterval) clearInterval(autoRotateInterval);
        }

        // Inicia a rodar logo de caras
        startAutoRotate();
        // ------------------------------`
);

// Add stopAutoRotate to mousedown
code = code.replace(
    `container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            container.style.cursor = 'grabbing';
            // Oculta a dica ao começar a interagir para uma vista limpa
            hintElement.style.opacity = '0';
        });`,
    `container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            container.style.cursor = 'grabbing';
            // Oculta a dica ao começar a interagir para uma vista limpa
            hintElement.style.opacity = '0';
            stopAutoRotate(); // Interrompe a auto-rotação para sempre
        });`
);

// Add stopAutoRotate to touchstart
code = code.replace(
    `container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            hintElement.style.opacity = '0';
        }, { passive: true });`,
    `container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            hintElement.style.opacity = '0';
            stopAutoRotate(); // Interrompe a auto-rotação para sempre
        }, { passive: true });`
);


// Clear the interval when modal is closed
// In init360Viewer signature we don't have direct access to the close button event but we can attach a mutation observer or simpler: we attach a custom cleanup event to the container
code = code.replace(
    `const hintElement = document.querySelector('.viewer-360-hint');`,
    `const hintElement = document.querySelector('.viewer-360-hint');
    
    // Função global de limpeza (útil se o modal fechar)
    container.cleanup360 = null;`
);

code = code.replace(
    `// Inicia a rodar logo de caras
        startAutoRotate();
        // ------------------------------`,
    `// Inicia a rodar logo de caras
        startAutoRotate();

        // Expõe uma forma de parar o timer se o utilizador fechar o modal
        container.cleanup360 = () => {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
        };
        // ------------------------------`
);

// Call cleanup in closeModal
code = code.replace(
    `function closeModal() {
        modal.classList.remove('visible');
    }`,
    `function closeModal() {
        modal.classList.remove('visible');
        
        // Se houver um 360 viewer ativo, para o seu timer/animação de fundo
        const viewerContainer = document.querySelector('.viewer-360-container');
        if (viewerContainer && typeof viewerContainer.cleanup360 === 'function') {
            viewerContainer.cleanup360();
        }
    }`
);

fs.writeFileSync('modules/modal.js', code);
