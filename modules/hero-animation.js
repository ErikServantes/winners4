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

    // Selecionar todos os pedaços que compõem o logotipo
    const paths = Array.from(svgElement.querySelectorAll('path, polygon, rect, circle'));

    paths.forEach(path => {
        // Assegurar que as partes começam preparadas
        gsap.set(path, { opacity: 1 });
        path.style.transformOrigin = "center center"; 
        
        // Coordenadas para o scroll
        path.dataset.targetX = gsap.utils.random(-800, 800);
        path.dataset.targetY = gsap.utils.random(200, 1000);
        path.dataset.targetZ = gsap.utils.random(-800, 800);
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
                x: (index, target) => parseFloat(target.dataset.targetX),
                y: (index, target) => parseFloat(target.dataset.targetY),
                z: (index, target) => parseFloat(target.dataset.targetZ),
                rotationX: (index, target) => parseFloat(target.dataset.targetRotX),
                rotationY: (index, target) => parseFloat(target.dataset.targetRotY),
                rotationZ: (index, target) => parseFloat(target.dataset.targetRotZ),
                opacity: 0,
                ease: "power1.inOut"
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
                x: () => gsap.utils.random(-500, 500),
                y: () => gsap.utils.random(-500, 500),
                z: () => gsap.utils.random(-1000, 500),
                rotationX: () => gsap.utils.random(-180, 180),
                rotationY: () => gsap.utils.random(-180, 180),
                rotationZ: () => gsap.utils.random(-180, 180),
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                z: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                duration: 2.5, 
                ease: "power4.out",
                stagger: {
                    amount: 0.8,
                    from: "edges" 
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
