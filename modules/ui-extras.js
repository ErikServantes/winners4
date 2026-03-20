import { ContactEngine } from './contact-engine.js';

/**
 * UI EXTRAS V1.0 - Lógica de Interatividade de Contacto
 * Gere a barra flutuante e os gatilhos de inatividade.
 */

export function initializeUIExtras() {
    const contactBar = document.getElementById('smart-contact-bar');
    const waTrigger = document.getElementById('wa-trigger');
    
    if (!contactBar || !waTrigger) return;

    let inactivityTimer;
    const DELAY = 5000; // 5 segundos

    /**
     * Reseta o contador sempre que há movimento humano
     */
    function resetInactivity(e) {
        // Se a interação foi especificamente dentro da barra (clique, hover, scroll na barra),
        // não escondemos a barra! Ignoramos o reset.
        if (e && e.target && e.target.closest && e.target.closest('#smart-contact-bar')) {
            return;
        }

        contactBar.classList.remove('active');
        clearTimeout(inactivityTimer);
        
        inactivityTimer = setTimeout(() => {
            // Só ativa se o utilizador não estiver com modais abertos
            if (!document.documentElement.classList.contains('modal-open')) {
                contactBar.classList.add('active');
            }
        }, DELAY);
    }

    // Eventos de monitorização
    ['mousemove', 'mousedown', 'scroll', 'touchstart', 'keydown'].forEach(event => {
        window.addEventListener(event, resetInactivity, { passive: true });
    });

    // Ativa logo no início
    resetInactivity();

    /**
     * Gatilho do WhatsApp - Blindado (Descodifica apenas no clique)
     */
    waTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        const url = ContactEngine.getWhatsAppHref();
        window.open(url, '_blank');
    });

    // Expandir manualmente na barra ou, se ativa, ir diretamente para o WhatsApp!
    contactBar.addEventListener('click', (e) => {
        if (e.target.closest('#wa-trigger')) return; // o ícone já faz o seu próprio envio
        
        if (contactBar.classList.contains('active')) {
            // Clicou nas palavras "FALE CONNOSCO" ou no fundo verde (Estado Expandido)
            const url = ContactEngine.getWhatsAppHref();
            window.open(url, '_blank');
        } else {
            // Clicou fortuitamente na barra preta fina
            contactBar.classList.add('active');
        }
    });
}
