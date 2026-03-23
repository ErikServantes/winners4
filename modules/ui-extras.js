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
    const delays = [10000, 30000, 60000]; // 10s, 30s, 60s
    let appearanceCount = 0;
    let isPermanentlyHidden = false;

    /**
     * Reseta o contador sempre que há movimento humano
     */
    function resetInactivity(e) {
        if (isPermanentlyHidden) return;

        // Se a interação foi especificamente dentro da barra (clique, hover, scroll na barra),
        // não escondemos a barra! Ignoramos o reset.
        if (e && e.target && e.target.closest && e.target.closest('#smart-contact-bar')) {
            return;
        }

        // Se a barra estava visível e o utilizador moveu o rato ou fez scroll no resto da página,
        // significa que ignorou o aviso. Conta um "strike".
        if (contactBar.classList.contains('active')) {
            contactBar.classList.remove('active');
            appearanceCount++;
        }

        clearTimeout(inactivityTimer);
        
        // Se ainda temos tempos de aviso disponíveis (0, 1, 2 = 10s, 30s, 60s)
        if (appearanceCount < delays.length) {
            inactivityTimer = setTimeout(() => {
                // Só ativa se o utilizador não estiver com modais abertos
                if (!document.documentElement.classList.contains('modal-open')) {
                    contactBar.classList.add('active');
                }
            }, delays[appearanceCount]);
        } else {
            // Esgotou todas as tentativas (já avisou as 3 vezes). Desliga-se para sempre.
            isPermanentlyHidden = true;
        }
    }

    // Eventos de monitorização (ignorar o rato para que o convite não feche ao tentar clicar)
    ['mousedown', 'scroll', 'touchstart', 'keydown'].forEach(event => {
        window.addEventListener(event, resetInactivity, { passive: true });
    });

    // Ativa logo no início
    resetInactivity();

    /**
     * Gatilho do WhatsApp - Blindado (Descodifica apenas no clique)
     */
    waTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        isPermanentlyHidden = true; // Desativar popups automáticos se já contactou
        contactBar.classList.remove('active');
        const url = ContactEngine.getWhatsAppHref();
        window.open(url, '_blank');
    });

    // Expandir manualmente na barra ou, se ativa, ir diretamente para o WhatsApp!
    contactBar.addEventListener('click', (e) => {
        if (e.target.closest('#wa-trigger')) return; // o ícone já faz o seu próprio envio
        
        if (contactBar.classList.contains('active')) {
            // Clicou nas palavras "FALE CONNOSCO" ou no fundo verde (Estado Expandido)
            isPermanentlyHidden = true; // Desativar popups automáticos
            contactBar.classList.remove('active');
            const url = ContactEngine.getWhatsAppHref();
            window.open(url, '_blank');
        } else {
            // Clicou fortuitamente na barra preta fina para a abrir
            isPermanentlyHidden = true; // Assume o controlo manual, não interferir mais
            contactBar.classList.add('active');
        }
    });
}
