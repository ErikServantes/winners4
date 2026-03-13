const fs = require('fs');
let code = fs.readFileSync('modules/modal.js', 'utf8');

// The issue happens because we added e.preventDefault() to touchmove on the window.
// Although we check if (!isDragging) return; BEFORE preventDefault, if we drag OUTSIDE the 360 container, isDragging is false, so it returns... wait. If it returns, it DOESN'T preventDefault. So normal scroll should happen.
// BUT in touch devices, we added `{ passive: false }` to the window touchmove event listener. Adding a non-passive touchmove listener to the window, even if it returns early, can sometimes lock up scrolling on iOS/Android or interfere with Lenis smooth scrolling.

// Wait, the lenis.stop() and lenis.start() are NOT being called when the modal opens! 
// If the modal opens, the body scroll should be disabled, but then the modal interior should scroll. Lenis might be preventing scroll inside the modal.

// Let's add lenis.stop() and lenis.start() in initializeModal.

const openModalCode = `
                // Mostra o modal
                modal.classList.add('visible');
                
                // Pára o Lenis para evitar scroll duplo enquanto o modal está aberto
                if (window.lenis) {
                    window.lenis.stop();
                }

                // --- INICIALIZAÇÃO DO VISUALIZADOR 360º (SE APLICÁVEL) ---`;

code = code.replace(
    `
                // Mostra o modal
                modal.classList.add('visible');

                // --- INICIALIZAÇÃO DO VISUALIZADOR 360º (SE APLICÁVEL) ---`,
    openModalCode
);

const closeModalCode = `
    function closeModal() {
        modal.classList.remove('visible');
        
        // Retoma o scroll da página
        if (window.lenis) {
            window.lenis.start();
        }
        
        // Se houver um 360 viewer ativo, para o seu timer/animação de fundo`;

code = code.replace(
    `
    function closeModal() {
        modal.classList.remove('visible');
        
        // Se houver um 360 viewer ativo, para o seu timer/animação de fundo`,
    closeModalCode
);

fs.writeFileSync('modules/modal.js', code);
