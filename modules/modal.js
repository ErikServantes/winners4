const serviceData = {
    'estampagem': {
        title: 'Estampagem',
        specs: {
            'Capacidade': 'Até 400 toneladas',
            'Série Mínima': '50 unidades'
        },
        materials: ['Latão', 'Ferro', 'Alumínio'],
        mediaType: 'image',
        mediaSrc: 'assets/ESTAMPAGEM.webp'
    },
    'corte-laser': {
        title: 'Corte de Laser',
        specs: {
            'Área Corte CO2': { value: '1600 x 1000 mm', materials: ['Acrílico', 'Madeira', 'Cartão'] },
            'Área Corte Fibra': { value: '1000 x 1500 mm', materials: ['INOX', 'Ferro', 'Alumínio'] }
        },
        materials: [],
        mediaType: 'image',
        mediaSrc: 'assets/CORTE_LASER.webp'
    },
    'gravacao-laser': {
        title: 'Gravação a Laser',
        specs: {
            'Área Gravação CO2': { value: '1600 x 1000 mm', materials: ['Acrílico', 'Madeira'] },
            'Área Gravação FIBRA': { value: '200 x 200 mm', materials: ['Ferro', 'INOX', 'Alumínio', 'Cobre', 'Prata', 'Estanho'] }
        },
        materials: [],
        mediaType: 'image',
        mediaSrc: 'assets/GRAV_LASER.webp'
    },
    'impressao-uv': {
        title: 'Impressão UV',
        specs: {
            'Área de Impressão': '610 x 420 mm',
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
            'Volume de Construção': '223 x 223 x 305 mm',
            'Resolução de Camada': '100 - 300 microns',
            'Tecnologias': 'FDM'
        },
        materials: ['PLA'],
        mediaType: '360',
        mediaFolder: 'assets/AfonsoHenriques/',
        mediaPrefix: 'frame_',
        mediaExtension: '.webp',
        mediaCount: 36
    },
    'modelacao-3d': {
        title: 'Modelação 3D',
        specs: {
            'Softwares': 'Solidworks, Zbrush',
            'Ficheiros de Entrega': '.STEP, .IGES, .STL, .OBJ'
        },
        materials: [],
        mediaType: '3d',
        mediaSrc: 'assets/afonso.glb'
    },
    'maquinacao-cnc': {
        title: 'Maquinação CNC',
        specs: {
            'Eixos': '3 eixos simultâneos',
            'Dimensões (X, Y, Z)': '600 x 400 x 300 mm',
            'Tolerância': '± 0.1 mm',
            'Rotação Máx.': '6.000 RPM'
        },
        materials: ['Aços Ligas', 'Alumínio', 'Latão', 'Plásticos Técnicos (Delrin, Nylon)'],
        mediaType: 'image',
        mediaSrc: 'assets/MAQ_CNC.webp'
    },
    'torneamento': {
        title: 'Torneamento',
        specs: {
            'Diâmetro Máx.': '300 mm',
            'Comprimento Máx.': '300 mm',
            'Tolerância': '± 0.1 mm'
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
            'Banhos Disponíveis': 'Latonagem, Niquelagem e Cobreagem',
            'Tamanho Máx. da Peça': '300 x 300 x 300 mm'
        },
        materials: ['Inox', 'Cobre', 'Ferro', 'Alumínio'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1533387520709-752d83def36d?q=80&w=1600&auto=format&fit=crop'
    },
    'quinagem': {
        title: 'Quinagem',
        specs: {
            'Comprimento Máximo': 'Até 2000 mm',
            'Espessura Máx.': 'Por consulta'
        },
        materials: ['Ferro', 'Inox', 'Alumínio'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop'
    },
    'calandragem': {
        title: 'Calandragem',
        specs: {
            'Comprimento Máx.': 'Até 1200 mm',
            'Espessura': 'Por consulta',
            'Diâmetro Mínimo Interno': '80 mm'
        },
        materials: ['Ferro', 'Inox', 'Alumínio'],
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1620023412580-1a61dc58f11d?q=80&w=1600&auto=format&fit=crop'
    },
    'contacto': {
        title: 'Entre em Contacto',
        address: 'Rua do Barqueiro 754, 4805-016 Barco - GMR',
        address_link: 'https://www.google.com/maps/search/?api=1&query=Rua+do+Barqueiro+754,+4805-016+Barco+-+GMR',
        phone: '253' + ' 576' + ' 251',
        phone_link: 'tel:' + '+351' + '253' + '576' + '251',
        email: 'geral' + '@' + '4winners' + '.' + 'com' + '.' + 'pt',
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
                } else if (data.mediaType === '360') {
                    // Visualizador 360º de Imagens (Sprite/Sequence)
                    mediaHTML = `
                        <div class="modal-media-wrapper viewer-360-container" style="background-color: #000; position: relative; cursor: grab; overflow: hidden; display: flex; justify-content: center; align-items: center;">
                            <img id="viewer-360-img" src="${data.mediaFolder}${data.mediaPrefix}00${data.mediaExtension}" style="width: 100%; height: 100%; object-fit: contain; max-height: 80vh; pointer-events: none;" alt="Visualização 360º">
                            
                            <!-- Overlay UI para indicar interação -->
                            <div class="viewer-360-hint" style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; color: #d4af37; font-size: 0.9rem; pointer-events: none; opacity: 0.8; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
                                <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 5px; font-size: 1.2rem;">360</span>
                                Arraste para rodar
                            </div>
                        </div>
                    `;
                } else if (data.mediaType === '3d' && data.mediaSrc) {
                    // Google Model Viewer nativo
                    mediaHTML = `
                        <div class="modal-media-wrapper" style="background-color: #111; position: relative;">
                            <model-viewer 
                                src="${data.mediaSrc}" 
                                auto-rotate 
                                rotation-per-second="30deg"
                                camera-controls 
                                shadow-intensity="1.5"
                                exposure="1.2"
                                bounds="tight"
                                camera-orbit="0deg 75deg 110%" 
                                min-camera-orbit="auto auto auto"
                                max-camera-orbit="auto auto 200%"
                                min-field-of-view="10deg"
                                max-field-of-view="45deg"
                                style="width: 100%; height: 100%;  --poster-color: transparent; padding: 20px; box-sizing: border-box;">
                            </model-viewer>
                            <div style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; color: #888; font-size: 0.8rem; pointer-events: none;">
                                Desliza para rodar a peça 3D
                            </div>
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
                                <table class="tech-specs-table" style="border-collapse: collapse; width: 100%;">
                                    <tbody>
                                        ${Object.entries(data.specs).map(([key, value]) => {
                                            if (typeof value === 'object' && value !== null) {
                                                return `
                                                    <tr>
                                                        <td class="spec-label" style="padding-bottom: 5px; border-bottom: none;">${key}</td>
                                                        <td class="spec-value" style="padding-bottom: 5px; border-bottom: none;">${value.value}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="padding-top: 0; padding-bottom: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                                            <ul class="modal-materials" style="margin-top: 5px;">
                                                                ${value.materials.map(m => `<li>${m}</li>`).join('')}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                `;
                                            } else {
                                                return `
                                                    <tr>
                                                        <td class="spec-label" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${key}</td>
                                                        <td class="spec-value" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${value}</td>
                                                    </tr>
                                                `;
                                            }
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `;
                    }

                    // Constrói Lista de Materiais Global (Se existir)
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

                // Re-anexa o event listener ao botão de fechar
                modalContent.querySelector('.modal-close').addEventListener('click', closeModal);

                // Mostra o modal
                modal.classList.add('visible');

                // --- INICIALIZAÇÃO DO VISUALIZADOR 360º (SE APLICÁVEL) ---
                if (data.mediaType === '360') {
                    init360Viewer(data);
                }
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

// Lógica de Controlo para Sequências 360º
function init360Viewer(data) {
    const container = document.querySelector('.viewer-360-container');
    const imgElement = document.getElementById('viewer-360-img');
    const hintElement = document.querySelector('.viewer-360-hint');
    if (!container || !imgElement) return;

    // Pré-carregamento das imagens em background para evitar soluços (flickering)
    const images = [];
    let loadedCount = 0;
    
    // Mostra um estado de "A Carregar..." na Dica (Opcional, mas bom para net lenta)
    hintElement.innerHTML = `<span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 5px; font-size: 1.2rem;">sync</span>A Carregar 360º...`;

    for (let i = 0; i < data.mediaCount; i++) {
        const img = new Image();
        // Formata o número com 2 dígitos (ex: 00, 01, ..., 09, 10, ...)
        const formattedIndex = i.toString().padStart(2, '0');
        img.src = `${data.mediaFolder}${data.mediaPrefix}${formattedIndex}${data.mediaExtension}`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === data.mediaCount) {
                // Todas carregadas, restabelece a dica
                hintElement.innerHTML = `<span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 5px; font-size: 1.2rem;">360</span>Arraste para rodar`;
                setupInteraction();
            }
        };
        images.push(img);
    }

    function setupInteraction() {
        let isDragging = false;
        let startX = 0;
        let currentFrameIndex = 0;
        
        // Sensibilidade da rotação: quantos pixeis o dedo/rato tem de mover para avançar 1 frame
        // Como tens 36 frames (1 a cada 10 graus), uma sensibilidade menor faz a peça rodar rápido
        const sensitivity = 15; 

        // Rato (Desktop)
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            container.style.cursor = 'grabbing';
            // Oculta a dica ao começar a interagir para uma vista limpa
            hintElement.style.opacity = '0';
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            handleMove(e.clientX);
        });

        // Toque (Mobile)
        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            hintElement.style.opacity = '0';
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            handleMove(e.touches[0].clientX);
            // Previne o scroll vertical da página enquanto rola o 360
            e.preventDefault(); 
        }, { passive: false });

        // Função de Rotação Matemática Principal
        function handleMove(currentX) {
            const diffX = currentX - startX;

            if (Math.abs(diffX) > sensitivity) {
                // Direção: se mover para a esquerda (negativo), avança frame. 
                // Se mover para a direita (positivo), recua frame.
                const direction = diffX > 0 ? -1 : 1; 

                // Atualiza o índice do frame
                currentFrameIndex = currentFrameIndex + direction;

                // Loop Lógico Infinito 
                // (Se chegar depois da 35 volta à 0. Se recuar da 0 vai para a 35)
                if (currentFrameIndex >= data.mediaCount) {
                    currentFrameIndex = 0;
                } else if (currentFrameIndex < 0) {
                    currentFrameIndex = data.mediaCount - 1;
                }

                // Renderiza na tela a imagem pré-carregada do Array para ser instantâneo
                imgElement.src = images[currentFrameIndex].src;

                // Restabelece o ponto de partida para calcular a próxima alteração
                startX = currentX;
            }
        }
    }
}
