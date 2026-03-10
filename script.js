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

    // Inicializa o Smooth Scroll primeiro!
    initializeSmoothScroll();

    // Inicializa os restantes módulos
    initializeScrollytelling();
    initializeModal();
    initializeLaserAnimation();
    initializeGlassEffect();
    initializeHeroAnimation();

    // --- Animações Genéricas de Conteúdo (Versão Exclusiva para Serviços) ---
    // Encontra TODAS as secções primeiro
    const allSections = gsap.utils.toArray('.fullscreen-section');
    
    // Filtra para remover a secção inicial (ID: 4winners) usando JS puro, 
    // evitando erros de seletores CSS com IDs que começam por números.
    const serviceSections = allSections.filter(section => section.id !== '4winners');
    
    serviceSections.forEach((section) => {
        const textElements = gsap.utils.toArray(section.querySelectorAll('.content h1, .content p'));
        const buttonElement = section.querySelector('.content .details-btn');

        const commonScrollTrigger = {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
        };

        // Anima os elementos de texto (h1 e p)
        if (textElements.length > 0) {
            gsap.to(textElements, {
                scrollTrigger: commonScrollTrigger,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2,
            });
        }

        // Anima o botão separadamente, se ele existir
        if (buttonElement) {
            gsap.to(buttonElement, {
                scrollTrigger: commonScrollTrigger,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.4, // Aparece ligeiramente depois do texto para um efeito escalonado
            });
        }
    });

    console.log("Smooth scroll implemented. Enjoy the silky navigation.");
});
