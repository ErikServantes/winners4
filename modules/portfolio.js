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
                const div = document.createElement('div');
                div.className = 'portfolio-item';
                div.dataset.folder = folder;
                div.dataset.type = item.type;

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
                    icon.className = 'item-type-icon material-symbols-outlined';
                    icon.textContent = 'play_circle';
                    div.appendChild(icon);
                } else if (item.type === '360') {
                    const img = document.createElement('img');
                    img.src = `${item.folder}frame_00.webp`;
                    img.loading = 'lazy';
                    img.alt = `Portefólio 360 ${folder}`;
                    div.appendChild(img);
                    
                    const icon = document.createElement('span');
                    icon.className = 'item-type-icon material-symbols-outlined';
                    icon.textContent = '360';
                    div.appendChild(icon);
                }

                div.addEventListener('click', () => {
                     console.log('Abrir Lightbox para:', folder, item);
                });

                categoryGrid.appendChild(div);
            });
        }
    }
}
