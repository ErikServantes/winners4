export function initializeLaserAnimation() {
    const canvas = document.getElementById('laser-canvas');
    if (!canvas) return;

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
        constructor() { this.reset(); }
        reset() { 
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1; 
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.color = '#444c54'; // Base color
            this.life = 1;
            this.decay = Math.random() * 0.01 + 0.005;
        }
        update() { 
            if (this.life <= 0) this.reset();
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() { 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 10000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        if (!isLaserAnimating) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => { particle.update(); particle.draw(); });
        requestAnimationFrame(animateParticles);
    }

    ScrollTrigger.create({
        trigger: '#corte-laser',
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => { if (!isLaserAnimating) { isLaserAnimating = true; resizeCanvas(); initParticles(); animateParticles(); } },
        onLeave: () => { isLaserAnimating = false; },
        onEnterBack: () => { if (!isLaserAnimating) { isLaserAnimating = true; animateParticles(); } },
        onLeaveBack: () => { isLaserAnimating = false; }
    });
}