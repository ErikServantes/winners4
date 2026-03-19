import { serviceConfig, serviceGroups } from './services-config.js';
import { MediaEngine } from './media-engine.js';

let inventory = null;
let currentCleanup = null;
let isModalOpen = false;

export function initializeModal(fullInventory) {
    if (!fullInventory) return;
    inventory = fullInventory.meta || { services: {}, groupCovers: {} };
    const modal = document.getElementById('details-modal');
    if (!modal) return;
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.modal-close')) history.back();
    });
    window.addEventListener('popstate', () => {
        if (isModalOpen) closeModal(modal);
    });
}

export function openServiceModal(serviceKey, triggerElement) {
    if (isModalOpen) return;
    const data = serviceConfig[serviceKey];
    if (!data) return;
    const modal = document.getElementById('details-modal');
    renderModal(modal, serviceKey, data);
    openModalUI(modal, serviceKey);
    if (serviceKey !== 'contacto') loadMedia(triggerElement);
}

function renderModal(modal, key, data) {
    const hasMedia = key !== 'contacto';
    
    let mediaHTML = hasMedia ? `
        <div class="modal-media-section">
            <div id="dynamic-media-container" class="modal-media-wrapper">
                <div class="media-loader"><span class="material-symbols-outlined">hourglass_empty</span></div>
            </div>
        </div>` : '';

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
        const desc = data.description ? `<p style="font-size:1rem; line-height:1.6; color:rgba(255,255,255,0.8); margin-bottom:25px;">${data.description}</p>` : '';
        const specs = data.specs ? `
            <div class="tech-specs-container">
                <h3 class="section-subtitle">Especificações Técnicas</h3>
                <table class="tech-specs-table">
                    <tbody>
                        ${Object.entries(data.specs).map(([k, v]) => `<tr><td class="spec-label">${k}</td><td class="spec-value">${v}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>` : '';
        const tags = data.tags?.length ? `<ul class="modal-materials" style="margin-top: 10px;">${data.tags.map(t => `<li>${t}</li>`).join('')}</ul>` : '';
        contentHTML = desc + specs + tags;
    }

    modal.querySelector('.modal-content').innerHTML = `
        <button class="modal-close">&times;</button>
        <div class="modal-layout-container ${hasMedia ? 'with-media' : 'no-media'}" data-lenis-prevent>
            ${mediaHTML}
            <div class="modal-text-section">
                <h2 id="modal-title">${data.title}</h2>
                <div id="modal-body">${contentHTML}</div>
            </div>
        </div>`;
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
}

function loadMedia(trigger) {
    const container = document.getElementById('dynamic-media-container');
    if (!container) return;
    const serviceKey = trigger.dataset.service;
    const services = inventory.services || {};
    const serviceData = services[serviceKey];
    
    let finalMedia = (serviceData?.items?.length > 0) ? serviceData.items[0] : serviceData?.cover;
    
    if (!finalMedia) {
        const groupSection = trigger.closest('section.fullscreen-section[id]');
        if (groupSection) {
            const groupId = groupSection.id;
            finalMedia = inventory.groupCovers?.[groupId];
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
    history.pushState({ service: serviceKey }, "", `#${serviceKey}`);
}

function closeModal(modal) {
    if (!isModalOpen) return;
    modal.classList.remove('visible');
    document.documentElement.classList.remove('modal-open');
    if (window.lenis) window.lenis.start();
    if (currentCleanup) { currentCleanup(); currentCleanup = null; }
    isModalOpen = false;
    if(location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
}
