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

    /*
    // --- DIAGNOSTIC MODE: Generic Content Animation Deactivated ---
    const sections = gsap.utils.toArray('.fullscreen-section');
    
    ScrollTrigger.matchMedia({
        // Animações para Desktop
        "(min-width: 769px)": function() {
            sections.forEach((section) => {
                const heading = section.querySelector('h1');
                const paragraph = section.querySelector('p');
                const button = section.querySelector('.details-btn');

                const tl = gsap.timeline({ 
                    scrollTrigger: { 
                        trigger: section, 
                        start: 'top 70%', 
                        toggleActions: 'play none none none' 
                    }
                });

                // Adiciona animações APENAS se os elementos existirem
                if (heading) {
                    tl.from(heading, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' });
                }
                if (paragraph) {
                    tl.from(paragraph, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, "-=0.6");
                }
                if (button) {
                    tl.from(button, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, "-=0.4");
                }
            });
        },

        // Animações para Mobile
        "(max-width: 768px)": function() {
             sections.forEach((section) => {
                const heading = section.querySelector('h1');
                const paragraph = section.querySelector('p');
                const button = section.querySelector('.details-btn');

                const tl = gsap.timeline({ 
                    scrollTrigger: { 
                        trigger: section, 
                        start: 'top 80%', 
                        toggleActions: 'play none none none' 
                    }
                });

                // Adiciona animações APENAS se os elementos existirem
                if (heading) {
                    tl.from(heading, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
                }
                if (paragraph) {
                    tl.from(paragraph, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, "-=0.5");
                }
                if (button) {
                    tl.from(button, { opacity: 0, y: 10, duration: 0.4, ease: 'power3.out' }, "-=0.3");
                }
            });
        }
    });
    */

    console.log("DIAGNOSTIC MODE: Generic content animations are off. Checking button visibility.");
});
