export function initializeSmoothScroll() {
    // Initialize Lenis with optimal settings for scrub animations
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
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