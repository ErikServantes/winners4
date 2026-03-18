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

    // Regista o plugin ScrollTrigger do GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 1. Tentar carregar Inventário
    try {
        const resp = await fetch('./assets/inventory.json?v=' + Date.now());
        if (resp.ok) {
            const data = await resp.json();
            inventory = data; 
            applyDynamicCovers(data);
        }
    } catch (e) {
        console.error("❌ Erro ao carregar inventário para capas:", e);
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
        
        setupContentAnimations();

        // Forçar recalculo das posições de scroll
        ScrollTrigger.refresh();
        console.log("Site pronto.");
    }, 200);

    // --- Navegação Inteligente (Header e Side Nav) ---
    setupNavigation();
}

/**
 * FASE 3: Gere o Efeito Mouseover V3 com Memória de 3 segundos e Cross-Fade
 */
function applyDynamicCovers(data) {
    if (!data || !data.meta) return;

    const groupCovers = data.meta.groupCovers || {};
    const services = data.meta.services || {};
    const sections = document.querySelectorAll('section.fullscreen-section[id]');
    
    sections.forEach(section => {
        const container = section.querySelector('.section-media');
        if (!container) return;

        const groupId = section.id;
        let groupCoverData = groupCovers[groupId] || null;

        // Fallback inicial do Grupo
        if (!groupCoverData) {
            const firstLi = section.querySelector('.service-list li');
            if (firstLi) {
                const sKey = firstLi.dataset.service;
                if (services[sKey] && services[sKey].cover) {
                    groupCoverData = services[sKey].cover;
                }
            }
        }

        // Estado inicial sem animação
        if (groupCoverData) {
            container.innerHTML = '';
            container.classList.remove('media-empty');
            const el = createMediaElement(groupCoverData);
            el.classList.add('active-media');
            el.style.width = '100%';
            el.style.height = '100%';
            el.style.objectFit = 'cover';
            container.appendChild(el);
        } else {
            container.classList.add('media-empty');
            container.innerHTML = '<div class="technical-placeholder"><span>4WINNERS</span></div>';
        }

        let lastRequestedSrc = groupCoverData ? groupCoverData.src : '';
        let revertTimeout = null; // Temporizador para cada secção

        const transitionTo = (mediaData, isReverting = false) => {
            if (!mediaData || mediaData.src === lastRequestedSrc) return;
            
            lastRequestedSrc = mediaData.src;

            const newEl = createMediaElement(mediaData);
            newEl.style.position = 'absolute';
            newEl.style.top = '0';
            newEl.style.left = '0';
            newEl.style.width = '100%';
            newEl.style.height = '100%';
            newEl.style.opacity = '0';
            newEl.style.zIndex = '2';
            newEl.classList.add('active-media');
            newEl.style.objectFit = 'cover';
            
            container.appendChild(newEl);

            // Se for troca entre serviços, a transição é rápida (0.5s)
            // Se for o regresso à capa padrão, podemos ser um pouco mais lentos (0.8s)
            const duration = isReverting ? 0.8 : 0.5;

            gsap.to(newEl, {
                opacity: 1,
                duration: duration,
                ease: "power2.inOut",
                onComplete: () => {
                    // Limpar media antiga com segurança
                    Array.from(container.children).forEach(child => {
                        if (child !== newEl) {
                            if (child.tagName === 'VIDEO') {
                                child.pause();
                                child.src = "";
                                child.load();
                            }
                            child.remove();
                        }
                    });
                    newEl.style.zIndex = '1';
                }
            });

            // Efeito de zoom-out subtil apenas na entrada de serviços
            if (!isReverting) {
                gsap.fromTo(newEl, { scale: 1.05 }, { scale: 1, duration: 1, ease: "power2.out" });
            }
        };

        // 1. Mouseover nos serviços
        section.querySelectorAll('.service-list li').forEach(li => {
            const sKey = li.dataset.service;
            
            li.addEventListener('mouseenter', () => {
                // Cancelar qualquer ordem de regresso à capa padrão
                if (revertTimeout) {
                    clearTimeout(revertTimeout);
                    revertTimeout = null;
                }

                const sData = services[sKey];
                if (sData && sData.cover) {
                    transitionTo(sData.cover);
                }
            });
        });

        // 2. Lógica de saída: Manter por 3 segundos antes de voltar ao padrão do grupo
        const listContainer = section.querySelector('.service-list');
        if (listContainer) {
            listContainer.addEventListener('mouseleave', () => {
                if (groupCoverData) {
                    // Agendar o regresso
                    revertTimeout = setTimeout(() => {
                        transitionTo(groupCoverData, true);
                        revertTimeout = null;
                    }, 3000); // 3 SEGUNDOS DE MEMÓRIA
                }
            });
        }
    });
}

/**
 * Cria o elemento de media (Img ou Video) baseado nos dados do inventário
 */
function createMediaElement(coverData) {
    if (coverData.type === 'video') {
        const video = document.createElement('video');
        video.src = coverData.src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        return video;
    } else {
        const img = document.createElement('img');
        img.src = coverData.src;
        img.loading = 'lazy';
        return img;
    }
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
        const list = content.querySelector('.service-list');
        const button = content.querySelector('.details-btn');
        
        const elementsToAnimate = [title, text, list, button].filter(Boolean);

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

// Inicia quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Inicia partículas com delay para performance
setTimeout(setupParticleFading, 500);
