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
    filtersContainer.innerHTML = '';
    
    // "Todos" button
    const allBtn = document.createElement('button');
    allBtn.className = 'portfolio-filter-btn active';
    allBtn.textContent = 'Todos';
    allBtn.dataset.filter = 'todos';
    allBtn.addEventListener('click', () => {
        setActiveFilter(filtersContainer, 'todos');
        renderGrid(gridContainer, 'todos');
    });
    filtersContainer.appendChild(allBtn);

    // Dynamic service buttons
    for (const folder in inventoryCache) {
        const data = inventoryCache[folder];
        if (data && data.length > 0) {
            const btn = document.createElement('button');
            btn.className = 'portfolio-filter-btn';
            btn.textContent = serviceData[folder] ? serviceData[folder].title : folder;
            btn.dataset.filter = folder;
            btn.addEventListener('click', () => {
                setActiveFilter(filtersContainer, folder);
                renderGrid(gridContainer, folder);
            });
            filtersContainer.appendChild(btn);
        }
    }
}

function setActiveFilter(filtersContainer, activeFilter) {
    const buttons = filtersContainer.querySelectorAll('.portfolio-filter-btn');
    buttons.forEach(btn => {
        if (btn.dataset.filter === activeFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function renderGrid(gridContainer, filter) {
    gridContainer.innerHTML = ''; // Clear current grid

    const items = [];

    if (filter === 'todos') {
        for (const folder in inventoryCache) {
            const data = inventoryCache[folder];
            if (data && data.length > 0) {
                data.forEach(item => items.push({ folder, item }));
            }
        }
    } else {
        if (inventoryCache[filter] && inventoryCache[filter].length > 0) {
            inventoryCache[filter].forEach(item => items.push({ folder: filter, item }));
        }
    }

    items.forEach(({ folder, item }) => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.dataset.folder = folder;
        div.dataset.file = item.file;
        div.dataset.type = item.type;

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = `assets/${folder}/${item.file}`;
            img.loading = 'lazy';
            img.alt = `Portefólio ${folder}`;
            div.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = `assets/${folder}/${item.file}`;
            video.muted = true;
            video.loop = true;
            video.autoplay = true;
            video.playsInline = true;
            div.appendChild(video);
            
            const icon = document.createElement('span');
            icon.className = 'item-type-icon material-symbols-outlined';
            icon.textContent = 'play_circle';
            div.appendChild(icon);
        } else if (item.type === '360') {
            const img = document.createElement('img');
            img.src = `assets/${folder}/${item.folder}/frame_00.webp`; // Fallback image
            img.loading = 'lazy';
            img.alt = `Portefólio 360 ${folder}`;
            div.appendChild(img);
            
            const icon = document.createElement('span');
            icon.className = 'item-type-icon material-symbols-outlined';
            icon.textContent = '360';
            div.appendChild(icon);
        }

        // Adicionar Lightbox click (A implementar na próxima sub-fase)
        div.addEventListener('click', () => {
             console.log('Abrir Lightbox para:', folder, item);
        });

        gridContainer.appendChild(div);
    });
}
