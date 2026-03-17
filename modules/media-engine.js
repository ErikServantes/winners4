
/**
 * MEDIA ENGINE - Módulo unificado para visualização de media
 * Gere vídeos, imagens e o sistema de 360 por frames (WebP)
 */

export const MediaEngine = {
    /**
     * Cria e configura um visualizador 360 baseado em sequência de imagens
     * @param {Object} data - Dados do item (folder, prefix, extension, count)
     * @param {HTMLElement} container - Onde injetar o visualizador
     */
    initImage360(data, container) {
        container.innerHTML = '';
        container.className = 'viewer-360-container image-360';
        container.style.cursor = 'grab';
        container.style.userSelect = 'none';

        const imgElement = document.createElement('img');
        imgElement.src = `${data.folder}${data.prefix}00${data.extension}`;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'contain';
        imgElement.style.pointerEvents = 'none';
        
        const hint = document.createElement('div');
        hint.className = 'viewer-360-hint';
        hint.innerHTML = 'A carregar interação...';
        
        container.appendChild(imgElement);
        container.appendChild(hint);

        const images = [];
        let loadedCount = 0;
        let isDragging = false;
        let startX = 0;
        let currentFrameIndex = 0;
        let autoRotateInterval, autoRotateTimeout;
        let isAutoRotating = true;

        // Pré-carregamento das imagens
        for (let i = 0; i < data.count; i++) {
            const img = new Image();
            const formattedIndex = i.toString().padStart(2, '0');
            img.src = `${data.folder}${data.prefix}${formattedIndex}${data.extension}`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === data.count) {
                    hint.innerHTML = '<span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 5px;">360</span>Arraste para rodar';
                    setupInteraction();
                }
            };
            images.push(img);
        }

        function startAutoRotate() {
            isAutoRotating = true;
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(() => {
                if (isAutoRotating && !isDragging) {
                    currentFrameIndex = (currentFrameIndex + 1) % data.count;
                    imgElement.src = images[currentFrameIndex].src;
                }
            }, 120);
        }

        function stopAutoRotate() {
            isAutoRotating = false;
            clearInterval(autoRotateInterval);
            clearTimeout(autoRotateTimeout);
        }
        
        function resumeAutoRotateDelay() {
            clearTimeout(autoRotateTimeout);
            autoRotateTimeout = setTimeout(startAutoRotate, 1000);
        }

        function setupInteraction() {
            startAutoRotate();
            
            const sensitivity = 15;

            const handleMove = (clientX) => {
                if (!isDragging) return;
                const diffX = clientX - startX;
                if (Math.abs(diffX) > sensitivity) {
                    const direction = diffX > 0 ? -1 : 1;
                    currentFrameIndex = (currentFrameIndex + direction + data.count) % data.count;
                    imgElement.src = images[currentFrameIndex].src;
                    startX = clientX;
                }
            };

            const startDrag = (clientX) => {
                isDragging = true;
                startX = clientX;
                container.style.cursor = 'grabbing';
                hint.style.opacity = '0';
                stopAutoRotate();
            };

            const endDrag = () => {
                if (isDragging) {
                    isDragging = false;
                    container.style.cursor = 'grab';
                    resumeAutoRotateDelay();
                }
            };

            container.addEventListener('mousedown', (e) => startDrag(e.clientX));
            window.addEventListener('mousemove', (e) => handleMove(e.clientX));
            window.addEventListener('mouseup', endDrag);

            container.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX), { passive: true });
            container.addEventListener('touchmove', (e) => {
                if (isDragging) e.preventDefault();
                handleMove(e.touches[0].clientX);
            }, { passive: false });
            container.addEventListener('touchend', endDrag);
        }

        // Função de limpeza
        return () => {
            stopAutoRotate();
            // Limpar referências
            images.length = 0;
        };
    },

    /**
     * Lógica de escolha de media inteligente (Smart Selection)
     */
    smartSelect(mediaList, weekNum) {
        if (!mediaList || mediaList.length === 0) return null;

        // O novo sistema usa timestamps, o antigo usava index. 
        // Vamos suportar ambos para garantir compatibilidade durante a transição.
        
        const NOW = Date.now();
        const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

        // 1. Procurar novidades por timestamp se existir
        const recentMedia = mediaList.filter(item => item.timestamp && (NOW - item.timestamp) < TWO_WEEKS_MS);
        
        if (recentMedia.length > 0) {
            return recentMedia[0];
        }

        // 2. Fallback para carrossel semanal
        const index = (weekNum - 1) % mediaList.length;
        return mediaList[index];
    }
};
