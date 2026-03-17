import { serviceConfig } from './services-config.js';
import { MediaEngine } from './media-engine.js';

// Função utilitária para obter a semana do ano (1 a 52)
export function getWeekNumber() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Guarda o inventário carregado na memória
let mediaInventory = null;
let currentCleanup = null; // Guarda a função de limpeza do visualizador ativo

async function loadInventory() {
    if (mediaInventory) return mediaInventory;
    try {
        const response = await fetch('./assets/inventory.json?v=' + new Date().getTime());
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        mediaInventory = await response.json();
        return mediaInventory;
    } catch (error) {
        console.error('❌ Falha ao carregar o inventário.', error);
        mediaInventory = {};
        return mediaInventory;
    }
}

export async function initializeModal() {
    await loadInventory();
    const modal = document.getElementById('details-modal');
    if (!modal) return;

    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if (btn.tagName === 'A' && btn.dataset.service === 'contacto') e.preventDefault();
            
            const serviceKey = btn.dataset.service;
            const data = serviceConfig[serviceKey];
            if (!data) return;

            renderModalContent(modal, serviceKey, data);
            openModalUI(modal);
            
            if (serviceKey !== 'contacto') {
                loadDynamicMedia(serviceKey, data);
            }
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
}

function renderModalContent(modal, serviceKey, data) {
    let mediaHTML = serviceKey !== 'contacto' ? `
        <div class="modal-media-wrapper" id="dynamic-media-container">
            <div class="media-loader"><span class="material-symbols-outlined">hourglass_empty</span></div>
        </div>
    ` : '';

    let bodyHTML = '';
    if (serviceKey === 'contacto') {
        bodyHTML = `
            <div class="contact-modal-info">
                <div class="contact-item"><strong>Morada:</strong><a href="${data.address_link}" target="_blank">${data.address}</a></div>
                <div class="contact-item"><strong>Email:</strong><a href="mailto:${data.email}">${data.email}</a></div>
                <div class="contact-item"><strong>Telefone:</strong><a href="${data.phone_link}">${data.phone}</a></div>
                <div class="contact-item"><strong>Horário:</strong><div class="schedule">${data.schedule.map(line => `<span>${line}</span>`).join('')}</div></div>
            </div>
            <a href="${data.phone_link}" class="details-btn cta-btn">Ligar Agora</a>
        `;
    } else {
        const specsHTML = data.specs ? `
            <div class="tech-specs-container">
                <h3 class="section-subtitle">Especificações Técnicas</h3>
                <table class="tech-specs-table">
                    <tbody>
                        ${Object.entries(data.specs).map(([key, value]) => {
                            if (typeof value === 'object') {
                                return `<tr><td class="spec-label">${key}</td><td class="spec-value">${value.value}</td></tr>
                                        <tr><td colspan="2"><ul class="modal-materials">${value.materials.map(m => `<li>${m}</li>`).join('')}</ul></td></tr>`;
                            }
                            return `<tr><td class="spec-label">${key}</td><td class="spec-value">${value}</td></tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        ` : '';

        const materialsHTML = data.materials?.length ? `
            <div class="materials-container">
                <h3 class="section-subtitle">Materiais Suportados</h3>
                <ul class="modal-materials">${data.materials.map(m => `<li>${m}</li>`).join('')}</ul>
            </div>
        ` : '';
        bodyHTML = specsHTML + materialsHTML;
    }

    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <button class="modal-close">&times;</button>
        <div class="modal-layout-container" data-lenis-prevent>
            ${mediaHTML}
            <div class="modal-text-section ${mediaHTML ? 'split-width' : 'full-width'}">
                <h2 id="modal-title">${data.title}</h2>
                <div id="modal-body">${bodyHTML}</div>
            </div>
        </div>
    `;
    modalContent.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
}

function loadDynamicMedia(serviceKey, data) {
    const container = document.getElementById('dynamic-media-container');
    if (!container) return;

    const mediaList = mediaInventory[serviceKey] || [];
    const week = getWeekNumber();
    const selection = MediaEngine.smartSelect(mediaList, week);

    // Se não houver media no inventário, fallback para a capa 00.webp
    const finalMedia = selection || { type: 'image', src: `assets/${serviceKey}/00.webp` };

    if (currentCleanup) currentCleanup(); // Limpar anterior

    if (finalMedia.type === 'video360') {
        currentCleanup = MediaEngine.initVideo360(finalMedia, container);
    } else if (finalMedia.type === 'video') {
        // CORREÇÃO: Usar o src diretamente na tag video permite ao browser detetar o MIME type corretamente
        container.innerHTML = `<video src="${finalMedia.src}" autoplay loop muted playsinline class="modal-video"></video>`;
        currentCleanup = () => {
            const v = container.querySelector('video');
            if (v) { v.pause(); v.src = ""; v.load(); v.remove(); }
        };
    } else {
        container.innerHTML = `<img src="${finalMedia.src}" alt="${data.title}" class="modal-img">`;
        currentCleanup = null;
    }
}

function openModalUI(modal) {
    modal.classList.add('visible');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
}

function closeModal(modal) {
    modal.classList.remove('visible');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
    }
}
