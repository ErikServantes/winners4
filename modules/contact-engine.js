/**
 * CONTACT ENGINE V1.0 - Blindagem Anti-Scraper
 * Protege emails e telefones contra bots de recolha de dados.
 */

// Dados encofidados em Base64 para total ofuscação no código fonte
const _vault = {
    e: 'Z2VyYWxANGlubmVycy5jb20ucHQ=',
    p1: 'MzUxMjUzNTc2MjUx',
    p2: 'MzUxOTM1MTg3NDk5',
    m: 'T2zDoSwgZ29zdGFyaWEgZGUgc2FiZXIgbWFpcyBzb2JyZSBvcyB2b3Nzb3Mgc2VydmnDp29zLg=='
};

function _decode(str) {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        return atob(str);
    }
}

export const ContactEngine = {
    getEmail() { return _decode(_vault.e); },
    getPhone1() { return _decode(_vault.p1); }, // Fixo
    getPhone2() { return _decode(_vault.p2); }, // Mobile
    
    getMailHref() { return `mailto:${this.getEmail()}`; },
    getPhoneHref() { return `tel:+${this.getPhone1()}`; },
    getWhatsAppHref() { 
        return `https://wa.me/${this.getPhone2()}?text=${encodeURIComponent(_decode(_vault.m))}`; 
    },

    // Função para formatar números para visualização humana
    formatPhone(phone) {
        if (phone.startsWith('351')) phone = phone.substring(3);
        if (phone.startsWith('2')) {
            return `+351 ${phone.substring(0,3)} ${phone.substring(3,6)} ${phone.substring(6)}`;
        }
        return `+351 ${phone.substring(0,3)} ${phone.substring(3,6)} ${phone.substring(6)}`;
    }
};
