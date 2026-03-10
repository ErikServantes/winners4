// Importa as funções dos módulos que criámos
import { initializeScrollytelling } from './modules/scrollytelling.js';
import { initializeModal } from './modules/modal.js';
import { initializeLaserAnimation } from './modules/laser-animation.js';
import { initializeGlassEffect } from './modules/glass-effect.js';

// Espera que o DOM esteja completamente carregado para executar o código
document.addEventListener('DOMContentLoaded', function() {
    // Regista o plugin ScrollTrigger do GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Inicializa cada módulo individualmente
    initializeScrollytelling();
    initializeModal();
    initializeLaserAnimation();
    initializeGlassEffect();

    // --- Animações Genéricas de Conteúdo (Versão Explícita e Final) ---
    const sections = gsap.utils.toArray('.fullscreen-section');
    
    sections.forEach((section) => {
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

    console.log("Final, explicit content animations are now active.");
});
