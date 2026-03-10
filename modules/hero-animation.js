export function initializeHeroAnimation() {
    const heroSection = document.getElementById('4winners');
    if (!heroSection) return;

    const title = heroSection.querySelector('h1');
    const subtitle = heroSection.querySelector('p');

    // 1. Reset initial states
    gsap.set(title, { opacity: 1, y: 0, perspective: 1000 });

    // 2. Fragment the text into individual letters
    const text = title.textContent;
    title.innerHTML = ''; 

    const chars = [];
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = char === ' ' ? 'inline' : 'inline-block'; 
        // Armazenar os valores alvo aleatórios no próprio elemento para coerência no scrub
        span.dataset.targetX = gsap.utils.random(-400, 400);
        span.dataset.targetY = gsap.utils.random(100, 600);
        span.dataset.targetZ = gsap.utils.random(-500, 500);
        span.dataset.targetRotX = gsap.utils.random(-360, 360);
        span.dataset.targetRotY = gsap.utils.random(-360, 360);
        span.dataset.targetRotZ = gsap.utils.random(-180, 180);

        title.appendChild(span);
        chars.push(span);
    }

    // 3. THE INITIAL BUILD ANIMATION (Plays once on load)
    // We use a separate timeline that is not tied to scroll for the clean build
    const buildTl = gsap.timeline();
    
    buildTl.from(chars, {
        opacity: 0,
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        z: () => gsap.utils.random(-800, 200),
        rotationX: () => gsap.utils.random(-180, 180),
        rotationY: () => gsap.utils.random(-180, 180),
        rotationZ: () => gsap.utils.random(-90, 90),
        duration: 1.5,
        ease: "back.out(2.5)",
        stagger: 0.1,
    });

    if (subtitle) {
        buildTl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
        }, "-=1"); // Overlap slightly with the title build
    }

    // 4. THE DECONSTRUCTION ANIMATION (Tied to scroll)
    // This timeline only affects the elements after the build is complete.
    // By using fromTo starting at 0, we force GSAP to respect the clean baseline
    // when scrubbing back to the top.
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    scrollTl.to(chars, {
        // Use the pre-calculated random values stored in the dataset
        x: (index, target) => parseFloat(target.dataset.targetX),
        y: (index, target) => parseFloat(target.dataset.targetY),
        z: (index, target) => parseFloat(target.dataset.targetZ),
        rotationX: (index, target) => parseFloat(target.dataset.targetRotX),
        rotationY: (index, target) => parseFloat(target.dataset.targetRotY),
        rotationZ: (index, target) => parseFloat(target.dataset.targetRotZ),
        opacity: 0,
        ease: "none", // Best for scrubbed animations
        stagger: {
            amount: 0.2, 
            from: "random" 
        }
    }, 0); // Start at the absolute beginning of the scroll timeline

    if (subtitle) {
        scrollTl.to(subtitle, {
            opacity: 0,
            y: -50,
            ease: "none"
        }, 0); // Start at the same time as chars
    }
}