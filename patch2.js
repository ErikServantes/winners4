const fs = require('fs');

let code = fs.readFileSync('modules/modal.js', 'utf8');

// Replace auto-rotation logic block
const oldLogic = `// --- LÓGICA DE AUTO-ROTAÇÃO ---
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

        // Expõe uma forma de parar o timer se o utilizador fechar o modal
        container.cleanup360 = () => {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
        };
        // ------------------------------`;

const newLogic = `// --- LÓGICA DE AUTO-ROTAÇÃO ---
        let autoRotateInterval = null;
        let isAutoRotating = true;
        let autoRotateTimeout = null;

        // Inicia a rotação automática a 15fps
        function startAutoRotate() {
            isAutoRotating = true;
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(() => {
                if (isAutoRotating && !isDragging) {
                    currentFrameIndex++;
                    if (currentFrameIndex >= data.mediaCount) currentFrameIndex = 0;
                    imgElement.src = images[currentFrameIndex].src;
                }
            }, 60); // 60ms ≈ 16 FPS
        }

        // Para temporariamente a auto-rotação quando o utilizador interagir
        function stopAutoRotate() {
            isAutoRotating = false;
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
        }
        
        // Retoma a auto-rotação após um atraso (1 segundo)
        function resumeAutoRotateDelay() {
            if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
            autoRotateTimeout = setTimeout(() => {
                startAutoRotate();
            }, 1000); // 1 segundo de espera
        }

        // Inicia a rodar logo de caras
        startAutoRotate();

        // Expõe uma forma de parar os timers se o utilizador fechar o modal
        container.cleanup360 = () => {
            stopAutoRotate();
        };
        // ------------------------------`;

code = code.replace(oldLogic, newLogic);


// Replace mouseup and touchend to include resume
const oldMouseUp = `window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
            }
        });`;

const newMouseUp = `window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
                resumeAutoRotateDelay(); // Retoma rotação 1s após largar
            }
        });`;
        
code = code.replace(oldMouseUp, newMouseUp);


const oldTouchEnd = `window.addEventListener('touchend', () => {
            isDragging = false;
        });`;

const newTouchEnd = `window.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                resumeAutoRotateDelay(); // Retoma rotação 1s após largar
            }
        });`;

code = code.replace(oldTouchEnd, newTouchEnd);

// Replace mousedown and touchstart to clear timeout if user clicks before 1s delay finishes
code = code.replace(
    `container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            container.style.cursor = 'grabbing';
            // Oculta a dica ao começar a interagir para uma vista limpa
            hintElement.style.opacity = '0';
            stopAutoRotate(); // Interrompe a auto-rotação para sempre
        });`,
    `container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            container.style.cursor = 'grabbing';
            // Oculta a dica ao começar a interagir para uma vista limpa
            hintElement.style.opacity = '0';
            stopAutoRotate(); // Pausa imediatamente e cancela delays pendentes
        });`
);

code = code.replace(
    `container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            hintElement.style.opacity = '0';
            stopAutoRotate(); // Interrompe a auto-rotação para sempre
        }, { passive: true });`,
    `container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            hintElement.style.opacity = '0';
            stopAutoRotate(); // Pausa imediatamente e cancela delays pendentes
        }, { passive: true });`
);

fs.writeFileSync('modules/modal.js', code);
