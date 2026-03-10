export function initializeSmoothScroll() {
    // Initialize Lenis
    const lenis = new Lenis({
        duration: 1.2, // Quanto maior, mais longo é o "fadeout" do movimento
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de abrandamento (momentum)
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false, // Em mobile (touch) deixamos o scroll nativo que já é excelente
        touchMultiplier: 2,
        infinite: false,
    });

    // RequestAnimationFrame loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing to prevent conflicts
    gsap.ticker.lagSmoothing(0);
}