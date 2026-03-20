/**
 * MEDIA ENGINE V2.6 - Carregamento Progressivo e Tolerância a Falhas
 */

export const MediaEngine = {
    /**
     * Inicializa um visualizador 360 com carregamento inteligente
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
        hint.innerHTML = 'A preparar análise...';

        container.appendChild(img);
        container.appendChild(hint);

        let frames = [];
        let loaded = 0;
        let isDragging = false;
        let startX = 0;
        let currentIndex = 0;
        let rotateFrameId;
        let resumeTimeout;
        let interactionEnabled = false;

        const totalFrames = data.count;
        const requiredToStart = Math.ceil(totalFrames * 0.20); // Liberta interação com 20% dos frames

        for (let i = 0; i < totalFrames; i++) {
            if (isAborted) break;
            const f = new Image();
            const idx = i.toString().padStart(2, '0');
            f.src = `${data.folder}${data.prefix}${idx}${data.extension}`;
            
            f.onload = () => {
                if (isAborted) return;
                loaded++;
                frames[i] = f; 

                if (!interactionEnabled && loaded >= requiredToStart) {
                    interactionEnabled = true;
                    hint.innerHTML = '<span class="material-symbols-outlined">360</span> Arraste para rodar';
                    setupEvents();
                }
            };

            f.onerror = () => {
                if (isAborted) return;
                loaded++; 
                console.warn(`⚠️ Frame ${i} falhou.`);
            };
        }

        let lastRotateTime = 0;
        const rotateDelay = 143;

        function startAutoRotate() {
            if (isAborted) return;
            cancelAnimationFrame(rotateFrameId);
            
            function rotateLoop(timestamp) {
                if (isAborted) return;
                
                if (timestamp - lastRotateTime >= rotateDelay) {
                    if (!isDragging && interactionEnabled) {
                        const nextIndex = (currentIndex + 1) % totalFrames;
                        if (frames[nextIndex]) {
                            currentIndex = nextIndex;
                            img.src = frames[currentIndex].src;
                        }
                    }
                    lastRotateTime = timestamp;
                }
                rotateFrameId = requestAnimationFrame(rotateLoop);
            }
            
            rotateFrameId = requestAnimationFrame(rotateLoop);
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
                cancelAnimationFrame(rotateFrameId);
                clearTimeout(resumeTimeout);
                document.body.style.userSelect = 'none';
                document.body.style.webkitUserSelect = 'none';
            };

            const moveDrag = (e, x) => {
                if (!isDragging || isAborted) return;
                const diff = x - startX;
                if (Math.abs(diff) > 10) { 
                    const dir = diff > 0 ? -1 : 1;
                    const nextIndex = (currentIndex + dir + totalFrames) % totalFrames;
                    if (frames[nextIndex]) {
                        currentIndex = nextIndex;
                        img.src = frames[currentIndex].src;
                        startX = x;
                    }
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
            cancelAnimationFrame(rotateFrameId);
            clearTimeout(resumeTimeout);
            frames.forEach(f => { if(f) { f.src = ''; f.onload = null; f.onerror = null; } });
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
