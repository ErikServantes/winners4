
// Função utilitária para obter a semana do ano (1 a 52)
export function getWeekNumber() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}



const serviceData = {
    'estampagem': {
        title: 'Estampagem',
        folder: 'estampagem',
        specs: {
            'Capacidade': 'Até 400 toneladas',
            'Série Mínima': '50 unidades'
        },
        materials: ['Latão', 'Ferro', 'Alumínio']
    },
    'corte-laser': {
        title: 'Corte de Laser',
        folder: 'corte-laser',
        specs: {
            'Área Corte CO2': { value: '1600 x 1000 mm', materials: ['Acrílico', 'Madeira', 'Cartão'] },
            'Área Corte Fibra': { value: '1000 x 1500 mm', materials: ['INOX', 'Ferro', 'Alumínio'] }
        },
        materials: []
    },
    'gravacao-laser': {
        title: 'Gravação a Laser',
        folder: 'gravacao-laser',
        specs: {
            'Área Gravação CO2': { value: '1600 x 1000 mm', materials: ['Acrílico', 'Madeira'] },
            'Área Gravação FIBRA': { value: '200 x 200 mm', materials: ['Ferro', 'INOX', 'Alumínio', 'Cobre', 'Prata', 'Estanho'] }
        },
        materials: []
    },
    'impressao-uv': {
        title: 'Impressão UV',
        folder: 'impressao-uv',
        specs: {
            'Área de Impressão': '610 x 420 mm',
            'Altura Máx. da Peça': '150 mm',
            'Resolução': '1200 x 1200 dpi',
            'Acabamentos': 'Verniz Localizado, Relevo 3D'
        },
        materials: ['Metal', 'Acrílico', 'Madeira', 'Plástico', 'Vidro / Cristal']
    },
    'impressao-3d': {
        title: 'Impressão 3D',
        folder: 'impressao-3d',
        specs: {
            'Volume de Construção': '223 x 223 x 305 mm',
            'Resolução de Camada': '100 - 300 microns',
            'Tecnologias': 'FDM'
        },
        materials: ['PLA']
    },
    'modelacao-3d': {
        title: 'Modelação 3D',
        folder: 'modelacao-3d',
        specs: {
            'Softwares': 'Solidworks, Zbrush',
            'Ficheiros de Entrega': '.STEP, .IGES, .STL, .OBJ'
        },
        materials: []
    },
    'maquinacao-cnc': {
        title: 'Maquinação CNC',
        folder: 'maquinacao-cnc',
        specs: {
            'Eixos': '3 eixos simultâneos',
            'Dimensões (X, Y, Z)': '600 x 400 x 300 mm',
            'Tolerância': '± 0.1 mm',
            'Rotação Máx.': '6.000 RPM'
        },
        materials: ['Aços Ligas', 'Alumínio', 'Latão', 'Plásticos Técnicos (Delrin, Nylon)']
    },
    'torneamento': {
        title: 'Torneamento',
        folder: 'torneamento',
        specs: {
            'Diâmetro Máx.': '300 mm',
            'Comprimento Máx.': '300 mm',
            'Tolerância': '± 0.1 mm'
        },
        materials: ['Aço', 'Inox', 'Alumínio', 'Cobre', 'Latão']
    },
    'repuxamento': {
        title: 'Repuxamento',
        folder: 'repuxamento',
        specs: {
            'Diâmetro Máx. da Chapa': '1200 mm',
            'Espessura Máx. (Aço)': '3 mm',
            'Espessura Máx. (Alumínio)': '5 mm'
        },
        materials: ['Aço Carbono', 'Inox', 'Alumínio', 'Cobre']
    },
    'galvanizacao': {
        title: 'Galvanização',
        folder: 'galvanizacao',
        specs: {
            'Banhos Disponíveis': 'Latonagem, Niquelagem e Cobreagem',
            'Tamanho Máx. da Peça': '300 x 300 x 300 mm'
        },
        materials: ['Inox', 'Cobre', 'Ferro', 'Alumínio']
    },
    'quinagem': {
        title: 'Quinagem',
        folder: 'quinagem',
        specs: {
            'Comprimento Máximo': 'Até 2000 mm',
            'Espessura Máx.': 'Por consulta'
        },
        materials: ['Ferro', 'Inox', 'Alumínio']
    },
    'calandragem': {
        title: 'Calandragem',
        folder: 'calandragem',
        specs: {
            'Comprimento Máx.': 'Até 1200 mm',
            'Espessura': 'Por consulta',
            'Diâmetro Mínimo Interno': '80 mm'
        },
        materials: ['Ferro', 'Inox', 'Alumínio']
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

// --- NOVO SISTEMA DE INVENTÁRIO (BASEADO EM JSON) ---

// Guarda o inventário carregado na memória para acesso instantâneo
let mediaInventory = null;

/**
 * Carrega o ficheiro inventory.json e guarda-o na variável mediaInventory.
 * Esta função é chamada uma única vez quando o site é inicializado.
 */
async function loadInventory() {
    if (mediaInventory) return mediaInventory; // Se já foi carregado, não faz nada
    
    try {
        // Adiciona um timestamp para evitar problemas de cache do browser ao atualizar o inventário
        const response = await fetch('./assets/inventory.json?v=' + new Date().getTime());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        mediaInventory = await response.json();
        console.log('✅ Inventário de media carregado com sucesso!');
        return mediaInventory;
    } catch (error) {
        console.error('❌ Falha ao carregar o inventário de media (inventory.json). O site pode não mostrar media dinâmica.', error);
        mediaInventory = {}; // Evita que futuras tentativas falhem
        return mediaInventory;
    }
}

/**
 * Obtém a lista de media para um serviço específico a partir do inventário em memória.
 * @param {string} serviceName - O nome do serviço (ex: 'impressao-3d').
 * @returns {Array} - A lista de ficheiros de media para esse serviço.
 */
function getServiceMedia(serviceName) {
    return mediaInventory?.[serviceName] || [];
}

// Fallback absoluto para obter a imagem de capa (00.webp)
export function getBaseMedia(folderName) {
    return { type: 'image', src: `assets/${folderName}/00.webp` };
}

// -------------------------------------------------------------


export async function initializeModal() {
    // Carrega o inventário assim que o módulo é inicializado
    await loadInventory();

    const modal = document.getElementById('details-modal');
    if (!modal) return;

    const detailBtns = document.querySelectorAll('.details-btn');

    detailBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if (btn.tagName === 'A') {
                e.preventDefault();
            }

            const service = btn.dataset.service;
            const data = serviceData[service];

            if (data) {
                // Se for um serviço técnico (não contacto), mostramos logo um esqueleto de carregamento
                let mediaHTML = '';
                if (service !== 'contacto') {
                     mediaHTML = `
                        <div class="modal-media-wrapper" id="dynamic-media-container" style="display: flex; justify-content: center; align-items: center; background: #050505;">
                            <span class="material-symbols-outlined" style="font-size: 3rem; animation: spin 2s linear infinite; color: #d4af37;">hourglass_empty</span>
                        </div>
                    `;
                }

                // --- GERA O HTML INTERNO DO MODAL (ESTÁTICO PRIMEIRO) ---
                let contentHTML = '';

                if (service === 'contacto') {
                    contentHTML = `
                        <div class="modal-text-section full-width">
                            <h2 id="modal-title">${data.title}</h2>
                            <div id="modal-body">
                                <div class="contact-modal-info">
                                    <div class="contact-item"><strong>Morada:</strong><a href="${data.address_link}" target="_blank">${data.address}</a></div>
                                    <div class="contact-item"><strong>Email:</strong><a href="mailto:${data.email}">${data.email}</a></div>
                                    <div class="contact-item"><strong>Telefone:</strong><a href="${data.phone_link}">${data.phone}</a></div>
                                    <div class="contact-item"><strong>Horário:</strong><div class="schedule">${data.schedule.map(line => `<span>${line}</span>`).join('')}</div></div>
                                </div>
                                <a href="${data.phone_link}" class="details-btn cta-btn">Ligar Agora</a>
                            </div>
                        </div>
                    `;
                } else {
                    let specsHTML = '';
                    if (data.specs) {
                        specsHTML = `
                            <div class="tech-specs-container">
                                <h3 class="section-subtitle">Especificações Técnicas</h3>
                                <table class="tech-specs-table" style="border-collapse: collapse; width: 100%;">
                                    <tbody>
                                        ${Object.entries(data.specs).map(([key, value]) => {
                                            if (typeof value === 'object' && value !== null) {
                                                return `<tr><td class="spec-label">${key}</td><td class="spec-value">${value.value}</td></tr><tr><td colspan="2" style="padding: 0;"><ul class="modal-materials" style="margin: 5px 0 10px 15px; justify-content: flex-end;">${value.materials.map(m => `<li>${m}</li>`).join('')}</ul></td></tr>`;
                                            } else {
                                                return `<tr><td class="spec-label">${key}</td><td class="spec-value">${value}</td></tr>`;
                                            }
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `;
                    }

                    let materialsHTML = '';
                    if (data.materials && data.materials.length > 0) {
                        materialsHTML = `
                            <div class="materials-container">
                                <h3 class="section-subtitle">Materiais Suportados</h3>
                                <ul class="modal-materials">${data.materials.map(material => `<li>${material}</li>`).join('')}</ul>
                            </div>
                        `;
                    }

                    const textClass = mediaHTML ? 'modal-text-section split-width' : 'modal-text-section full-width';
                    contentHTML = `
                        ${mediaHTML}
                        <div class="${textClass}">
                            <h2 id="modal-title">${data.title}</h2>
                            <div id="modal-body">${specsHTML}${materialsHTML}</div>
                        </div>
                    `;
                }

                const modalContent = modal.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <button class="modal-close">&times;</button>
                    <div class="modal-layout-container">${contentHTML}</div>
                `;
                modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
                
                openModalUI();
                
                if (service !== 'contacto') {
                    // --- ALTERAÇÃO PRINCIPAL AQUI ---
                    const availableMedia = getServiceMedia(service); // Usa o inventário
                    let discoveredMedia = null;

                    if (availableMedia.length > 0) {
                        const week = getWeekNumber();
                        const rotationIndex = (week - 1) % availableMedia.length;
                        discoveredMedia = availableMedia[rotationIndex];
                        console.log(`📅 [ROTAÇÃO] Semana ${week}. A escolher do INVENTÁRIO o ficheiro índice ${rotationIndex}:`, discoveredMedia);
                    } else {
                        console.log(`⚠️ [FALLBACK] Nenhum ficheiro extra no INVENTÁRIO para '${data.folder}'. A mostrar o 00.webp de segurança.`);
                        discoveredMedia = getBaseMedia(data.folder);
                    }

                    const container = document.getElementById('dynamic-media-container');
                    if (container && discoveredMedia) {
                        if (discoveredMedia.type === 'image') {
                            container.innerHTML = `<img src="${discoveredMedia.src}" alt="${data.title}" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">`;
                        } else if (discoveredMedia.type === 'video') {
                            container.innerHTML = `<video autoplay loop muted playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"><source src="${discoveredMedia.src}" type="video/mp4"></video>`;
                        } else if (discoveredMedia.type === '360') {
                            container.classList.add('viewer-360-container');
                            container.style.cursor = 'grab';
                            container.style.userSelect = 'none';
                            container.innerHTML = `<img id="viewer-360-img" src="${discoveredMedia.folder}${discoveredMedia.prefix}00${discoveredMedia.extension}" style="width: 100%; height: 100%; object-fit: contain; max-height: 80vh; pointer-events: none;" alt="Visualização 360º"><div class="viewer-360-hint"></div>`;
                            init360Viewer(discoveredMedia);
                        }
                    }
                }
            }
        });
    });

    function openModalUI() {
        modal.classList.add('visible');
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('visible');
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        const viewerContainer = document.querySelector('.viewer-360-container');
        if (viewerContainer && typeof viewerContainer.cleanup360 === 'function') {
            viewerContainer.cleanup360();
        }
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function init360Viewer(data) {
    const container = document.querySelector('.viewer-360-container');
    const imgElement = document.getElementById('viewer-360-img');
    const hintElement = container.querySelector('.viewer-360-hint');
    
    container.cleanup360 = null;
    if (!container || !imgElement) return;

    const images = [];
    let loadedCount = 0;
    
    hintElement.innerHTML = `<span class="material-symbols-outlined">sync</span>A Carregar 360º...`;

    for (let i = 0; i < data.count; i++) {
        const img = new Image();
        const formattedIndex = i.toString().padStart(2, '0');
        img.src = `${data.folder}${data.prefix}${formattedIndex}${data.extension}`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === data.count) {
                hintElement.innerHTML = `<span class="material-symbols-outlined">360</span>Arraste para rodar`;
                setupInteraction();
            }
        };
        images.push(img);
    }

    function setupInteraction() {
        let isDragging = false;
        let startX = 0;
        let currentFrameIndex = 0;
        
        let autoRotateInterval, autoRotateTimeout;
        let isAutoRotating = true;

        function startAutoRotate() {
            isAutoRotating = true;
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(() => {
                if (isAutoRotating && !isDragging) {
                    currentFrameIndex = (currentFrameIndex + 1) % data.count;
                    imgElement.src = images[currentFrameIndex].src;
                }
            }, 60);
        }

        function stopAutoRotate() {
            isAutoRotating = false;
            clearInterval(autoRotateInterval);
            clearTimeout(autoRotateTimeout);
        }
        
        function resumeAutoRotateDelay() {
            clearTimeout(autoRotateTimeout);
            autoRotateTimeout = setTimeout(startAutoRotate, 1000);
        }

        startAutoRotate();
        container.cleanup360 = stopAutoRotate;
        
        const sensitivity = 15;

        const handleMove = (currentX) => {
            if (!isDragging) return;
            const diffX = currentX - startX;
            if (Math.abs(diffX) > sensitivity) {
                const direction = diffX > 0 ? -1 : 1;
                currentFrameIndex = (currentFrameIndex + direction + data.count) % data.count;
                imgElement.src = images[currentFrameIndex].src;
                startX = currentX;
            }
        };

        const startDrag = (clientX) => {
            isDragging = true;
            startX = clientX;
            container.style.cursor = 'grabbing';
            hintElement.style.opacity = '0';
            stopAutoRotate();
        };

        const endDrag = () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
                resumeAutoRotateDelay();
            }
        };

        container.addEventListener('mousedown', (e) => startDrag(e.clientX));
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('mousemove', (e) => handleMove(e.clientX));
        document.addEventListener('mouseleave', endDrag);

        container.addEventListener('touchstart', (e) => e.touches.length && startDrag(e.touches[0].clientX), { passive: true });
        container.addEventListener('touchend', endDrag);
        container.addEventListener('touchcancel', endDrag);
        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            e.touches.length && handleMove(e.touches[0].clientX);
        }, { passive: false });
    }
}
