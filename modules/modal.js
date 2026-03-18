import { serviceConfig } from './services-config.js';
import { MediaEngine } from './media-engine.js';

let mediaInventory = null;
let currentCleanup = null;

async function loadInventory() {
    if (mediaInventory) return mediaInventory;
    try {
        const response = await fetch('./assets/inventory.json?v=' + Date.now());
        if (!response.ok) throw new Error("Erro HTTP: " + response.status);
        const data = await response.json();
        mediaInventory = data?.meta?.services || {};
        return mediaInventory;
    } catch (error) {
        console.error('❌ Erro inventário Modal:', error);
        mediaInventory = {};
        return mediaInventory;
    }
}

export function getWeekNumber() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export async function initializeModal() {
    await loadInventory();
    const modal = document.getElementById('details-modal');
    if (!modal) {
        console.error("❌ Modal container não encontrado no DOM!");
        return;
    }

    console.log("✅ Sistema de Modais V3 ativo. A escutar cliques...");

    document.addEventListener('click', async (e) => {
        // Encontra o elemento com data-service (pode ser o li ou o a/button)
        const trigger = e.target.closest('[data-service]');
        
        if (!trigger) return; // Não é um gatilho de serviço
        
        // Exceção para o Portefólio (ele tem a sua própria lógica noutro lado)
        if (trigger.id === 'portfolio-btn') return;

        const serviceKey = trigger.dataset.service;
        console.log(`🖱️ Clique detetado para o serviço: ${serviceKey}`);
        
        if (trigger.tagName === 'A' && serviceKey === 'contacto') e.preventDefault();

        const data = serviceConfig[serviceKey];
        if (!data) {
            console.error(`❌ Configuração em falta no services-config.js para a chave: '${serviceKey}'`);
            return;
        }

        renderModal(modal, serviceKey, data);
        openModalUI(modal);
        
        if (serviceKey !== 'contacto') {
            loadMedia(serviceKey);
        }
    });

    modal.addEventListener('click', (e) => {
        // Clicar fora ou no botão fechar
        if (e.target === modal || e.target.closest('.modal-close')) {
            closeModal(modal);
        }
    });
}

function renderModal(modal, key, data) {
    let mediaHTML = key !== 'contacto' ? `
        <div class="modal-media-wrapper" id="dynamic-media-container">
            <div class="media-loader"><span class="material-symbols-outlined">hourglass_empty</span></div>
        </div>
    ` : '';

    let contentHTML = '';
    if (key === 'contacto') {
        contentHTML = `
            <div class="contact-modal-info">
                <div class="contact-item"><strong>Morada:</strong><a href="${data.address_link}" target="_blank">${data.address}</a></div>
                <div class="contact-item"><strong>Email:</strong><a href="mailto:${data.email}">${data.email}</a></div>
                <div class="contact-item"><strong>Telefone:</strong><a href="${data.phone_link}">${data.phone}</a></div>
                <div class="contact-item"><strong>Horário:</strong><div class="schedule">${data.schedule.map(line => `<span>${line}</span>`).join('')}</div></div>
            </div>
            <a href="${data.phone_link}" class="details-btn cta-btn">Ligar Agora</a>
        `;
    } else {
        const specs = data.specs ? `
            <div class="tech-specs-container">
                <h3 class="section-subtitle">Especificações Técnicas</h3>
                <table class="tech-specs-table">
                    <tbody>
                        ${Object.entries(data.specs).map(([k, v]) => {
                            if (typeof v === 'object') {
                                return `<tr><td class="spec-label">${k}</td><td class="spec-value">${v.value}</td></tr>
                                        <tr><td colspan="2"><ul class="modal-materials">${v.materials.map(m => `<li>${m}</li>`).join('')}</ul></td></tr>`;
                            }
                            return `<tr><td class="spec-label">${k}</td><td class="spec-value">${v}</td></tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        ` : '';

        const mats = data.materials?.length ? `
            <div class="materials-container">
                <h3 class="section-subtitle">Materiais Suportados</h3>
                <ul class="modal-materials">${data.materials.map(m => `<li>${m}</li>`).join('')}</ul>
            </div>
        ` : '';
        contentHTML = specs + mats;
    }

    modal.querySelector('.modal-content').innerHTML = `
        <button class="modal-close">&times;</button>
        <div class="modal-layout-container" data-lenis-prevent>
            ${mediaHTML}
            <div class="modal-text-section ${mediaHTML ? 'split-width' : 'full-width'}">
                <h2 id="modal-title">${data.title}</h2>
                <div id="modal-body">${contentHTML}</div>
            </div>
        </div>
    `;
    
    // Recolar evento fechar depois de reconstruir o innerHTML
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
}

function loadMedia(key) {
    const container = document.getElementById('dynamic-media-container');
    if (!container) return;

    const sData = mediaInventory[key];
    const list = sData ? sData.items : [];
    const week = getWeekNumber();
    
    const NOW = Date.now();
    const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
    const recent = list.filter(item => (NOW - item.timestamp) < TWO_WEEKS);
    
    const selected = recent.length > 0 ? recent[0] : (list.length > 0 ? list[(week - 1) % list.length] : null);
    
    const fallback = sData?.cover || { type: 'image', src: `assets/${key}/00.webp` };
    const finalMedia = selected || fallback;

    if (currentCleanup) currentCleanup();

    if (finalMedia.type === '360') {
        currentCleanup = MediaEngine.init360(finalMedia, container);
    } else if (finalMedia.type === 'video') {
        currentCleanup = MediaEngine.initVideo(finalMedia, container);
    } else {
        currentCleanup = MediaEngine.initImage(finalMedia, container);
    }
}

function openModalUI(modal) {
    modal.classList.add('visible');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    if (window.lenis) window.lenis.stop();
}

function closeModal(modal) {
    modal.classList.remove('visible');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    if (window.lenis) window.lenis.start();
    if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
    }
}
