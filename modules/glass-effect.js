export function initializeGlassEffect() {
    const glassEffect = document.querySelector('.glass-effect');
    if (!glassEffect) return;

    gsap.to(glassEffect, {
        scrollTrigger: {
            trigger: '#gravacao-laser',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        rotation: 90,
        scale: 1.5, // Adds a bit of zoom for a more dynamic effect
        ease: 'none'
    });
}