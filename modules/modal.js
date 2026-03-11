const serviceData = {
    'estampagem': {
        title: 'Estampagem',
        description: 'A estampagem é um processo de conformação de chapas metálicas, onde a força de uma prensa molda o material para criar peças com precisão e repetibilidade. Ideal para produção em massa de componentes complexos.',
        materials: ['Latão', 'Ferro', 'Alumínio']
    },
    'corte-laser': {
        title: 'Corte de Laser',
        description: 'Utilizando um feixe de laser de alta potência, este processo corta materiais com uma precisão excecional, permitindo a criação de geometrias complexas e acabamentos limpos sem contacto físico com a peça.',
        materials: ['Metal', 'Acrílico', 'Madeira'],
        mediaType: 'image',
        mediaSrc: 'assets/CORTE_LASER.webp'
    },
    'gravacao-laser': {
        title: 'Gravação a Laser',
        description: 'A gravação a laser remove seletivamente a superfície de um material para criar marcas permanentes, como logótipos, números de série ou designs decorativos, com um detalhe impressionante.',
        materials: ['Metal', 'Acrílico', 'Madeira', 'Vidro / Cristal'],
        mediaType: 'image',
        mediaSrc: 'assets/GRAV_LASER.webp'
    },
    'impressao-uv': {
        title: 'Impressão UV',
        description: 'A impressão UV utiliza tintas especiais que secam instantaneamente sob luz ultravioleta. Este processo permite imprimir designs vibrantes e duradouros numa vasta gama de superfícies rígidas e semi-rígidas.',
        materials: ['Metal', 'Acrílico', 'Madeira', 'Plástico', 'Vidro / Cristal']
    },
    'impressao-3d': {
        title: 'Impressão 3D',
        description: 'A impressão 3D, ou manufatura aditiva, constrói objetos tridimensionais camada por camada a partir de um modelo digital. É perfeita para prototipagem rápida, peças personalizadas e produção de baixo volume.',
        materials: ['PLA (Ácido Polilático)'],
        mediaType: 'image',
        mediaSrc: 'assets/IMP_3D.webp'
    },
    'modelacao-3d': {
        title: 'Modelação 3D',
        description: 'A modelação 3D é o processo de criar uma representação matemática de um objeto tridimensional usando software especializado. É o primeiro passo essencial para a impressão 3D, maquinação CNC e visualizações de produtos.',
        materials: [],
        mediaType: 'image',
        mediaSrc: 'assets/MOD_3D.webp'
    },
    'maquinacao-cnc': {
        title: 'Maquinação CNC',
        description: 'A Maquinação por Controlo Numérico Computadorizado (CNC) utiliza ferramentas de corte controladas por computador para remover material de um bloco sólido, esculpindo peças com tolerâncias muito apertadas.',
        materials: ['Metal', 'Acrílico', 'Madeira']
    },
    'torneamento': {
        title: 'Torneamento',
        description: 'O torneamento é um processo de maquinação que roda uma peça de trabalho enquanto uma ferramenta de corte remove material para criar formas cilíndricas. É ideal para eixos, pinos e outras peças de revolução.',
        materials: ['Metal', 'Acrílico', 'Madeira']
    },
    'repuxamento': {
        title: 'Repuxamento',
        description: 'O repuxamento é uma técnica de conformação de metal que molda uma chapa circular sobre um mandril rotativo. Permite criar peças ocas, simétricas e sem costuras, como taças, cones e hemisférios.',
        materials: ['Metal']
    },
    'galvanizacao': {
        title: 'Galvanização',
        description: 'A galvanização é um processo eletroquímico que reveste uma peça metálica com uma fina camada de outro metal. Serve para melhorar a aparência, a resistência à corrosão e a condutividade.',
        materials: ['Latonagem', 'Niquelagem', 'Cobreagem']
    },

    'quinagem': {
        title: 'Quinagem',
        description: 'A quinagem é um processo de dobragem de chapas de metal utilizando prensas dobradeiras (quinadoras). Permite criar ângulos e formas complexas com alta precisão e repetibilidade.',
        materials: ['Ferro', 'Inox', 'Alumínio']
    },
    'calandragem': {
        title: 'Calandragem',
        description: 'A calandragem é um processo contínuo de curvatura de chapas metálicas que passam por rolos. É utilizado para formar cilindros, cones e outras formas circulares a partir de chapas planas.',
        materials: ['Ferro', 'Inox', 'Alumínio']
    },
    'contacto': {
        title: 'Entre em Contacto',
        address: 'Rua do Barqueiro 754, 4805-016 Barco',
        address_link: 'https://www.google.com/maps/search/?api=1&query=Rua+do+Barqueiro+754,+4805-016+Barco',
        phone: '253 576 251',
        phone_link: 'tel:+351253576251',
        email: 'geral@4winners.pt',
        schedule: [
            'Segunda a Sexta: 08:30 – 18:30',
            'Sábado: 09:00 – 12:30',
            'Domingo: Encerrado'
        ]
    }
};

