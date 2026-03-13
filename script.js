// Importa as funções dos módulos que criámos
import { initializeSmoothScroll } from './modules/smooth-scroll.js';
import { initializeScrollytelling } from './modules/scrollytelling.js';
import { initializeModal } from './modules/modal.js';
import { initializeGlobalParticles } from './modules/global-particles.js';
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
    // Inicia o novo sistema de partículas 3D globais em vez do laser isolado
    initializeGlobalParticles();

    initializeGlassEffect();
    initializeHeroAnimation();

    // --- Navegação Inteligente (Header e Side Nav) ---
    
    // 1. Scroll Suave para Links Internos
    // O Lenis trata do scroll, mas precisamos de intercetar os cliques
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = targetId === '#' ? null : document.querySelector(targetId);
            
            if (targetElement) {
                // Usa o motor Lenis (que está disponível globalmente através do módulo smooth-scroll)
                // para fazer o scroll suave até ao destino
                window.lenis?.scrollTo(targetElement);
            }
        });
    });

    // 2. Indicador Ativo na Side Nav
    // A estrutura do HTML mudou. A classe .active deve estar na tag <a> e não no <span>.dot
    const navLinks = document.querySelectorAll('#side-nav ul li a');
    const sections = gsap.utils.toArray('.fullscreen-section');

    sections.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            // Ajustado para disparar quando a secção atinge 50% do ecrã (centro)
            start: 'top center',
            end: 'bottom center',
            onToggle: self => {
                if (self.isActive && navLinks[i]) {
                    // Remove a classe active de todas as tags 'a'
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Adiciona a classe active à tag 'a' correspondente à secção atual
                    navLinks[i].classList.add('active');
                }
            }
        });
    });

    // --- Animações Genéricas de Conteúdo ---
    const allSections = gsap.utils.toArray('.fullscreen-section');
    // Filtra usando o novo ID correto que começa com uma letra
    // Filtra o Hero (que tem SVG próprio) e a secção de Background Layers para evitar crashs
    const serviceSections = allSections.filter(section => 
        section.id !== 'hero-4winners' && 
        section.id !== 'background-layers'
    );
    
    serviceSections.forEach((section) => {
        // Seleciona apenas os elementos de texto puros dentro do content, ignora qualquer SVG injetado ou imagens
        const textElements = gsap.utils.toArray(section.querySelectorAll('.content h1:not(:has(svg)), .content p'));
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
// Ocultação Inteligente de Partículas (Fase 1 do Plano)
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



// Atualiza Dinamicamente os Anos de Experiência no Hero
function updateExperienceYears() {
    const subtitleElement = document.getElementById('hero-subtitle');
    if (!subtitleElement) return;

    const currentYear = new Date().getFullYear();
    const foundingYear = 1983; // Baseado no facto de ter 43 anos na data da tua instrução (2026)
    const yearsOfExperience = currentYear - foundingYear;

    // Usar innerHTML em vez de innerText para permitir o uso da tag <br>
    // A classe .break-mobile pode ser usada no CSS se quisermos quebrar apenas no telemóvel, 
    // mas por defeito quebraremos sempre após a palavra "experiência" como pedido.
    subtitleElement.innerHTML = `${yearsOfExperience} anos de experiência<br>a premiar o desporto e a cultura.`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Wait slightly to ensure GSAP is ready and other init scripts ran
    setTimeout(setupParticleFading, 200);
    updateExperienceYears();
});
