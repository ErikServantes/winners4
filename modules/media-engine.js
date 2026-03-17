/**
 * MEDIA ENGINE V2.5 - Gestão de Memória e Performance Crítica
 */

export const MediaEngine = {
    /**
     * Inicializa um visualizador 360 com proteção de memória e aborto de carregamento
     */
    init360(data, container) {
        let isAborted = false;
        container.innerHTML = '';
        container.className = 'viewer-360-container';
        container.style.userSelect = 'none';
        container.style.webkitUserSelect = 'none';
        container.style.touchAction = 'none';
        
        const img = document.createElement('img');
        img.src = `${data.folder}${data.prefix}00${data.extension}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.pointerEvents = 'none';

        const hint = document.createElement('div');
        hint.className = 'viewer-360-hint';
        hint.innerHTML = 'A carregar interação...';

        container.appendChild(img);
        container.appendChild(hint);

        let frames = [];
        let loaded = 0;
        let isDragging = false;
        let startX = 0;
        let currentIndex = 0;
        let rotateInterval;
        let resumeTimeout;

        const totalFrames = data.count;

        // Inicia carregamento dos frames
        for (let i = 0; i < totalFrames; i++) {
            if (isAborted) break;
            const f = new Image();
            const idx = i.toString().padStart(2, '0');
            f.src = `${data.folder}${data.prefix}${idx}${data.extension}`;
            f.onload = () => {
                if (isAborted) return;
                loaded++;
                if (loaded === totalFrames) {
                    hint.innerHTML = '<span class="material-symbols-outlined">360</span> Arraste para rodar';
                    setupEvents();
                }
            };
            frames.push(f);
        }

        function startAutoRotate() {
            if (isAborted) return;
            clearInterval(rotateInterval);
            rotateInterval = setInterval(() => {
                if (!isDragging && frames.length > 0 && frames[currentIndex]) {
                    img.src = frames[currentIndex].src;
                    currentIndex = (currentIndex + 1) % totalFrames;
                }
            }, 143); 
        }

        function stopAutoRotate() {
            clearInterval(rotateInterval);
            clearTimeout(resumeTimeout);
        }

        function setupEvents() {
            if (isAborted) return;
            startAutoRotate();

            const startDrag = (e, x) => {
                if (e.cancelable) e.preventDefault();
                isDragging = true;
                startX = x;
                container.style.cursor = 'grabbing';
                hint.style.opacity = '0';
                stopAutoRotate();
                document.body.style.userSelect = 'none';
                document.body.style.webkitUserSelect = 'none';
            };

            const moveDrag = (e, x) => {
                if (!isDragging || isAborted) return;
                const diff = x - startX;
                if (Math.abs(diff) > 10) { 
                    const dir = diff > 0 ? -1 : 1;
                    currentIndex = (currentIndex + dir + totalFrames) % totalFrames;
                    if (frames[currentIndex]) img.src = frames[currentIndex].src;
                    startX = x;
                }
            };

            const stopDrag = () => {
                if (!isDragging || isAborted) return;
                isDragging = false;
                container.style.cursor = 'grab';
                document.body.style.userSelect = '';
                document.body.style.webkitUserSelect = '';
                clearTimeout(resumeTimeout);
                resumeTimeout = setTimeout(startAutoRotate, 1000);
            };

            container.addEventListener('mousedown', e => startDrag(e, e.clientX));
            window.addEventListener('mousemove', e => moveDrag(e, e.clientX));
            window.addEventListener('mouseup', stopDrag);

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
            isAborted = true;
            stopAutoRotate();
            frames.forEach(f => { f.src = ''; f.onload = null; });
            frames = [];
            img.src = '';
            container.innerHTML = '';
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
        };
    },

    initVideo(data, container) {
        container.innerHTML = '';
        const video = document.createElement('video');
        video.src = data.src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        container.appendChild(video);

        return () => {
            video.pause();
            video.src = "";
            video.load();
            video.remove();
        };
    },

    initImage(data, container) {
        container.innerHTML = '';
        const img = document.createElement('img');
        img.src = data.src;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        container.appendChild(img);
        return () => {
            img.src = '';
            img.remove();
        };
    }
};
