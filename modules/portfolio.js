import { serviceConfig, serviceGroups } from './services-config.js';
import { MediaEngine } from './media-engine.js';

let inventoryCache = null;
let currentLightboxCleanup = null;
let lightboxItems = [];
let currentLightboxIndex = 0;

async function loadInventory() {
    try {
        const response = await fetch('assets/inventory.json?v=' + Date.now());
        if (!response.ok) throw new Error("HTTP error " + response.status);
        const data = await response.json();
        return data?.meta?.services || {};
    } catch (error) {
        console.error('❌ Erro Carregamento Inventário:', error);
        return {};
    }
}

export async function initializePortfolio() {
    const btn = document.getElementById('portfolio-btn');
    const modal = document.getElementById('portfolio-modal');
    if (!btn || !modal) return;

    const closeBtn = modal.querySelector('.portfolio-close');
    const gridContainer = document.getElementById('portfolio-grid');

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        inventoryCache = await loadInventory();
        openPortfolio(modal, gridContainer);
    });

    closeBtn.addEventListener('click', () => closePortfolio(modal));

    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) {
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
        });
        lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
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
    if (window.lenis) window.lenis.stop();
    renderGrid(gridContainer);
}

function closePortfolio(modal) {
    modal.classList.remove('visible');
    if (window.lenis) window.lenis.start();
    setTimeout(() => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.getElementById('portfolio-grid').innerHTML = '';
    }, 400);
}

function renderGrid(container) {
    container.innerHTML = '';
    lightboxItems = [];
    let globalIndex = 0;

    for (const [groupId, groupData] of Object.entries(serviceGroups)) {
        const groupTitle = groupData.title;
        let hasAnyItems = false;
        const groupContainer = document.createElement('div');
        
        const titleEl = document.createElement('h3');
        titleEl.className = 'portfolio-category-title';
        titleEl.textContent = groupTitle;
        groupContainer.appendChild(titleEl);

        const grid = document.createElement('div');
        grid.className = 'portfolio-category-grid';
        groupContainer.appendChild(grid);

        groupData.services.forEach(serviceKey => {
            const inventoryData = inventoryCache[serviceKey];
            if (inventoryData && inventoryData.items && inventoryData.items.length > 0) {
                hasAnyItems = true;
                inventoryData.items.forEach(item => {
                    const index = globalIndex++;
                    lightboxItems.push({ serviceKey, item, groupTitle });

                    const div = document.createElement('div');
                    div.className = 'portfolio-item';
                    div.addEventListener('click', () => openLightbox(index));

                    if (item.type === 'image') {
                        div.innerHTML = `<img src="${item.src}" loading="lazy">`;
                    } else if (item.type === 'video') {
                        div.innerHTML = `<video src="${item.src}#t=0.1" muted playsinline></video>
                                         <span class="item-type-icon material-symbols-outlined">play_circle</span>`;
                    } else if (item.type === '360') {
                        div.innerHTML = `<img src="${item.folder}frame_00.webp" loading="lazy">
                                         <span class="item-type-icon material-symbols-outlined">360</span>`;
                    }

                    grid.appendChild(div);
                });
            }
        });

        if (hasAnyItems) {
            container.appendChild(groupContainer);
        }
    }
}

function openLightbox(index) {
    const lightbox = document.getElementById('portfolio-lightbox');
    const contentArea = document.getElementById('lightbox-content-area');
    const caption = document.getElementById('lightbox-caption');
    if (!lightbox || !contentArea) return;

    if (currentLightboxCleanup) currentLightboxCleanup();

    currentLightboxIndex = index;
    const { serviceKey, item, groupTitle } = lightboxItems[index];
    const sName = serviceConfig[serviceKey]?.title || serviceKey;

    contentArea.innerHTML = '';
    caption.textContent = `${groupTitle.toUpperCase()} / ${sName.toUpperCase()}`;

    if (item.type === 'image') {
        currentLightboxCleanup = MediaEngine.initImage(item, contentArea);
    } else if (item.type === 'video') {
        currentLightboxCleanup = MediaEngine.initVideo(item, contentArea);
        const v = contentArea.querySelector('video');
        if (v) v.controls = true;
    } else if (item.type === '360') {
        currentLightboxCleanup = MediaEngine.init360(item, contentArea);
    }

    lightbox.classList.add('visible');
    document.querySelector('.lightbox-prev').style.display = index > 0 ? 'flex' : 'none';
    document.querySelector('.lightbox-next').style.display = index < lightboxItems.length - 1 ? 'flex' : 'none';
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
