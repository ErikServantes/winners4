// Importa as funções dos módulos
import { initializeSmoothScroll } from './modules/smooth-scroll.js?v=5.1';
import { initializeModal, openServiceModal } from './modules/modal.js?v=5.1';
import { initializePortfolio } from './modules/portfolio.js?v=5.1';
import { initializeGlobalParticles } from './modules/global-particles.js?v=5.1';
import { initializeGlassEffect } from './modules/glass-effect.js?v=5.1';
import { initializeHeroAnimation } from './modules/hero-animation.js?v=5.1';
import { serviceGroups } from './modules/services-config.js?v=5.1';

let inventory = null;

// Função principal de arranque V3.5 (Estável)
async function init() {
    console.log("🚀 A inicializar V3 com Arquitetura Estável...");
    gsap.registerPlugin(ScrollTrigger);

    try {
        const resp = await fetch('./assets/inventory.json?v=' + Date.now());
        if (!resp.ok) throw new Error('Inventário não encontrado.');
        inventory = await resp.json();
    } catch (e) {
        console.error("❌ Erro fatal no inventário:", e);
        inventory = { meta: { groupCovers: {}, services: {} } }; 
    }

    initializeSmoothScroll();
    applyDynamicCovers(inventory); 
    initializeModal(inventory);
    initializePortfolio(inventory);
    setupClickController(); 

    setTimeout(() => {
        window.particlesController = initializeGlobalParticles();
        initializeGlassEffect();
        initializeHeroAnimation();
        setupContentAnimations();
        setupParallaxEffects();
        ScrollTrigger.refresh();
        console.log("✅ Site pronto.");
    }, 150);

    setupNavigation();
}

/**
 * V3.6 - Lógica de Capas com Fallback Dinâmico (Corrigido)
 */
function applyDynamicCovers(data) {
    if (!data || !data.meta) return;

    const groupCovers = data.meta.groupCovers || {};
    const services = data.meta.services || {};
    
    document.querySelectorAll('section.fullscreen-section[id]').forEach(section => {
        const container = section.querySelector('.section-media');
        if (!container) return;

        const groupId = section.id;
        const groupInfo = serviceGroups[groupId];
        if (!groupInfo) return;

        let isTransitioning = false;
        let revertTimeout = null;
        
        let groupCoverData = groupCovers[groupId] || null;
        if (!groupCoverData) {
            const firstServiceKey = groupInfo.services[0];
            if (services[firstServiceKey] && services[firstServiceKey].cover) {
                groupCoverData = services[firstServiceKey].cover;
            }
        }

        if (groupCoverData) {
            container.innerHTML = '';
            const el = createMediaElement(groupCoverData);
            container.appendChild(el);
        } else {
            container.innerHTML = '<div class="technical-placeholder"><span>4WINNERS</span></div>';
        }

        let lastRequestedSrc = groupCoverData ? groupCoverData.src : '';

        const transitionTo = (mediaData, isReverting = false) => {
            if (isTransitioning || !mediaData || mediaData.src === lastRequestedSrc) return;
            
            isTransitioning = true; 
            lastRequestedSrc = mediaData.src;

            const newEl = createMediaElement(mediaData);
            newEl.style.position = 'absolute';
            newEl.style.top = '0';
            newEl.style.left = '0';
            newEl.style.opacity = '0';
            newEl.style.zIndex = '2';
            
            container.appendChild(newEl);

            const duration = isReverting ? 0.8 : 0.5;

            gsap.to(newEl, {
                opacity: 1,
                duration: duration,
                ease: "power2.inOut",
                onComplete: () => {
                    Array.from(container.children).forEach(child => {
                        if (child !== newEl) {
                            if (child.tagName === 'VIDEO') { child.pause(); child.src = ""; child.load(); }
                            child.remove();
                        }
                    });
                    newEl.style.position = 'relative';
                    newEl.style.zIndex = '1';
                    isTransitioning = false; 
                }
            });

            if (!isReverting) {
                gsap.fromTo(newEl, { scale: 1.05 }, { scale: 1, duration: 1, ease: "power2.out" });
            }
        };

        section.querySelectorAll('.service-list li').forEach(li => {
            const sKey = li.dataset.service;
            li.addEventListener('mouseenter', () => {
                if (revertTimeout) {
                    clearTimeout(revertTimeout);
                    revertTimeout = null;
                }

                const sData = services[sKey];
                // NOVO: Se o serviço não tem capa, força o regresso à capa de grupo
                if (sData && sData.cover) {
                    transitionTo(sData.cover);
                } else if (groupCoverData) {
                    transitionTo(groupCoverData, true);
                }
            });
        });

        const listContainer = section.querySelector('.service-list');
        if (listContainer) {
            listContainer.addEventListener('mouseleave', () => {
                if (groupCoverData) {
                    revertTimeout = setTimeout(() => {
                        transitionTo(groupCoverData, true);
                        revertTimeout = null;
                    }, 3000);
                }
            });
        }
    });
}

