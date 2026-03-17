
/**
 * MEDIA ENGINE - Módulo unificado para visualização de media
 * Gere vídeos, imagens e o novo sistema de 360 por vídeo (scrubbing)
 */

export const MediaEngine = {
    /**
     * Cria e configura um visualizador 360 baseado em vídeo
     * @param {Object} data - Dados do item (src, etc)
     * @param {HTMLElement} container - Onde injetar o visualizador
     */
    initVideo360(data, container) {
        container.innerHTML = '';
        container.className = 'viewer-360-container video-360';
        container.style.cursor = 'ew-resize';

        const video = document.createElement('video');
        video.src = data.src;
        video.preload = 'auto';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        video.style.pointerEvents = 'none'; // Importante para o drag no container funcionar

        const hint = document.createElement('div');
        hint.className = 'viewer-360-hint';
        hint.innerHTML = '<span class="material-symbols-outlined">360</span> Arraste para analisar';
        
        container.appendChild(video);
        container.appendChild(hint);

        let isDragging = false;
        let startX = 0;
        let startFrameTime = 0;
        let videoDuration = 0;

        // Ao carregar metadados, sabemos a duração
        video.addEventListener('loadedmetadata', () => {
            videoDuration = video.duration;
            video.currentTime = 0;
        });

        const handleStart = (clientX) => {
            isDragging = true;
            startX = clientX;
            startFrameTime = video.currentTime;
            container.classList.add('is-dragging');
            hint.style.opacity = '0';
        };

        const handleMove = (clientX) => {
            if (!isDragging || !videoDuration) return;
            
            const deltaX = clientX - startX;
            // Sensibilidade: mover a largura total do container percorre o vídeo todo
            const percentageChange = deltaX / container.offsetWidth;
            let newTime = startFrameTime - (percentageChange * videoDuration);
            
            // Loop infinito do tempo do vídeo
            while (newTime < 0) newTime += videoDuration;
            while (newTime > videoDuration) newTime -= videoDuration;
            
            video.currentTime = newTime;
        };

        const handleEnd = () => {
            isDragging = false;
            container.classList.remove('is-dragging');
        };

        // Eventos de Rato
        container.addEventListener('mousedown', (e) => handleStart(e.clientX));
        window.addEventListener('mousemove', (e) => handleMove(e.clientX));
        window.addEventListener('mouseup', handleEnd);

        // Eventos de Touch
        container.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX), { passive: true });
        container.addEventListener('touchmove', (e) => {
            if (isDragging) e.preventDefault();
            handleMove(e.touches[0].clientX);
        }, { passive: false });
        container.addEventListener('touchend', handleEnd);

        // Função de limpeza para evitar memory leaks
        return () => {
            video.pause();
            video.src = "";
            video.load();
            video.remove();
        };
    },

    /**
     * Lógica de escolha de media inteligente (Smart Selection)
     * @param {Array} mediaList - Lista de media do serviço
     * @param {number} weekNum - Número da semana atual
     * @returns {Object} O item de media selecionado
     */
    smartSelect(mediaList, weekNum) {
        if (!mediaList || mediaList.length === 0) return null;

        const NOW = Date.now();
        const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

        // 1. Procurar novidades (menos de 14 dias)
        const recentMedia = mediaList.filter(item => (NOW - item.timestamp) < TWO_WEEKS_MS);
        
        if (recentMedia.length > 0) {
            // Se houver novidades, mostra a mais recente de todas
            return recentMedia[0]; // O inventário já vem ordenado por timestamp desc
        }

        // 2. Se não houver novidades, carrossel semanal
        const index = (weekNum - 1) % mediaList.length;
        return mediaList[index];
    }
};
