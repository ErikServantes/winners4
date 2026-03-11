export function initializeSmoothScroll() {
    // --- Física Luxuosa para Desktop (Lenis) ---
    // Ajustámos estes parâmetros para dar uma sensação de "massa pesada" e deslizamento longo,
    // simulando a passagem entre secções sem forçar um "snap" irritante para o utilizador.
    
    const lenis = new Lenis({
        // Duração muito maior (2.5s em vez de 1.2s) cria um deslizamento prolongado e amanteigado
        duration: 2.5, 
        
        // Easing de "Expo Out". Começa rápido ao rodar a roda, e desacelera muuuuito suavemente no final
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        
        // Aumenta o multiplicador do rato para que um pequeno clique na roda
        // percorra uma distância maior (ajuda a aproximar a sensação de passar um "slide" inteiro)
        mouseMultiplier: 1.5, 
        
        // Mantemos o touch nativo para telemóveis (para o dedo controlar com precisão)
        smoothTouch: false, 
        touchMultiplier: 2,
    });

    // Make lenis instance available globally for anchors/links
    window.lenis = lenis;

    // --- CRITICAL: Perfect Sync between Lenis and GSAP ScrollTrigger ---
    // Instead of letting them run on separate loops, we bind Lenis strictly to GSAP's internal ticker.
    // This ensures that when GSAP calculates a scrub animation (like the 4winners title or future exploded medals),
    // it uses the EXACT scroll position Lenis computed for that specific frame. No jitter, absolute sync.

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing. If the browser lags, we want the animation to jump to the correct absolute
    // position based on scroll, rather than trying to smoothly catch up, which breaks "absolute scroll" tracking.
    gsap.ticker.lagSmoothing(0);
}