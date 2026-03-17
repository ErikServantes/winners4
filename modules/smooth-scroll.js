export function initializeSmoothScroll() {
    console.log("Iniciando motor de scroll...");

    // Se o Lenis não estiver carregado, abortamos para não causar erro
    if (typeof Lenis === 'undefined') {
        console.error("Lenis não encontrado!");
        return;
    }

    const lenis = new Lenis({
        duration: 2.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        mouseMultiplier: 1.2,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    window.lenis = lenis;

    // Conectar ao ScrollTrigger do GSAP
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // CRÍTICO: Forçar o browser a permitir scroll no body
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    console.log("Motor de scroll ativado.");
}
