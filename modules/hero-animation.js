export function initializeHeroAnimation() {
    // Procura o novo ID
    const heroSection = document.getElementById('hero-4winners');
    if (!heroSection) return;

    const title = heroSection.querySelector('h1');
    const subtitle = heroSection.querySelector('p');

    // 1. Garantir que os contentores base estão visíveis e com perspetiva
    gsap.set(title, { opacity: 1, y: 0, perspective: 1000 });

    // 2. Fragmentar o texto e preparar os elementos
    const text = title.textContent;
    title.innerHTML = ''; 

    const chars = [];
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        // Removido o estilo inline opaco que estava a causar conflitos
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

    // Função que cria a animação de scroll (Desmontagem)
    // Envolvemos numa função para só a chamar no momento certo
    function initScrollAnimation() {
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });

        // Usar fromTo garante que os valores de início e fim são sempre absolutos,
        // independentemente do estado em que os elementos se encontram quando isto é inicializado
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
                { opacity: 0, y: -50, ease: "none" }, 
                0
            ); 
        }
    }

    // A GRANDE CORREÇÃO:
    // O problema acontecia porque a animação de Montagem e a de Desmontagem lutavam pelos
    // mesmos elementos ao mesmo tempo no carregamento da página.
    
    // Se a página carregar no topo, fazemos a animação de Montagem bonita, e SÓ DEPOIS ligamos o Scroll
    if (window.scrollY < 50) {
        // Esconder os elementos antes da animação começar
        gsap.set(chars, { opacity: 0 });
        if (subtitle) gsap.set(subtitle, { opacity: 0, y: 30 });

        const buildTl = gsap.timeline({
            onComplete: () => {
                // Quando terminar de montar as peças, inicializamos o gatilho de scroll
                initScrollAnimation();
            }
        });
        
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
            buildTl.to(subtitle, 
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.8" 
            ); 
        }
    } else {
        // Se o utilizador fez refresh e já está mais abaixo na página, NÃO fazemos a animação de montagem.
        // Inicializamos diretamente a animação de scroll. O ScrollTrigger vai calcular a posição do scroll
        // e estilhaçar o texto imediatamente na proporção certa!
        initScrollAnimation();
    }
}