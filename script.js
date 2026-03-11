// Importa as funções dos módulos que criámos
import { initializeSmoothScroll } from './modules/smooth-scroll.js';
import { initializeScrollytelling } from './modules/scrollytelling.js';
import { initializeModal } from './modules/modal.js';
import { initializeLaserAnimation } from './modules/laser-animation.js';
import { initializeGlassEffect } from './modules/glass-effect.js';
import { initializeHeroAnimation } from './modules/hero-animation.js';

// Espera que o DOM esteja completamente carregado para executar o código
document.addEventListener('DOMContentLoaded', function() {
    // Regista o plugin ScrollTrigger do GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Inicializa o Smooth Scroll (Lenis) e garante sincronização com GSAP
    initializeSmoothScroll();

    // Quando usamos "Absolute Scroll", é prudente forçar o ScrollTrigger a recalcular as suas
    // âncoras (start/end) após o Lenis e o DOM estabilizarem, especialmente em refreshes a meio da página.
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    // Inicializa os restantes módulos
    initializeScrollytelling();
    initializeModal();
    initializeLaserAnimation();
    initializeGlassEffect();
    initializeHeroAnimation();

    // --- Navegação Inteligente (Header e Side Nav) ---
    
    // 1. Scroll Suave para Links Internos
    // O Lenis trata do scroll, mas precisamos de intercetar os cliques
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Usa o motor Lenis (que está disponível globalmente através do módulo smooth-scroll)
                // para fazer o scroll suave até ao destino
                window.lenis?.scrollTo(targetElement);
            }
        });
    });

    // 2. Indicador Ativo na Side Nav
    const dots = document.querySelectorAll('#side-nav .dot');
    const sections = gsap.utils.toArray('.fullscreen-section');

    sections.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onToggle: self => {
                if (self.isActive) {
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[i].classList.add('active');
                }
            }
        });
    });

    // --- Animações Genéricas de Conteúdo ---
    const allSections = gsap.utils.toArray('.fullscreen-section');
    // Filtra usando o novo ID correto que começa com uma letra
    const serviceSections = allSections.filter(section => section.id !== 'hero-4winners');
    
    serviceSections.forEach((section) => {
        const textElements = gsap.utils.toArray(section.querySelectorAll('.content h1, .content p'));
        const buttonElement = section.querySelector('.content .details-btn');

        const commonScrollTrigger = {
            trigger: section,
            start: 'top 70%',
            // Mesmo para animações simples, é mais seguro atrelar aos estados do viewport
            // em vez de "play once" para garantir coerência se o user fizer refresh num scroll profundo.
            toggleActions: 'play reverse play reverse',
        };

        // NOTA: Para animações simples (fade-in), .to() com estados iniciais no CSS é aceitável,
        // mas as animações complexas ("Scrollytelling") DEVEM usar o paradigma Absolute Scroll (.fromTo + scrub)
        if (textElements.length > 0) {
            // Estado inicial garantido antes de animar (previne flashes em refreshes a meio da página)
            gsap.set(textElements, { opacity: 0, y: 30 });
            
            gsap.to(textElements, {
                scrollTrigger: commonScrollTrigger,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2,
            });
        }

        if (buttonElement) {
            gsap.set(buttonElement, { opacity: 0, y: 30 });

            gsap.to(buttonElement, {
                scrollTrigger: commonScrollTrigger,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.4,
            });
        }
    });

    console.log("Navigation & Absolute Scroll Sync fully operational.");
});