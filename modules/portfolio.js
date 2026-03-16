import { getWeekNumber } from './modal.js';

let inventoryCache = null;

const serviceData = {
    'estampagem': { title: 'Estampagem' },
    'corte-laser': { title: 'Corte de Laser' },
    'gravacao-laser': { title: 'Gravação a Laser' },
    'modelacao-3d': { title: 'Modelação 3D' },
    'impressao-3d': { title: 'Impressão 3D' },
    'maquinacao-cnc': { title: 'Maquinação CNC' },
    'quinagem': { title: 'Quinagem' },
    'calandragem': { title: 'Calandragem' },
    'repuxamento': { title: 'Repuxamento' },
    'torneamento': { title: 'Torneamento' },
    'galvanizacao': { title: 'Galvanização' },
    'impressao-uv': { title: 'Impressão UV' }
};

export async function initializePortfolio() {
    const btn = document.getElementById('portfolio-btn');
    const modal = document.getElementById('portfolio-modal');
    if (!btn || !modal) return;
    const closeBtn = modal.querySelector('.portfolio-close');
    const filtersContainer = document.getElementById('portfolio-filters');
    const gridContainer = document.getElementById('portfolio-grid');


    try {
        const response = await fetch('assets/inventory.json');
        if (!response.ok) throw new Error('Falha ao carregar o inventário de portefólio.');
        inventoryCache = await response.json();
    } catch (error) {
        console.error('Erro de portefólio:', error);
        return;
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPortfolio(modal, filtersContainer, gridContainer);
    });

    closeBtn.addEventListener('click', () => {
        closePortfolio(modal);
    });

    // Configurar os botões do Lightbox
    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) {
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
        });
        
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            if (currentLightboxIndex < lightboxItems.length - 1) openLightbox(currentLightboxIndex + 1);
        });
        
        // Fechar ao clicar fora
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('visible')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
            if (e.key === 'ArrowRight' && currentLightboxIndex < lightboxItems.length - 1) openLightbox(currentLightboxIndex + 1);
        });
    }


    // Fechar se clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePortfolio(modal);
        }
    });
}

function openPortfolio(modal, filtersContainer, gridContainer) {
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    modal.classList.add('visible');

    renderFilters(filtersContainer, gridContainer);
    renderGrid(gridContainer, 'todos'); // Show all by default
}

function closePortfolio(modal) {
    modal.classList.remove('visible');

    setTimeout(() => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        // Clear videos to prevent memory leaks
        document.getElementById('portfolio-grid').innerHTML = '';
    }, 400); // Wait for transition
}

function renderFilters(filtersContainer, gridContainer) {
    // Não precisamos de botões de filtro, a galeria será contínua
    filtersContainer.innerHTML = '';
    filtersContainer.style.display = 'none'; // Esconder o contentor
}

function renderGrid(gridContainer, filter) {
    gridContainer.innerHTML = ''; // Limpar grelha
    lightboxItems = []; // Resetar o array do lightbox
    let globalIndex = 0;

    // Percorrer cada serviço no inventário
    for (const folder in inventoryCache) {
        const data = inventoryCache[folder];
        
        // Se este serviço tiver itens no portefólio
        if (Array.isArray(data) && data.length > 0) {
            
            // 1. Criar o cabeçalho/título da categoria
            const categoryHeader = document.createElement('h3');
            categoryHeader.className = 'portfolio-category-title';
            categoryHeader.textContent = serviceData[folder] ? serviceData[folder].title : folder;
            gridContainer.appendChild(categoryHeader);

            // 2. Criar a grelha específica para esta categoria
            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'portfolio-category-grid';
            gridContainer.appendChild(categoryGrid);

            // 3. Adicionar os itens à grelha da categoria
            data.forEach(item => {
                // Guardar no array global para o Lightbox conseguir navegar tudo
                const itemIndex = globalIndex++;
                lightboxItems.push({ folder, item });

                const div = document.createElement('div');
                div.className = 'portfolio-item';
                div.dataset.folder = folder;
                div.dataset.type = item.type;
                div.dataset.index = itemIndex;

                if (item.type === 'image') {
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.loading = 'lazy';
                    img.alt = `Portefólio ${folder}`;
                    div.appendChild(img);
                } else if (item.type === 'video') {
                    const video = document.createElement('video');
                    video.src = item.src + "#t=0.1";
                    video.preload = "metadata";
                    video.muted = true;
                    video.playsInline = true;
                    div.appendChild(video);
                    
                    const icon = document.createElement('span');
                    icon.className = 'item-type-icon';
                    icon.textContent = '[ > ]';
                    div.appendChild(icon);
                } else if (item.type === '360') {
                    const img = document.createElement('img');
                    img.src = `${item.folder}frame_00.webp`;
                    img.loading = 'lazy';
                    img.alt = `Portefólio 360 ${folder}`;
                    div.appendChild(img);
                    
                    const icon = document.createElement('span');
                    icon.className = 'item-type-icon';
                    icon.textContent = '[ 360 ]';
                    div.appendChild(icon);
                }

                div.addEventListener('click', () => {
                     openLightbox(itemIndex);
                });

                categoryGrid.appendChild(div);
            });
        }
    }
}


