import { serviceConfig, serviceGroups } from './services-config.js';
import { MediaEngine } from './media-engine.js';
import { ContactEngine } from './contact-engine.js';

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
    if (serviceKey !== 'contacto') loadMedia(serviceKey, triggerElement);
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
        const email = ContactEngine.getEmail();
        const mailHref = ContactEngine.getMailHref();
        const p1 = ContactEngine.getPhone1();
        const p1Label = ContactEngine.formatPhone(p1);
        const p1Href = ContactEngine.getPhoneHref();
        const p2 = ContactEngine.getPhone2();
        const p2Label = ContactEngine.formatPhone(p2);
        const waHref = ContactEngine.getWhatsAppHref();

        contentHTML = `
            <div class="contact-modal-info">
                <div class="contact-item"><strong>Morada:</strong><a href="${data.address_link}" target="_blank">${data.address}</a></div>
                <div class="contact-item"><strong>Email:</strong><a href="${mailHref}">${email}</a></div>
                <div class="contact-item"><strong>Telefone:</strong><a href="${p1Href}">${p1Label}</a></div>
                <div class="contact-item"><strong>WhatsApp:</strong><a href="${waHref}" target="_blank">${p2Label}</a></div>
                <div class="contact-item"><strong>Horário:</strong><div class="schedule">${data.schedule.map(line => `<span>${line}</span>`).join('')}</div></div>
            </div>
            <div class="contact-actions-container">
                <a href="${p1Href}" class="contact-action-btn phone-modal-btn">
                    <span class="material-symbols-outlined">call</span>
                    Ligar Agora
                </a>
                <a href="${waHref}" target="_blank" class="contact-action-btn wa-modal-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.46-1.761-1.633-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    WhatsApp Direto
                </a>
            </div>`;
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

/**
 * loadMedia V3.5 - Fallback Agressivo
 */
function loadMedia(serviceKey, trigger) {
    const container = document.getElementById('dynamic-media-container');
    if (!container || !inventory) return;

    const services = inventory.services || {};
    const serviceData = services[serviceKey];
    
    // 1. Tentar Media Direta (Portefólio ou Capa 00)
    let finalMedia = (serviceData?.items?.length > 0) ? serviceData.items[0] : serviceData?.cover;
    
    // 2. Fallback: Capa do Grupo (Seja central ou o primeiro vizinho)
    if (!finalMedia) {
        const section = trigger.closest('section');
        const groupId = section ? section.id : null;
        
        if (groupId) {
            // Tenta capa central (servicos/01...)
            finalMedia = inventory.groupCovers?.[groupId];
            
            // Tenta o primeiro serviço desse grupo que tenha capa
            if (!finalMedia && serviceGroups[groupId]) {
                for (const sKey of serviceGroups[groupId].services) {
                    if (services[sKey]?.cover) {
                        finalMedia = services[sKey].cover;
                        break;
                    }
                }
            }
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
