export function initializeHeroAnimation() {
    // Procura o novo ID
    const heroSection = document.getElementById('hero-4winners');
    if (!heroSection) return;

    const title = heroSection.querySelector('h1');
    const subtitle = heroSection.querySelector('p');

    // 1. Garantir que os contentores estão visíveis
    gsap.set(title, { opacity: 1, y: 0, perspective: 1000 });

    // 2. Fragmentar o texto
    const text = title.textContent;
    title.innerHTML = ''; 

    const chars = [];
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = char === ' ' ? 'inline' : 'inline-block'; 
        
        // Guardar as coordenadas caóticas finais para o scroll
        span.dataset.targetX = gsap.utils.random(-400, 400);
        span.dataset.targetY = gsap.utils.random(100, 600);
        span.dataset.targetZ = gsap.utils.random(-500, 500);
        span.dataset.targetRotX = gsap.utils.random(-360, 360);
        span.dataset.targetRotY = gsap.utils.random(-360, 360);
        span.dataset.targetRotZ = gsap.utils.random(-180, 180);

        title.appendChild(span);
        chars.push(span);
    }

    // --- ANIMAÇÃO DE CARREGAMENTO (Montagem) ---
    const buildTl = gsap.timeline();
    
    buildTl.fromTo(chars, 
        {
            opacity: 0,
            x: () => gsap.utils.random(-300, 300),
            y: () => gsap.utils.random(-300, 300),
            z: () => gsap.utils.random(-800, 200),
            rotationX: () => gsap.utils.random(-180, 180),
            rotationY: () => gsap.utils.random(-180, 180),
            rotationZ: () => gsap.utils.random(-90, 90),
        },
        {
            opacity: 1,
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            duration: 1.5,
            ease: "back.out(2.5)",
            stagger: 0.1
        }
    );

    if (subtitle) {
        buildTl.fromTo(subtitle, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.8" 
        ); 
    }

    // --- ANIMAÇÃO DE SCROLL (Desmontagem) ---
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }
    });

    scrollTl.fromTo(chars, 
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
            ease: "none", 
            immediateRender: false, 
            stagger: {
                amount: 0.2, 
                from: "random" 
            }
        }, 
        0 
    ); 

    if (subtitle) {
        scrollTl.fromTo(subtitle, 
            { opacity: 1, y: 0 }, 
            { opacity: 0, y: -50, ease: "none", immediateRender: false }, 
            0
        ); 
    }
}