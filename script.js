// Importa as funções dos módulos que criámos
import { initializeSmoothScroll } from './modules/smooth-scroll.js';
import { initializeScrollytelling } from './modules/scrollytelling.js';
import { initializeModal } from './modules/modal.js';
import { initializePortfolio } from './modules/portfolio.js';
import { initializeGlobalParticles } from './modules/global-particles.js';
import { initializeGlassEffect } from './modules/glass-effect.js';
import { initializeHeroAnimation } from './modules/hero-animation.js';

let inventory = null;

// Função principal de arranque
async function init() {
    console.log("🚀 A inicializar site dinâmico V3...");
    gsap.registerPlugin(ScrollTrigger);

    try {
        const resp = await fetch('./assets/inventory.json?v=' + Date.now());
        if (resp.ok) {
            inventory = await resp.json();
            applyDynamicCovers(inventory);
        }
    } catch (e) {
        console.error("❌ Erro ao carregar inventário:", e);
    }

    initializeSmoothScroll();

    setTimeout(() => {
        initializeScrollytelling();
        initializeModal();
        initializePortfolio();
        initializeGlobalParticles();
        initializeGlassEffect();
        initializeHeroAnimation();
        
        setupContentAnimations();
        setupParallaxEffects(); // Efeito parallax restaurado

        ScrollTrigger.refresh();
        console.log("Site pronto.");
    }, 200);

    setupNavigation();
}

/**
 * V3.1 - Gestão de Mouseover com sistema de "Lock" para evitar conflitos de animação
 */
function applyDynamicCovers(data) {
    if (!data || !data.meta) return;

    const groupCovers = data.meta.groupCovers || {};
    const services = data.meta.services || {};
    const sections = document.querySelectorAll('section.fullscreen-section[id]');
    
    sections.forEach(section => {
        let isTransitioning = false;
        let revertTimeout = null;

        const container = section.querySelector('.section-media');
        if (!container) return;

        const groupId = section.id;
        let groupCoverData = groupCovers[groupId] || null;

        if (!groupCoverData) {
            const firstLi = section.querySelector('.service-list li');
            if (firstLi) {
                const sKey = firstLi.dataset.service;
                if (services[sKey] && services[sKey].cover) {
                    groupCoverData = services[sKey].cover;
                }
            }
        }

        if (groupCoverData) {
            container.innerHTML = '';
            container.classList.remove('media-empty');
            const el = createMediaElement(groupCoverData);
            el.classList.add('active-media');
            container.appendChild(el);
        } else {
            container.classList.add('media-empty');
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
            newEl.classList.add('active-media');
            
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
                    newEl.style.zIndex = '1';
                    newEl.style.position = 'relative';
                    isTransitioning = false; 
                }
            });

            if (!isReverting) {
                gsap.fromTo(newEl, { scale: 1.05 }, { scale: 1, duration: 1, ease: "power2.out" });
            }
        };

        const listItems = section.querySelectorAll('.service-list li');
        listItems.forEach(li => {
            const sKey = li.dataset.service;
            
            li.addEventListener('mouseenter', () => {
                clearTimeout(revertTimeout);
                revertTimeout = null;
                const sData = services[sKey];
                if (sData && sData.cover) transitionTo(sData.cover);
            });
        });

        const listContainer = section.querySelector('.service-list');
        if (listContainer) {
            listContainer.addEventListener('mouseleave', () => {
                if (groupCoverData) {
                    revertTimeout = setTimeout(() => {
                        transitionTo(groupCoverData, true);
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

/**
 * EFEITO PARALLAX: Move o vidro e a imagem a velocidades diferentes no scroll
 */
function setupParallaxEffects() {
    gsap.utils.toArray('.layout-split').forEach(section => {
        const media = section.querySelector('.section-media');
        const content = section.querySelector('.glass-panel');

        if (media) {
            gsap.to(media, {
                yPercent: -10, // Movimento subtil para cima
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
        if (content) {
            gsap.to(content, {
                yPercent: 10, // Movimento subtil para baixo
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });
}

function setupContentAnimations() {
    const serviceSections = gsap.utils.toArray('section.fullscreen-section:not(#hero-4winners)');
    
    serviceSections.forEach((section) => {
        const elements = section.querySelectorAll('.content > *');
        if (elements.length > 0) {
            gsap.set(elements, { opacity: 0, y: 30 });
            gsap.to(elements, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play reverse play reverse',
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.15
            });
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

// Ocultação Inteligente de Partículas
function setupParticleFading() {
    const bgParticles = document.getElementById('particles-bg');
    const fgParticles = document.getElementById('particles-fg');
    if (!bgParticles || !fgParticles) return;

    ScrollTrigger.create({
        trigger: '#design', 
        start: 'top 70%',        
        endTrigger: '#contacto', 
        end: 'top 80%',          
        onEnter: () => {
            bgParticles.classList.add('particles-hidden');
            fgParticles.classList.add('particles-hidden');
        },
        onLeave: () => {
            bgParticles.classList.remove('particles-hidden');
            fgParticles.classList.remove('particles-hidden');
        },
        onEnterBack: () => {
            bgParticles.classList.add('particles-hidden');
            fgParticles.classList.add('particles-hidden');
        },
        onLeaveBack: () => {
            bgParticles.classList.remove('particles-hidden');
            fgParticles.classList.remove('particles-hidden');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

setTimeout(setupParticleFading, 500);
