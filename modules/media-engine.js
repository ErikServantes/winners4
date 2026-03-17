/**
 * MEDIA ENGINE V2.1 - Gestão de Media Dinâmica com Proteção de Seleção
 */

export const MediaEngine = {
    /**
     * Inicializa um visualizador 360 por sequência de frames
     */
    init360(data, container) {
        container.innerHTML = '';
        container.className = 'viewer-360-container';
        // Impedir seleção de texto e arrasto de imagem nativo
        container.style.userSelect = 'none';
        container.style.webkitUserSelect = 'none';
        container.style.touchAction = 'none'; // Importante para mobile
        
        const img = document.createElement('img');
        img.src = `${data.folder}${data.prefix}00${data.extension}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.pointerEvents = 'none'; // Evita que o browser tente arrastar a imagem

        const hint = document.createElement('div');
        hint.className = 'viewer-360-hint';
        hint.innerHTML = 'A carregar interação...';

        container.appendChild(img);
        container.appendChild(hint);

        const frames = [];
        let loaded = 0;
        let isDragging = false;
        let startX = 0;
        let currentIndex = 0;
        let rotateInterval;

        // Preload
        for (let i = 0; i < data.count; i++) {
            const f = new Image();
            const idx = i.toString().padStart(2, '0');
            f.src = `${data.folder}${data.prefix}${idx}${data.extension}`;
            f.onload = () => {
                loaded++;
                if (loaded === data.count) {
                    hint.innerHTML = '<span class="material-symbols-outlined">360</span> Arraste para rodar';
                    setupEvents();
                }
            };
            frames.push(f);
        }

        function setupEvents() {
            rotateInterval = setInterval(() => {
                if (!isDragging) {
                    currentIndex = (currentIndex + 1) % data.count;
                    img.src = frames[currentIndex].src;
                }
            }, 100);

            const startDrag = (e, x) => {
                // Impedir comportamentos padrão do browser (seleção)
                if (e.cancelable) e.preventDefault();
                
                isDragging = true;
                startX = x;
                container.style.cursor = 'grabbing';
                hint.style.opacity = '0';
                clearInterval(rotateInterval);
                
                // Adicionar classe global para desativar seleção no body
                document.body.style.userSelect = 'none';
                document.body.style.webkitUserSelect = 'none';
            };

            const moveDrag = (e, x) => {
                if (!isDragging) return;
                const diff = x - startX;
                if (Math.abs(diff) > 10) { // Sensibilidade aumentada
                    const dir = diff > 0 ? -1 : 1;
                    currentIndex = (currentIndex + dir + data.count) % data.count;
                    img.src = frames[currentIndex].src;
                    startX = x;
                }
            };

            const stopDrag = () => {
                if (!isDragging) return;
                isDragging = false;
                container.style.cursor = 'grab';
                document.body.style.userSelect = '';
                document.body.style.webkitUserSelect = '';
            };

            // Eventos de Rato
            container.addEventListener('mousedown', e => startDrag(e, e.clientX));
            window.addEventListener('mousemove', e => moveDrag(e, e.clientX));
            window.addEventListener('mouseup', stopDrag);

            // Eventos de Touch
            container.addEventListener('touchstart', e => startDrag(e, e.touches[0].clientX), {passive: false});
            container.addEventListener('touchmove', e => {
                if (isDragging) {
                    if (e.cancelable) e.preventDefault();
                    moveDrag(e, e.touches[0].clientX);
                }
            }, {passive: false});
            container.addEventListener('touchend', stopDrag);
        }

        return () => {
            clearInterval(rotateInterval);
            document.body.style.userSelect = '';
            frames.length = 0;
        };
    },

    /**
     * Renderiza Vídeo
     */
    initVideo(data, container) {
        container.innerHTML = `<video src="${data.src}" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;"></video>`;
        return () => {
            const v = container.querySelector('video');
            if (v) { v.pause(); v.src = ""; v.load(); v.remove(); }
        };
    },

    /**
     * Renderiza Imagem
     */
    initImage(data, container) {
        container.innerHTML = `<img src="${data.src}" style="width:100%; height:100%; object-fit:cover;">`;
        return null;
    }
};
