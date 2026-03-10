export function initializeHeroAnimation() {
    const heroSection = document.getElementById('4winners');
    if (!heroSection) return;

    const title = heroSection.querySelector('h1');
    const subtitle = heroSection.querySelector('p');

    // 1. Sobrescrever o estado CSS inicial (opacity: 0) para o contentor h1
    // Para podermos animar as letras individualmente
    gsap.set(title, { opacity: 1, y: 0, perspective: 1000 });

    // 2. Fragmentar o texto em letras separadas
    const text = title.textContent;
    title.innerHTML = ''; // Limpar o texto original

    const chars = [];
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        // inline-block permite aplicar transformações 3D a cada letra
        span.style.display = char === ' ' ? 'inline' : 'inline-block'; 
        title.appendChild(span);
        chars.push(span);
    }

    // 3. ANIMAÇÃO DE ENTRADA: A "Montagem"
    gsap.fromTo(chars, 
        {
            // Estado inicial: dispersos e invisíveis
            opacity: 0,
            x: () => gsap.utils.random(-300, 300),
            y: () => gsap.utils.random(-300, 300),
            z: () => gsap.utils.random(-800, 200), // Profundidade 3D
            rotationX: () => gsap.utils.random(-180, 180),
            rotationY: () => gsap.utils.random(-180, 180),
            rotationZ: () => gsap.utils.random(-90, 90),
        },
        {
            // Estado final: montados na perfeição
            opacity: 1,
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            duration: 1.5,
            ease: "back.out(2.5)", // Efeito de "snap" violento (metal a bater em metal)
            stagger: 0.1, // As letras entram uma a uma com 0.1s de intervalo
            delay: 0.2
        }
    );

    // Animar o subtítulo ligeiramente depois do título
    if (subtitle) {
        gsap.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 1.5 // Atraso para deixar o título montar-se primeiro
        });
    }

    // 4. ANIMAÇÃO DE SAÍDA: A "Desmontagem" (ligada ao scroll)
    gsap.to(chars, {
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true // A animação avança/recua com o scroll
        },
        // Estado final ao fazer scroll: caem e rodam aleatoriamente
        x: () => gsap.utils.random(-400, 400),
        y: () => gsap.utils.random(100, 600), // Caem para baixo (gravidade)
        z: () => gsap.utils.random(-500, 500),
        rotationX: () => gsap.utils.random(-360, 360),
        rotationY: () => gsap.utils.random(-360, 360),
        rotationZ: () => gsap.utils.random(-180, 180),
        opacity: 0,
        ease: "power2.in",
        stagger: {
            amount: 0.2, // Pequeno atraso entre as letras a cair
            from: "random" // Caem numa ordem aleatória
        }
    });

    // Desvanece o subtítulo também no scroll
    if (subtitle) {
        gsap.to(subtitle, {
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'center top',
                scrub: true
            },
            opacity: 0,
            y: -50
        });
    }
}