// --- LIGHTBOX IMPLEMENTATION ---
let lightboxItems = [];
let currentLightboxIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('portfolio-lightbox');
    const contentArea = document.getElementById('lightbox-content-area');
    const caption = document.getElementById('lightbox-caption');
    
    if (!lightbox || !contentArea) return;

    currentLightboxIndex = index;
    const itemData = lightboxItems[index];
    const serviceName = serviceData[itemData.folder] ? serviceData[itemData.folder].title : itemData.folder;

    // Limpar área (para matar vídeos antigos e libertar memória)
    contentArea.innerHTML = '';
    
    // Adiciona o toque de consola técnica (CNC) na legenda: 
    caption.textContent = `SRV::${serviceName.toUpperCase()} / PRJ::[${String(index + 1).padStart(3, '0')}] // LDD::${lightboxItems.length.toString().padStart(3, '0')}`;

    if (itemData.item.type === 'image') {
        const img = document.createElement('img');
        img.src = itemData.item.src;
        img.alt = `Portefólio ${itemData.folder}`;
        contentArea.appendChild(img);
    } else if (itemData.item.type === 'video') {
        const video = document.createElement('video');
        video.src = itemData.item.src;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '90vh';
        contentArea.appendChild(video);
    } else if (itemData.item.type === '360') {
        const container = document.createElement('div');
        container.className = 'viewer-360-container';
        container.style.width = '100%';
        container.style.height = '80vh';
        container.style.maxWidth = '1000px';
        container.style.position = 'relative';
        container.style.cursor = 'crosshair'; /* Mira laser a condizer com tema técnico */
        container.style.userSelect = 'none';
        
        container.innerHTML = `
            <img id="lightbox-360-img" src="${itemData.item.folder}frame_00.webp" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;" alt="Visualização 360º">
            <div class="viewer-360-hint" style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; color: #d4af37; font-family: monospace; font-size: 0.9rem; letter-spacing: 2px; pointer-events: none; opacity: 0.8; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
                &gt; SISTEMA DE ANÁLISE 360 PRONTO // ARRASTE PARA EXAMINAR &lt;
            </div>
        `;
        contentArea.appendChild(container);
        initLightbox360(itemData.item, container);
    }

    lightbox.classList.add('visible');
    
    // Atualizar visibilidade das setas (os nossos novos botões CNC)
    document.querySelector('.lightbox-prev').style.display = currentLightboxIndex > 0 ? 'flex' : 'none';
    document.querySelector('.lightbox-next').style.display = currentLightboxIndex < lightboxItems.length - 1 ? 'flex' : 'none';
}

function closeLightbox() {
    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) {
        lightbox.classList.remove('visible');
        setTimeout(() => {
            document.getElementById('lightbox-content-area').innerHTML = ''; // Limpa memória
        }, 300);
    }
}

function initLightbox360(data, container) {
    const imgElement = container.querySelector('#lightbox-360-img');
    const hintElement = container.querySelector('.viewer-360-hint');
    
    if (!imgElement) return;

    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < data.count; i++) {
        const img = new Image();
        const formattedIndex = i.toString().padStart(2, '0');
        img.src = `${data.folder}frame_${formattedIndex}${data.extension}`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === data.count) {
                hintElement.innerHTML = `<span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 5px;">360</span>Arraste para rodar`;
                setupInteraction();
            }
        };
        images.push(img);
    }

    function setupInteraction() {
        let isDragging = false;
        let startX = 0;
        let currentFrameIndex = 0;
        
        let autoRotateInterval, autoRotateTimeout;
        let isAutoRotating = true;

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
            autoRotateTimeout = setTimeout(() => {
                if (!isDragging) startAutoRotate();
            }, 2000);
        }

        startAutoRotate();

        const handleMove = (clientX) => {
            if (!isDragging) return;
            const deltaX = clientX - startX;
            
            if (Math.abs(deltaX) > 10) { 
                stopAutoRotate();
                const direction = deltaX > 0 ? -1 : 1; 
                currentFrameIndex = (currentFrameIndex + direction + data.count) % data.count;
                imgElement.src = images[currentFrameIndex].src;
                startX = clientX; 
            }
        };

        const startDrag = (clientX) => {
            isDragging = true;
            startX = clientX;
            container.style.cursor = 'grabbing';
            stopAutoRotate();
            hintElement.style.opacity = '0'; // Esconde a dica ao arrastar
        };

        const endDrag = () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
                resumeAutoRotateDelay();
            }
        };

        container.addEventListener('mousedown', (e) => startDrag(e.clientX));
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('mousemove', (e) => handleMove(e.clientX));
        document.addEventListener('mouseleave', endDrag);

        container.addEventListener('touchstart', (e) => e.touches.length && startDrag(e.touches[0].clientX), { passive: true });
        container.addEventListener('touchend', endDrag);
        container.addEventListener('touchcancel', endDrag);
        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            e.touches.length && handleMove(e.touches[0].clientX);
        }, { passive: false });
    }
}
