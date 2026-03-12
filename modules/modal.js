const serviceData = {
    'estampagem': {
        title: 'Estampagem',
        specs: {
            'Capacidade Prensa': 'Até 400 Toneladas',
            'Série Mínima': '500 unidades',
            'Tolerância': '± 0.1 mm'
        },
        materials: ['Latão', 'Ferro', 'Alumínio'],
        mediaType: 'image',
        mediaSrc: 'assets/ESTAMPAGEM.webp'
    },
    'corte-laser': {
        title: 'Corte de Laser',
        specs: {
            'Área de Trabalho Útil': '3000 x 1500 mm',
            'Espessura Máx. (Aço Carbono)': '20 mm',
            'Espessura Máx. (Inox)': '15 mm',
            'Espessura Máx. (Alumínio)': '10 mm',
            'Tolerância': '± 0.05 mm'
        },
        materials: ['Metal', 'Acrílico', 'Madeira'],
        mediaType: 'image',
        mediaSrc: 'assets/CORTE_LASER.webp'
    },
    'gravacao-laser': {
        title: 'Gravação a Laser',
        specs: {
            'Área de Marcação': '150 x 150 mm (até 600x400mm com eixo móvel)',
            'Profundidade': 'Micro-gravação até 0.5 mm',
            'Resolução': 'Alta (até 1000 dpi)'
        },
        materials: ['Metal', 'Acrílico', 'Madeira', 'Vidro / Cristal'],
        mediaType: 'image',
        mediaSrc: 'assets/GRAV_LASER.webp'
    },
    'impressao-uv': {
        title: 'Impressão UV',
        specs: {
            'Área de Impressão': '900 x 600 mm',
            'Altura Máx. da Peça': '150 mm',
            'Resolução': '1200 x 1200 dpi',
            'Acabamentos': 'Verniz Localizado, Relevo 3D'
        },
        materials: ['Metal', 'Acrílico', 'Madeira', 'Plástico', 'Vidro / Cristal'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1614316335967-1fa7663a83f9?q=80&w=1600&auto=format&fit=crop'
    },
    'impressao-3d': {
        title: 'Impressão 3D',
        specs: {
            'Volume de Construção': '300 x 300 x 400 mm',
            'Resolução de Camada': '50 a 300 microns',
            'Tecnologias': 'FDM, SLA (Resina)'
        },
        materials: ['PLA', 'ABS', 'PETG', 'TPU (Flexível)', 'Resinas Standard e Técnicas'],
        mediaType: 'image',
        mediaSrc: 'assets/IMP_3D.webp'
    },
    'modelacao-3d': {
        title: 'Modelação 3D',
        specs: {
            'Softwares Utilizados': 'SolidWorks, AutoCAD, Fusion 360',
            'Ficheiros de Entrega': '.STEP, .IGES, .STL, .OBJ',
            'Engenharia Inversa': 'Sim (Digitalização 3D)'
        },
        materials: ['Software/Digital'],
        mediaType: 'image',
        mediaSrc: 'assets/MOD_3D.webp'
    },
    'maquinacao-cnc': {
        title: 'Maquinação CNC',
        specs: {
            'Eixos': '3, 4 e 5 eixos simultâneos',
            'Curso (X, Y, Z)': '1000 x 500 x 500 mm',
            'Tolerância': '± 0.01 mm',
            'Rotação Máx.': '12.000 RPM'
        },
        materials: ['Aços Ligas', 'Alumínio', 'Latão', 'Plásticos Técnicos (Delrin, Nylon)'],
        mediaType: 'image',
        mediaSrc: 'assets/MAQ_CNC.webp'
    },
    'torneamento': {
        title: 'Torneamento',
        specs: {
            'Diâmetro Máx. Torneável': '300 mm',
            'Comprimento Máx.': '1000 mm',
            'Tolerância': '± 0.01 mm',
            'Ferramenta Motorizada': 'Sim (Torneamento/Fresagem combinados)'
        },
        materials: ['Aço', 'Inox', 'Alumínio', 'Cobre', 'Latão'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1598506509613-2dfc1eb60ee0?q=80&w=1600&auto=format&fit=crop'
    },
    'repuxamento': {
        title: 'Repuxamento',
        specs: {
            'Diâmetro Máx. da Chapa': '1200 mm',
            'Espessura Máx. (Aço)': '3 mm',
            'Espessura Máx. (Alumínio)': '5 mm'
        },
        materials: ['Aço Carbono', 'Inox', 'Alumínio', 'Cobre'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1600&auto=format&fit=crop'
    },
    'galvanizacao': {
        title: 'Galvanização',
        specs: {
            'Banhos Disponíveis': 'Rotativos e Estáticos',
            'Tamanho Máx. da Peça': '2000 x 1000 x 500 mm',
            'Certificação': 'RoHS Compliant'
        },
        materials: ['Latonagem', 'Niquelagem', 'Cobreagem', 'Prateação', 'Douradura'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1533387520709-752d83def36d?q=80&w=1600&auto=format&fit=crop'
    },
    'quinagem': {
        title: 'Quinagem',
        specs: {
            'Força da Quinadora': 'Até 150 Toneladas',
            'Comprimento de Quinagem': 'Até 3000 mm',
            'Espessura Máx. (Aço)': '10 mm'
        },
        materials: ['Ferro', 'Inox', 'Alumínio'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop'
    },
    'calandragem': {
        title: 'Calandragem',
        specs: {
            'Comprimento Máx. dos Rolos': '2500 mm',
            'Espessura Máx. da Chapa': '12 mm',
            'Diâmetro Mínimo': 'Dependente da espessura da chapa'
        },
        materials: ['Ferro', 'Inox', 'Alumínio'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1620023412580-1a61dc58f11d?q=80&w=1600&auto=format&fit=crop'
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
                    // Layout Genérico para Serviços (Ficha Técnica B2B)
                    
                    // Constrói Tabela de Especificações Técnicas (Specs)
                    let specsHTML = '';
                    if (data.specs) {
                        specsHTML = `
                            <div class="tech-specs-container">
                                <h3 class="section-subtitle">Especificações Técnicas</h3>
                                <table class="tech-specs-table">
                                    <tbody>
                                        ${Object.entries(data.specs).map(([key, value]) => `
                                            <tr>
                                                <td class="spec-label">${key}</td>
                                                <td class="spec-value">${value}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `;
                    }

                    // Constrói Lista de Materiais (Tags)
                    let materialsHTML = '';
                    if (data.materials && data.materials.length > 0) {
                        materialsHTML = `
                            <div class="materials-container">
                                <h3 class="section-subtitle">Materiais Suportados</h3>
                                <ul class="modal-materials">
                                    ${data.materials.map(material => `<li>${material}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }

                    // Se houver media, dividimos. Se não, tela cheia.
                    const textClass = mediaHTML ? 'modal-text-section split-width' : 'modal-text-section full-width';

                    contentHTML = `
                        ${mediaHTML}
                        <div class="${textClass}">
                            <h2 id="modal-title">${data.title}</h2>
                            <div id="modal-body">
                                ${specsHTML}
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