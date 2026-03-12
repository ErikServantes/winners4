export function initializeGlassEffect() {
    const glassEffect = document.querySelector('.glass-effect');
    // Se o elemento não existir (como acontece no novo layout zigzag), sai de forma silenciosa e limpa
    if (!glassEffect) return;

    try {
        gsap.to(glassEffect, {
            scrollTrigger: {
                trigger: '#gravacao-laser',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            rotation: 90,
            scale: 1.5, 
            ease: 'none'
        });
    } catch(e) {
        console.warn("Glass effect trigger failed:", e);
    }
}