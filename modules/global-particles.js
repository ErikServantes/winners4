export function initializeGlobalParticles() {
    const bgCanvas = document.getElementById('particles-bg');
    const fgCanvas = document.getElementById('particles-fg');
    
    if (!bgCanvas || !fgCanvas) return;

    const ctxBg = bgCanvas.getContext('2d', { alpha: true });
    const ctxFg = fgCanvas.getContext('2d', { alpha: true });

    let width, height;
    let particles = [];
    // Total de partículas dividido pelas 3 camadas lógicas
    const particleCount = 150; 

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        
        // Suporte para ecrãs Retina / Alta Resolução
        const dpr = window.devicePixelRatio || 1;
        
        bgCanvas.width = width * dpr;
        bgCanvas.height = height * dpr;
        bgCanvas.style.width = width + 'px';
        bgCanvas.style.height = height + 'px';
        ctxBg.scale(dpr, dpr);

        fgCanvas.width = width * dpr;
        fgCanvas.height = height * dpr;
        fgCanvas.style.width = width + 'px';
        fgCanvas.style.height = height + 'px';
        ctxFg.scale(dpr, dpr);
    }

    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(randomY = false) {
            this.x = Math.random() * width;
            this.y = randomY ? Math.random() * height : height + 50;
            
            // Profundidade Z (0 a 1) determina em que camada está
            this.z = Math.random();
            
            // Cor neutra quente (Industrial spark)
            const r = 255, g = 245, b = 230;

            if (this.z < 0.33) {
                // CAMADA 1: FUNDO (Atrás dos vidros, será desfocada pelo CSS backdrop-filter)
                this.size = Math.random() * 1.5 + 0.5;
                this.speedY = Math.random() * 0.2 + 0.1;
                this.parallax = 0.1; // Move-se devagar com o scroll
                this.alpha = Math.random() * 0.3 + 0.1;
                this.canvas = 'bg';
                this.color = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
                this.isBokeh = false;
            } else if (this.z < 0.66) {
                // CAMADA 2: MEIO (À frente dos vidros, junto ao texto, nítida)
                this.size = Math.random() * 1.5 + 1;
                this.speedY = Math.random() * 0.4 + 0.2;
                this.parallax = 0.4; // Velocidade média
                this.alpha = Math.random() * 0.5 + 0.2;
                this.canvas = 'fg';
                this.color = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
                this.isBokeh = false;
            } else {
                // CAMADA 3: FRENTE (Fora de foco, gigante, perto da câmara)
                this.size = Math.random() * 4 + 3;
                this.speedY = Math.random() * 0.8 + 0.4;
                this.parallax = 1.2; // Voa rápido com o scroll
                this.alpha = Math.random() * 0.15 + 0.05; // Mais transparente para não incomodar
                this.canvas = 'fg';
                this.isBokeh = true;
                
                // Criação da cor central e periférica para o efeito Bokeh (Radial Gradient)
                this.colorCenter = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
                this.colorEdge = `rgba(${r}, ${g}, ${b}, 0)`;
            }
            
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.oscillationSpeed = Math.random() * 0.002;
            this.oscillationWidth = Math.random() * 0.5;
        }

        update(scrollVelocity) {
            // Movimento base de flutuar (tipo cinzas quentes)
            this.y -= this.speedY;
            
            // Efeito Parallax atado ao Lenis Scroll
            // Se fazemos scroll para baixo (vel. positiva), as partículas sobem
            this.y -= scrollVelocity * this.parallax;
            
            // Movimento lateral orgânico
            this.x += this.speedX + Math.sin(Date.now() * this.oscillationSpeed + this.z * 100) * this.oscillationWidth;

            // Reciclagem de partículas que saem do ecrã
            if (this.y < -100) {
                this.reset(false);
                this.y = height + 50;
            } else if (this.y > height + 100) {
                this.reset(false);
                this.y = -50;
            }
            
            if (this.x < -50) this.x = width + 50;
            if (this.x > width + 50) this.x = -50;
        }

        draw() {
            const ctx = this.canvas === 'bg' ? ctxBg : ctxFg;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            if (this.isBokeh) {
                // Simula desfoque de lente para a camada frontal
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, this.colorCenter);
                gradient.addColorStop(1, this.colorEdge);
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = this.color;
            }
            
            ctx.fill();
        }
    }

    function init() {
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        animate();
    }

    function animate() {
        ctxBg.clearRect(0, 0, width, height);
        ctxFg.clearRect(0, 0, width, height);

        // Vai buscar a velocidade do scroll diretamente ao Lenis se estiver ativo
        const scrollVelocity = window.lenis ? window.lenis.velocity : 0;

        particles.forEach(p => {
            p.update(scrollVelocity);
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    init();
}