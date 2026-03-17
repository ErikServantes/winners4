import { serviceConfig } from './services-config.js';
import { MediaEngine } from './media-engine.js';
import { getWeekNumber } from './modal.js';

let inventoryCache = null;
let currentLightboxCleanup = null;

export async function initializePortfolio() {
    const btn = document.getElementById('portfolio-btn');
    const modal = document.getElementById('portfolio-modal');
    if (!btn || !modal) return;
    
    const closeBtn = modal.querySelector('.portfolio-close');
    const gridContainer = document.getElementById('portfolio-grid');

    try {
        const response = await fetch('assets/inventory.json');
        if (!response.ok) throw new Error('Falha ao carregar o inventário.');
        inventoryCache = await response.json();
    } catch (error) {
        console.error('Erro portefólio:', error);
        return;
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPortfolio(modal, gridContainer);
    });

    closeBtn.addEventListener('click', () => closePortfolio(modal));

    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) {
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
        });
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            if (currentLightboxIndex < lightboxItems.length - 1) openLightbox(currentLightboxIndex + 1);
        });
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('visible')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
            if (e.key === 'ArrowRight' && currentLightboxIndex < lightboxItems.length - 1) openLightbox(currentLightboxIndex + 1);
        });
    }

    modal.addEventListener('click', (e) => { if (e.target === modal) closePortfolio(modal); });
}

function openPortfolio(modal, gridContainer) {
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    modal.classList.add('visible');
    renderGrid(gridContainer);
}

function closePortfolio(modal) {
    modal.classList.remove('visible');
    setTimeout(() => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.getElementById('portfolio-grid').innerHTML = '';
    }, 400);
}

function renderGrid(gridContainer) {
    gridContainer.innerHTML = '';
    lightboxItems = [];
    let globalIndex = 0;

    for (const folder in inventoryCache) {
        const data = inventoryCache[folder];
        if (Array.isArray(data) && data.length > 0) {
            const categoryHeader = document.createElement('h3');
            categoryHeader.className = 'portfolio-category-title';
            categoryHeader.textContent = serviceConfig[folder]?.title || folder;
            gridContainer.appendChild(categoryHeader);

            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'portfolio-category-grid';
            gridContainer.appendChild(categoryGrid);

            data.forEach(item => {
                const itemIndex = globalIndex++;
                lightboxItems.push({ folder, item });

                const div = document.createElement('div');
                div.className = 'portfolio-item';
                div.dataset.index = itemIndex;

                if (item.type === 'image') {
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.loading = 'lazy';
                    div.appendChild(img);
                } else if (item.type === '360') {
                    const img = document.createElement('img');
                    img.src = `${item.folder}frame_00.webp`;
                    img.loading = 'lazy';
                    div.appendChild(img);
                    
                    const icon = document.createElement('span');
                    icon.className = 'item-type-icon';
                    icon.textContent = '[ 360 ]';
                    div.appendChild(icon);
                } else if (item.type === 'video') {
                    const v = document.createElement('video');
                    v.src = item.src + "#t=0.1";
                    v.preload = "metadata";
                    v.muted = true;
                    div.appendChild(v);

                    const icon = document.createElement('span');
                    icon.className = 'item-type-icon';
                    icon.textContent = '[ > ]';
                    div.appendChild(icon);
                }

                div.addEventListener('click', () => openLightbox(itemIndex));
                categoryGrid.appendChild(div);
            });
        }
    }
}

let lightboxItems = [];
let currentLightboxIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('portfolio-lightbox');
    const contentArea = document.getElementById('lightbox-content-area');
    const caption = document.getElementById('lightbox-caption');
    if (!lightbox || !contentArea) return;

    if (currentLightboxCleanup) currentLightboxCleanup();

    currentLightboxIndex = index;
    const itemData = lightboxItems[index];
    const serviceName = serviceConfig[itemData.folder]?.title || itemData.folder;

    contentArea.innerHTML = '';
    caption.textContent = `SRV::${serviceName.toUpperCase()} / PRJ::[${String(index + 1).padStart(3, '0')}]`;

    if (itemData.item.type === 'image') {
        const img = document.createElement('img');
        img.src = itemData.item.src;
        contentArea.appendChild(img);
        currentLightboxCleanup = null;
    } else if (itemData.item.type === 'video') {
        contentArea.innerHTML = `<video src="${itemData.item.src}" controls autoplay loop playsinline class="lightbox-video"></video>`;
        currentLightboxCleanup = () => {
            const v = contentArea.querySelector('video');
            if (v) { v.pause(); v.src = ""; v.load(); v.remove(); }
        };
    } else if (itemData.item.type === '360') {
        currentLightboxCleanup = MediaEngine.initImage360(itemData.item, contentArea);
    }

    lightbox.classList.add('visible');
    document.querySelector('.lightbox-prev').style.display = currentLightboxIndex > 0 ? 'flex' : 'none';
    document.querySelector('.lightbox-next').style.display = currentLightboxIndex < lightboxItems.length - 1 ? 'flex' : 'none';
}

function closeLightbox() {
    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) {
        lightbox.classList.remove('visible');
        if (currentLightboxCleanup) {
            currentLightboxCleanup();
            currentLightboxCleanup = null;
        }
    }
}