export function initializeModal() {
    const modal = document.getElementById('details-modal');
    if (!modal) return;

    // A estrutura do modal vai mudar. Em vez de usar variáveis soltas, injetamos tudo dinamicamente.
    const detailBtns = document.querySelectorAll('.details-btn');

    detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.tagName === 'A') {
                e.preventDefault();
            }

            const service = btn.dataset.service;
            const data = serviceData[service];

            if (data) {
                // Prepara a Divisão de Media (Imagem/Vídeo/3D)
                let mediaHTML = '';
                if (data.mediaType === 'image' && data.mediaSrc) {
                    mediaHTML = `
                        <div class="modal-media-wrapper">
                            <img src="${data.mediaSrc}" alt="${data.title}" loading="lazy">
                        </div>
                    `;
                } else if (data.mediaType === 'video' && data.mediaSrc) {
                    mediaHTML = `
                        <div class="modal-media-wrapper">
                            <video autoplay loop muted playsinline>
                                <source src="${data.mediaSrc}" type="video/mp4">
                            </video>
                        </div>
                    `;
                } else if (data.mediaType === '3d' && data.mediaSrc) {
                    // Prepara o terreno para o <model-viewer> no futuro
                    mediaHTML = `
                        <div class="modal-media-wrapper">
                            <model-viewer src="${data.mediaSrc}" auto-rotate camera-controls shadow-intensity="1"></model-viewer>
                        </div>
                    `;
                }
                // Se não houver media, o HTML fica vazio e o CSS cuida de alargar a secção de texto

                // --- GERA O HTML INTERNO DO MODAL (NOVO SPLIT LAYOUT) ---
                let contentHTML = '';

                if (service === 'contacto') {
                    // Layout Especial para Contacto (Sem Media)
                    contentHTML = `
                        <div class="modal-text-section full-width">
                            <h2 id="modal-title">${data.title}</h2>
                            <div id="modal-body">
                                <div class="contact-modal-info">
                                    <div class="contact-item">
                                        <strong>Morada:</strong>
                                        <a href="${data.address_link}" target="_blank">${data.address}</a>
                                    </div>
                                    <div class="contact-item">
                                        <strong>Email:</strong>
                                        <a href="mailto:${data.email}">${data.email}</a>
                                    </div>
                                    <div class="contact-item">
                                        <strong>Telefone:</strong>
                                        <a href="${data.phone_link}">${data.phone}</a>
                                    </div>
                                    <div class="contact-item">
                                        <strong>Horário:</strong>
                                        <div class="schedule">
                                            ${data.schedule.map(line => `<span>${line}</span>`).join('')}
                                        </div>
                                    </div>
                                </div>
                                <a href="${data.phone_link}" class="details-btn cta-btn">Ligar Agora</a>
                            </div>
                        </div>
                    `;
                } else {
                    // Layout Genérico para Serviços (Com ou Sem Media)
                    let materialsHTML = '';
                    if (data.materials && data.materials.length > 0) {
                        materialsHTML = `
                            <h3>Materiais Trabalhados</h3>
                            <ul class="modal-materials">
                                ${data.materials.map(material => `<li>${material}</li>`).join('')}
                            </ul>
                        `;
                    }

                    // Se houver media, usamos o CSS para dividir o ecrã. Caso contrário, a classe full-width expande o texto
                    const textClass = mediaHTML ? 'modal-text-section split-width' : 'modal-text-section full-width';

                    contentHTML = `
                        ${mediaHTML}
                        <div class="${textClass}">
                            <h2 id="modal-title">${data.title}</h2>
                            <div id="modal-body">
                                <p class="modal-description">${data.description}</p>
                                ${materialsHTML}
                            </div>
                        </div>
                    `;
                }

                // Injeta tudo no modal-content (apagando o antigo e mantendo apenas o botão de fechar)
                const modalContent = modal.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <button class="modal-close">&times;</button>
                    <div class="modal-layout-container">
                        ${contentHTML}
                    </div>
                `;

                // Re-anexa o event listener ao botão de fechar (pois foi recriado)
                modalContent.querySelector('.modal-close').addEventListener('click', closeModal);

                // Mostra o modal
                modal.classList.add('visible');
            }
        });
    });

    function closeModal() {
        modal.classList.remove('visible');
    }

    // Fecha o modal ao clicar fora dele
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}