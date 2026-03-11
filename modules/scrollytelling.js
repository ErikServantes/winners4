export function initializeScrollytelling() {
    const sections = gsap.utils.toArray('.fullscreen-section');

    // Set the initial state: first layer is visible, others are not.
    gsap.set('.layer', { opacity: 0 });
    gsap.set('#layer-hero-4winners', { opacity: 1 });

    // A single, clean loop to handle all background transitions
    sections.forEach((section, i) => {
        const currentLayer = document.querySelector(`#layer-${section.id}`);
        
        // Make sure we are not on the last section
        if (i < sections.length - 1) {
            const nextSection = sections[i + 1];
            const nextLayer = document.querySelector(`#layer-${nextSection.id}`);

            if (currentLayer && nextLayer) {
                ScrollTrigger.create({
                    trigger: nextSection,      // Trigger is the start of the NEXT section
                    start: 'top 80%',         // A bit earlier for a smoother feel
                    end: 'top 30%',          // A zone to handle the transition
                    scrub: true,           // Smoothly animates with scroll
                    onUpdate: (self) => {
                        gsap.set(currentLayer, { opacity: 1 - self.progress.toFixed(2) });
                        gsap.set(nextLayer,    { opacity: self.progress.toFixed(2) });
                    },
                });
            }
        }
    });
}