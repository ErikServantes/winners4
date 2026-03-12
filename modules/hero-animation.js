export function initializeHeroAnimation() {
    const heroSection = document.getElementById('hero-4winners');
    if (!heroSection) return;

    const svgElement = document.getElementById('hero-logo-svg');
    const subtitle = document.getElementById('hero-subtitle');
    
    if (!svgElement) return;

    // Garante que o SVG preenche o container E está visível
    svgElement.style.width = '100%';
    svgElement.style.height = '100%';
    svgElement.style.overflow = 'visible';
    svgElement.style.display = 'block';

    // Força o container principal a ficar visível antes da animação GSAP sequer tocar nele
    gsap.set(svgElement, { opacity: 1, visibility: 'visible' });

    // Selecionar todos os pedaços (paths) que compõem o logotipo
    const paths = Array.from(svgElement.querySelectorAll('.logo-part'));

    if (paths.length === 0) return;

    paths.forEach(path => {
        // SVG paths precisam de ter o transform origin explicitamente definido pelo GSAP para funcionar bem
        gsap.set(path, { 
            opacity: 1, 
            transformOrigin: "50% 50%" 
        });
        
        // Coordenadas para o scroll
        path.dataset.targetX = gsap.utils.random(-1000, 1000);
        path.dataset.targetY = gsap.utils.random(-500, 1000);
        path.dataset.targetZ = gsap.utils.random(-1000, 1000);
        path.dataset.targetRotX = gsap.utils.random(-360, 360);
        path.dataset.targetRotY = gsap.utils.random(-360, 360);
        path.dataset.targetRotZ = gsap.utils.random(-360, 360);
    });

    function initScrollAnimation() {
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: 1, 
            }
        });

        scrollTl.fromTo(paths, 
            {
                opacity: 1, x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0
            },
            {
                x: (index, target) => parseFloat(target.dataset.targetX || 0),
                y: (index, target) => parseFloat(target.dataset.targetY || 0),
                z: (index, target) => parseFloat(target.dataset.targetZ || 0),
                rotationX: (index, target) => parseFloat(target.dataset.targetRotX || 0),
                rotationY: (index, target) => parseFloat(target.dataset.targetRotY || 0),
                rotationZ: (index, target) => parseFloat(target.dataset.targetRotZ || 0),
                opacity: 0,
                ease: "none", stagger: { amount: 0.3, from: "random" }
            }, 
            0 
        ); 

        if (subtitle) {
            scrollTl.fromTo(subtitle, 
                { opacity: 1, y: 0 }, 
                { opacity: 0, y: -50, ease: "none" }, 
                0
            ); 
        }
    }

    if (window.scrollY < 50) {
        gsap.set(paths, { opacity: 0 });
        if (subtitle) gsap.set(subtitle, { opacity: 0, y: 30 });

        const buildTl = gsap.timeline({
            onComplete: () => {
                initScrollAnimation();
            }
        });
        
        buildTl.fromTo(paths, 
            {
                opacity: 0,
                x: () => gsap.utils.random(-800, 800), // Mais longe e caótico
                y: () => gsap.utils.random(-600, 600),
                z: () => gsap.utils.random(-1500, 800), // Mais profundidade para voar de trás
                rotationX: () => gsap.utils.random(-720, 720), // Roda muito mais
                rotationY: () => gsap.utils.random(-720, 720),
                rotationZ: () => gsap.utils.random(-360, 360),
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                z: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                duration: 1.5, // Mais rápido e "snappy" como no original
                ease: "back.out(1.7)", // Efeito de mola (overshoot) onde as peças batem e tremem um pouco ao encaixar
                stagger: {
                    amount: 0.4, // Menos atraso para ser uma montagem mais agressiva
                    from: "random" // Em vez das margens, é completamente caótico
                }
            }
        );

        if (subtitle) {
            buildTl.to(subtitle, 
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=1.5" 
            ); 
        }
    } else {
        initScrollAnimation();
    }
}
