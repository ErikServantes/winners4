export function initializeHeroAnimation() {
    // Procura o novo ID
    const heroSection = document.getElementById('hero-4winners');
    if (!heroSection) return;

    const title = heroSection.querySelector('h1');
    const subtitle = heroSection.querySelector('p');

    // 1. Garantir que os contentores estão visíveis e com perspetiva
    gsap.set(title, { opacity: 1, y: 0, perspective: 1000 });

    // 2. Fragmentar o texto e preparar os elementos
    const text = title.textContent;
    title.innerHTML = ''; 

    const chars = [];
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        // Definir um estado inicial explícito para evitar flashes antes do JS correr
        span.style.opacity = '0';
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
    // Esta animação só deve ocorrer se a secção estiver (ou entrar) no viewport
    const buildTl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: "top 80%", // Começa quando o topo da secção atinge 80% da altura do viewport
            once: true, // Só executa a animação de entrada uma vez
        }
    });
    
    // Forçar os valores iniciais (from) explicitamente
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
            stagger: 0.1,
            // Garantir que os estilos inline fiquem limpos no final para que o scrollTrigger assuma perfeitamente
            clearProps: "transform"
        }
    );

    if (subtitle) {
        gsap.set(subtitle, { opacity: 0, y: 30 }); // Estado inicial
        buildTl.to(subtitle, 
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", clearProps: "transform,opacity" },
            "-=0.8" 
        ); 
    }

    // --- ANIMAÇÃO DE SCROLL (Desmontagem) ---
    // O ScrollTrigger principal para espalhar as letras
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            // Previne problemas de renderização inicial antes do scroll
            fastScrollEnd: true,
            preventOverlaps: true
        }
    });

    // Como usámos clearProps na animação de entrada, podemos simplesmente animar para os valores target
    scrollTl.to(chars, 
        {
            x: (index, target) => parseFloat(target.dataset.targetX),
            y: (index, target) => parseFloat(target.dataset.targetY),
            z: (index, target) => parseFloat(target.dataset.targetZ),
            rotationX: (index, target) => parseFloat(target.dataset.targetRotX),
            rotationY: (index, target) => parseFloat(target.dataset.targetRotY),
            rotationZ: (index, target) => parseFloat(target.dataset.targetRotZ),
            opacity: 0,
            ease: "none", 
            stagger: {
                amount: 0.2, 
                from: "random" 
            }
        }, 
        0 
    ); 

    if (subtitle) {
        scrollTl.to(subtitle, 
            { opacity: 0, y: -50, ease: "none" }, 
            0
        ); 
    }
}