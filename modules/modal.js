import { serviceConfig, serviceGroups } from './services-config.js';
import { MediaEngine } from './media-engine.js';

let inventory = null;
let currentCleanup = null;
let isModalOpen = false;

async function loadInventory() {
    if (inventory) return inventory;
    try {
        const response = await fetch('./assets/inventory.json?v=' + Date.now());
        if (!response.ok) throw new Error("Erro HTTP: " + response.status);
        const data = await response.json();
        inventory = data?.meta || {};
        return inventory;
    } catch (error) {
        console.error('❌ Erro inventário Modal:', error);
        inventory = { services: {}, groupCovers: {} };
        return inventory;
    }
}

export function getWeekNumber() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export async function initializeModal() {
    await loadInventory();
    const modal = document.getElementById('details-modal');
    if (!modal) return;

    document.addEventListener('click', async (e) => {
        const trigger = e.target.closest('[data-service]');
        if (!trigger || trigger.id === 'portfolio-btn' || isModalOpen) return;

        e.preventDefault();
        const serviceKey = trigger.dataset.service;
        const data = serviceConfig[serviceKey];
        if (!data) return;

        renderModal(modal, serviceKey, data);
        openModalUI(modal, serviceKey);
        
        if (serviceKey !== 'contacto') {
            loadMedia(trigger);
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.modal-close')) {
            history.back(); 
        }
    });

    window.addEventListener('popstate', () => {
        if (isModalOpen) {
            closeModal(modal);
        }
    });
}

function renderModal(modal, key, data) {
    let mediaHTML = key !== 'contacto' ? `<div class="modal-media-wrapper" id="dynamic-media-container"><div class="media-loader"><span class="material-symbols-outlined">hourglass_empty</span></div></div>` : '';
    let contentHTML = '';

    if (key === 'contacto') {
        contentHTML = `
            <div class="contact-modal-info">
                <div class="contact-item"><strong>Morada:</strong><a href="${data.address_link}" target="_blank">${data.address}</a></div>
                <div class="contact-item"><strong>Email:</strong><a href="mailto:${data.email}">${data.email}</a></div>
                <div class="contact-item"><strong>Telefone:</strong><a href="${data.phone_link}">${data.phone}</a></div>
                <div class="contact-item"><strong>Horário:</strong><div class="schedule">${data.schedule.map(line => `<span>${line}</span>`).join('')}</div></div>
            </div>
            <a href="${data.phone_link}" class="details-btn cta-btn">Ligar Agora</a>`;
    } else {
        // 1. Descrição Livre (Sem tabela, texto limpo)
        const desc = data.description ? `<p style="font-size:1rem; line-height:1.6; color:rgba(255,255,255,0.8); margin-bottom:25px;">${data.description}</p>` : '';

        // 2. Especificações Técnicas (Tabela rígida)
        const specs = data.specs ? `
            <div class="tech-specs-container">
                <h3 class="section-subtitle">Especificações Técnicas</h3>
                <table class="tech-specs-table">
                    <tbody>
                        ${Object.entries(data.specs).map(([k, v]) => {
                            if (typeof v === 'object' && v.value) { 
                                return `<tr><td class="spec-label">${k}</td><td class="spec-value">${v.value}</td></tr>
                                        <tr><td colspan="2"><ul class="modal-materials">${v.materials.map(m => `<li>${m}</li>`).join('')}</ul></td></tr>`;
                            }
                            return `<tr><td class="spec-label">${k}</td><td class="spec-value">${v}</td></tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>` : '';

        // 3. Materiais Suportados (Com título)
        const mats = data.materials?.length ? `
            <div class="materials-container">
                <h3 class="section-subtitle">Materiais Suportados</h3>
                <ul class="modal-materials">${data.materials.map(m => `<li>${m}</li>`).join('')}</ul>
            </div>` : '';
            
        // 4. Tags Livres (Apenas as caixinhas, sem título "Materiais", ideal para serviços)
        const tags = data.tags?.length ? `
            <ul class="modal-materials" style="margin-top: 10px;">
                ${data.tags.map(t => `<li>${t}</li>`).join('')}
            </ul>` : '';

        contentHTML = desc + specs + mats + tags;
    }

    modal.querySelector('.modal-content').innerHTML = `
        <button class="modal-close">&times;</button>
        <div class="modal-layout-container" data-lenis-prevent>
            ${mediaHTML}
            <div class="modal-text-section ${mediaHTML ? 'split-width' : 'full-width'}">
                <h2 id="modal-title">${data.title}</h2>
                <div id="modal-body">${contentHTML}</div>
            </div>
        </div>`;
}

function loadMedia(trigger) {
    const container = document.getElementById('dynamic-media-container');
    if (!container) return;

    const serviceKey = trigger.dataset.service;
    const serviceData = inventory.services[serviceKey];
    
    const list = serviceData?.items || [];
    let finalMedia = list.length > 0 ? list[0] : null; 

    if (!finalMedia && serviceData?.cover) {
        finalMedia = serviceData.cover;
    }

    if (!finalMedia) {
        const groupSection = trigger.closest('section.fullscreen-section[id]');
        if (groupSection) {
            const groupId = groupSection.id;
            finalMedia = inventory.groupCovers[groupId] || null;
        }
    }

    if (currentCleanup) currentCleanup();

    if (finalMedia) {
        container.innerHTML = '';
        if (finalMedia.type === '360') currentCleanup = MediaEngine.init360(finalMedia, container);
        else if (finalMedia.type === 'video') currentCleanup = MediaEngine.initVideo(finalMedia, container);
        else currentCleanup = MediaEngine.initImage(finalMedia, container);
    } else {
        container.innerHTML = '<div class="technical-placeholder"><span>4WINNERS</span></div>';
    }
}

function openModalUI(modal, serviceKey) {
    modal.classList.add('visible');
    document.documentElement.classList.add('modal-open');
    if (window.lenis) window.lenis.stop();
    isModalOpen = true;
    history.pushState({ service: serviceKey }, `Serviço: ${serviceKey}`, `#${serviceKey}`);
}

function closeModal(modal) {
    if (!isModalOpen) return;
    
    modal.classList.remove('visible');
    document.documentElement.classList.remove('modal-open');
    if (window.lenis) window.lenis.start();
    
    if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
    }
    isModalOpen = false;
    
    if(location.hash) {
        history.pushState(null, '', window.location.pathname + window.location.search);
    }
}
