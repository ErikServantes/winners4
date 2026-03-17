import { serviceConfig } from './services-config.js';
import { MediaEngine } from './media-engine.js';

let inventoryCache = null;
let currentLightboxCleanup = null;
let lightboxItems = [];
let currentLightboxIndex = 0;

export async function initializePortfolio() {
    const btn = document.getElementById('portfolio-btn');
    const modal = document.getElementById('portfolio-modal');
    if (!btn || !modal) return;

    const closeBtn = modal.querySelector('.portfolio-close');
    const gridContainer = document.getElementById('portfolio-grid');

    try {
        const response = await fetch('assets/inventory.json?v=' + Date.now());
        inventoryCache = await response.json();
    } catch (error) {
        console.error('❌ Erro Portefólio:', error);
        return;
    }

    btn.onclick = (e) => {
        e.preventDefault();
        openPortfolio(modal, gridContainer);
    };

    closeBtn.onclick = () => closePortfolio(modal);

    const lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) {
        lightbox.querySelector('.lightbox-close').onclick = closeLightbox;
        lightbox.querySelector('.lightbox-prev').onclick = () => {
            if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
        };
        lightbox.querySelector('.lightbox-next').onclick = () => {
            if (currentLightboxIndex < lightboxItems.length - 1) openLightbox(currentLightboxIndex + 1);
        };
        lightbox.onclick = (e) => { if (e.target === lightbox) closeLightbox(); };
        
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('visible')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
            if (e.key === 'ArrowRight' && currentLightboxIndex < lightboxItems.length - 1) openLightbox(currentLightboxIndex + 1);
        });
    }

    modal.onclick = (e) => { if (e.target === modal) closePortfolio(modal); };
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

    for (const serviceKey in inventoryCache) {
        const items = inventoryCache[serviceKey];
        if (items.length === 0) continue;

        const title = document.createElement('h3');
        title.className = 'portfolio-category-title';
        title.textContent = serviceConfig[serviceKey]?.title || serviceKey;
        container.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'portfolio-category-grid';
        container.appendChild(grid);

        items.forEach(item => {
            const index = globalIndex++;
            lightboxItems.push({ serviceKey, item });

            const div = document.createElement('div');
            div.className = 'portfolio-item';
            div.onclick = () => openLightbox(index);

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
}

function openLightbox(index) {
    const lightbox = document.getElementById('portfolio-lightbox');
    const contentArea = document.getElementById('lightbox-content-area');
    const caption = document.getElementById('lightbox-caption');
    if (!lightbox || !contentArea) return;

    if (currentLightboxCleanup) currentLightboxCleanup();

    currentLightboxIndex = index;
    const { serviceKey, item } = lightboxItems[index];
    const sName = serviceConfig[serviceKey]?.title || serviceKey;

    contentArea.innerHTML = '';
    caption.textContent = `${sName.toUpperCase()} // ${item.name || 'ITEM'}`;

    if (item.type === 'image') {
        currentLightboxCleanup = MediaEngine.initImage(item, contentArea);
    } else if (item.type === 'video') {
        currentLightboxCleanup = MediaEngine.initVideo(item, contentArea);
        contentArea.querySelector('video').controls = true;
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
