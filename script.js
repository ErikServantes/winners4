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

    // --- Animações Genéricas de Conteúdo ---
    // Esta lógica é simples e partilhada, por isso pode ficar aqui.
    // Se crescer, podemos também movê-la para o seu próprio módulo.
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

                tl.from(heading, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
                  .from(paragraph, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, "-=0.6")
                  .from(button, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, "-=0.4");
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

                tl.from(heading, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' })
                  .from(paragraph, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, "-=0.5")
                  .from(button, { opacity: 0, y: 10, duration: 0.4, ease: 'power3.out' }, "-=0.3");
            });
        }
    });

    console.log("Project successfully modularized. Ready to scale!");
});
