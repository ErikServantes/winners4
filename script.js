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
    console.log("🚀 A inicializar site dinâmico...");

    // Regista o plugin ScrollTrigger do GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 1. Tentar carregar Inventário
    try {
        const resp = await fetch('./assets/inventory.json?v=' + Date.now());
        if (resp.ok) {
            const data = await resp.json();
            inventory = data?.meta?.services || null;
            if (inventory) applyDynamicCovers();
        }
    } catch (e) {
        console.error("❌ Erro ao carregar inventário:", e);
    }

    // Inicializa o Smooth Scroll
    initializeSmoothScroll();

    // Pequeno delay para garantir que o Lenis calculou a altura da página
    setTimeout(() => {
        initializeScrollytelling();
        initializeModal();
        initializePortfolio();
        initializeGlobalParticles();
        initializeGlassEffect();
        initializeHeroAnimation();
        
        // CRÍTICO: Garantir que as animações arrancam
        setupContentAnimations();

        // Forçar recalculo das posições de scroll
        ScrollTrigger.refresh();
        console.log("Site pronto.");
    }, 200);

    // --- Navegação Inteligente (Header e Side Nav) ---
    setupNavigation();
}

/**
 * FASE 1: Injeta as capas (00) dinamicamente baseadas no inventory.json
 */
function applyDynamicCovers() {
    if (!inventory) return;

    const mediaContainers = document.querySelectorAll('.section-media[data-service-folder]');
    
    mediaContainers.forEach(container => {
        const folder = container.dataset.serviceFolder;
        const serviceData = inventory[folder];

        if (serviceData && serviceData.cover) {
            container.innerHTML = ''; 
            container.classList.remove('media-empty');
            
            if (serviceData.cover.type === 'video') {
                const video = document.createElement('video');
                video.src = serviceData.cover.src;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                container.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = serviceData.cover.src;
                img.loading = 'lazy';
                img.alt = folder;
                container.appendChild(img);
            }
        } else {
            // Fallback se não houver capa na pasta do serviço
            container.classList.add('media-empty');
            container.innerHTML = '<div class="technical-placeholder"><span>4WINNERS</span></div>';
        }
    });
}

/**
 * Restaura as animações de entrada dos painéis de serviço
 */
function setupContentAnimations() {
    const serviceSections = gsap.utils.toArray('section.fullscreen-section').filter(section => 
        section.id !== 'hero-4winners' && section.id !== 'background-layers'
    );
    
    serviceSections.forEach((section) => {
        const content = section.querySelector('.content');
        if (!content) return;

        const title = content.querySelector('h1');
        const text = content.querySelector('p');
        const button = content.querySelector('.details-btn');
        
        const elementsToAnimate = [title, text, button].filter(Boolean);

        if (elementsToAnimate.length > 0) {
            gsap.set(elementsToAnimate, { opacity: 0, y: 30 });

            gsap.to(elementsToAnimate, {
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
        trigger: '#corte-laser', 
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

// Inicia quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Inicia partículas com delay para performance
setTimeout(setupParticleFading, 500);
