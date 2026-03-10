document.addEventListener('DOMContentLoaded', function() {
    // Register the GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.fullscreen-section');

    // Set the first layer to be visible by default
    gsap.set('#layer-estamparia', { opacity: 1 });

    // Animate layers based on scroll position
    sections.forEach((section) => {
        const layerId = `#layer-${section.id}`;
        const layer = document.querySelector(layerId);

        if (layer) {
            gsap.to(layer, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => gsap.to(layer, { opacity: 1, duration: 1.5, ease: 'power3.inOut' }),
                    onLeave: () => gsap.to(layer, { opacity: 0, duration: 1.5, ease: 'power3.inOut' }),
                    onEnterBack: () => gsap.to(layer, { opacity: 1, duration: 1.5, ease: 'power3.inOut' }),
                    onLeaveBack: () => gsap.to(layer, { opacity: 0, duration: 1.5, ease: 'power3.inOut' })
                }
            });
        }
    });

    // Animate content (h1 and p) for each section
    sections.forEach((section) => {
        const heading = section.querySelector('h1');
        const paragraph = section.querySelector('p');
        if (heading) {
            gsap.from(heading, { scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' }, opacity: 0, y: 50, duration: 1 });
        }
        if (paragraph) {
            gsap.from(paragraph, { scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' }, opacity: 0, y: 50, duration: 1, delay: 0.3 });
        }
    });

    // Specific effect for "Estamparia" - Impact/Press
    const estampariaContent = document.querySelector('#estamparia .content');
    if (estampariaContent) {
        gsap.from(estampariaContent, { scrollTrigger: { trigger: '#estamparia', start: 'top 60%', toggleActions: 'play none none none' }, scale: 1.1, duration: 1.5, ease: 'power3.out' });
    }

    // --- Laser de Fibra Particle System ---
    const canvas = document.getElementById('laser-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let isLaserAnimating = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.hue = Math.random() * 60 + 180; // Shades of blue/cyan
            this.saturation = 100;
            this.lightness = 75;
            this.life = 1; // Represents alpha
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            if (this.life <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.life})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        if (!isLaserAnimating) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    ScrollTrigger.create({
        trigger: '#laser',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
            if (!isLaserAnimating) {
                isLaserAnimating = true;
                resizeCanvas();
                initParticles();
                animateParticles();
            }
        },
        onLeave: () => { isLaserAnimating = false; },
        onEnterBack: () => {
            if (!isLaserAnimating) {
                isLaserAnimating = true;
                animateParticles();
            }
        },
        onLeaveBack: () => { isLaserAnimating = false; }
    });

    // --- Acrílico Premium Glass Effect ---
    const glassEffect = document.querySelector('.glass-effect');
    if (glassEffect) {
        gsap.to(glassEffect, {
            scrollTrigger: {
                trigger: '#acrilico',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            rotation: 90,
            ease: 'none'
        });
    }

    // Ensure the first section's layer is visible on load
    ScrollTrigger.create({
        trigger: '#estamparia',
        start: 'top top',
        onEnter: () => gsap.set('#layer-estamparia', { opacity: 1 }),
        onLeaveBack: () => gsap.set('#layer-estamparia', { opacity: 1 })
    });
});