function createMediaElement(coverData) {
    const el = coverData.type === 'video' ? document.createElement('video') : document.createElement('img');
    el.src = coverData.src;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.objectFit = 'cover';
    if (coverData.type === 'video') {
        el.autoplay = true;
        el.loop = true;
        el.muted = true;
        el.playsInline = true;
    } else {
        el.loading = 'lazy';
    }
    return el;
}

function setupParallaxEffects() {
    gsap.utils.toArray('.layout-split').forEach(section => {
        const media = section.querySelector('.section-media');
        const content = section.querySelector('.glass-panel');
        if (media) gsap.to(media, { yPercent: -10, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
        if (content) gsap.to(content, { yPercent: 10, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
    });
}

function setupContentAnimations() {
    gsap.utils.toArray('section.fullscreen-section:not(#hero-4winners) .content > *').forEach(el => {
        gsap.set(el, { opacity: 0, y: 30 });
        gsap.to(el, {
            scrollTrigger: {
                trigger: el.closest('section'),
                start: 'top 75%',
                toggleActions: 'play reverse play reverse',
            },
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15
        });
    });
}

function setupClickController() {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-service]');
        if (trigger && trigger.id !== 'portfolio-btn') {
            e.preventDefault();
            const serviceKey = trigger.dataset.service;
            console.log(`✅ Abrindo modal para: '${serviceKey}'`);
            openServiceModal(serviceKey, trigger);
        }
    });
}

function setupNavigation() {
    const header = document.getElementById('main-header');
    if (header) {
        ScrollTrigger.create({
            trigger: '#hero-4winners',
            start: 'top -50px',
            onEnter: () => header.classList.add('header-scrolled'),
            onLeaveBack: () => header.classList.remove('header-scrolled')
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return; 
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement && window.lenis) {
                window.lenis.scrollTo(targetElement);
            }
        });
    });

    const navLinks = document.querySelectorAll('#side-nav ul li a');
    const sections = gsap.utils.toArray('section.fullscreen-section');

    sections.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onToggle: self => {
                if (self.isActive && navLinks[i]) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLinks[i].classList.add('active');
                }
            }
        });
    });
}

function setupParticleFading() {
    const bgParticles = document.getElementById('particles-bg');
    const fgParticles = document.getElementById('particles-fg');
    const controller = window.particlesController;
    if (!bgParticles || !fgParticles) return;

    ScrollTrigger.create({
        trigger: '#design', 
        start: 'top 70%',        
        endTrigger: '#contacto', 
        end: 'top 80%',          
        onEnter: () => { 
            bgParticles.classList.add('particles-hidden'); 
            fgParticles.classList.add('particles-hidden'); 
            if (controller) {
                clearTimeout(controller.timeoutId);
                controller.timeoutId = setTimeout(() => controller.pause(), 1000);
            }
        },
        onLeave: () => { 
            bgParticles.classList.remove('particles-hidden'); 
            fgParticles.classList.remove('particles-hidden'); 
            if (controller) {
                clearTimeout(controller.timeoutId);
                controller.resume();
            }
        },
        onEnterBack: () => { 
            bgParticles.classList.add('particles-hidden'); 
            fgParticles.classList.add('particles-hidden'); 
            if (controller) {
                clearTimeout(controller.timeoutId);
                controller.timeoutId = setTimeout(() => controller.pause(), 1000);
            }
        },
        onLeaveBack: () => { 
            bgParticles.classList.remove('particles-hidden'); 
            fgParticles.classList.remove('particles-hidden'); 
            if (controller) {
                clearTimeout(controller.timeoutId);
                controller.resume();
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

setTimeout(setupParticleFading, 500);
