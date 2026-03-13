
// Função utilitária para obter a semana do ano (1 a 52)
function getWeekNumber() {
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


// Cache global para não fazermos scan à mesma pasta duas vezes (Crucial para performance e para o Portefólio futuro)
window.mediaCache = window.mediaCache || {};

// Função auxiliar para testar se um índice específico existe (tenta vídeo, imagem e 360)
async function testIndexExists(folderName, index) {
    const idxStr = index.toString().padStart(2, '0');
    const basePath = `assets/${folderName}/${idxStr}`;
    
    if (await fileExists(`${basePath}.mp4`)) return { index: index, type: 'video', src: `${basePath}.mp4` };
    if (await fileExists(`${basePath}.webp`)) return { index: index, type: 'image', src: `${basePath}.webp` };
    if (await fileExists(`${basePath}/frame_00.webp`)) return { 
        index: index, type: '360', folder: `${basePath}/`, prefix: 'frame_', extension: '.webp', count: 36 
    };
    return null;
}

// O Scanner Inteligente Otimizado (Binary Search / Procura Binária)
// Assume que não existem "buracos" (ex: se há 01 e 03, obriga a haver 02)
async function scanServiceMedia(folderName) {
    if (window.mediaCache[folderName]) {
        console.log(`📦 [CACHE] Servico '${folderName}' já foi pesquisado. Encontrados: ${window.mediaCache[folderName].length} ficheiros.`);
        return window.mediaCache[folderName];
    }

    console.log(`🔍 [SCAN BINÁRIO] A iniciar varrimento otimizado na pasta 'assets/${folderName}/'...`);
    
    let low = 1;
    let high = 27; // O nosso limite teórico máximo
    let highestFound = 0;
    const foundItems = []; // Vamos guardar os resultados que encontramos pelo caminho para não re-testar

    // Procura Binária para encontrar o limite superior (o último ficheiro válido)
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const result = await testIndexExists(folderName, mid);
        
        if (result !== null) {
            // Sucesso! Significa que este e (assumimos) todos para trás existem.
            highestFound = mid;
            foundItems[mid] = result; // Guarda em cache local
            low = mid + 1; // Vamos tentar encontrar um número ainda maior
        } else {
            // Falhou! O limite máximo está para trás.
            high = mid - 1;
        }
    }

    // Agora que sabemos o limite exato (highestFound), construímos o array final.
    // Como a Procura Binária saltou alguns números pelo caminho, vamos preencher os buracos (1 até highestFound)
    // Fazemos isto em paralelo para ser super rápido, apenas para os que faltam!
    const availableMedia = [];
    const missingPromises = [];
    
    for (let i = 1; i <= highestFound; i++) {
        if (foundItems[i]) {
            availableMedia.push(foundItems[i]);
        } else {
            // Lança a verificação dos que saltámos
            missingPromises.push((async () => {
                const res = await testIndexExists(folderName, i);
                if (res !== null) availableMedia.push(res);
            })());
        }
    }
    
    await Promise.all(missingPromises);
    
    // Ordena de 1 até ao fim
    availableMedia.sort((a, b) => a.index - b.index);

    console.log(`✅ [SCAN COMPLETO] '${folderName}' tem ${availableMedia.length} ficheiros reais.`);
    
    // Guarda na memória do browser para o Modal e para a Galeria Portefólio
    window.mediaCache[folderName] = availableMedia;
    return availableMedia;
}

// Fallback absoluto
function getBaseMedia(folderName) {
    return { type: 'image', src: `assets/${folderName}/00.webp` };
}

// Pequena função utilitária para fazer PING a um ficheiro no servidor
function fileExists(url) {
    return new Promise(resolve => {
        const req = new XMLHttpRequest();
        req.open('HEAD', url, true);
        req.onload = function() {
            if (req.status >= 200 && req.status < 300) {
                resolve(true);
            } else {
                resolve(false);
            }
        };
        req.onerror = function() {
            resolve(false);
        };
        req.send();
    });
}


export function initializeModal() {
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

                
                // Mostra o modal imediatamente (Abre as portas)
                modal.classList.add('visible');
                
                // Pára o Lenis para evitar scroll duplo enquanto o modal está aberto
                if (window.lenis) {
                    window.lenis.stop();
                }

                                // --- AGORA PROCURA A MEDIA DA SEMANA (AUTO-DISCOVERY & PERFECT ROTATION) ---
                if (service !== 'contacto') {
                                        // 1. O Scanner varre a pasta e descobre EXATAMENTE quantas imagens tens lá.
                    const availableMedia = await scanServiceMedia(data.folder);
                    let discoveredMedia = null;

                    if (availableMedia.length > 0) {
                        // 2. Rotação Perfeita (Matemática Pura):
                        const week = getWeekNumber();
                        const rotationIndex = (week - 1) % availableMedia.length;
                        discoveredMedia = availableMedia[rotationIndex];
                        console.log(`📅 [ROTAÇÃO] Semana ${week}. A escolher ficheiro índice ${rotationIndex} (de ${availableMedia.length} totais): ${discoveredMedia.src || discoveredMedia.folder}`);
                    } else {
                        // 3. Se a fábrica ainda não atirou nada para a pasta 01 a 27, cai no seguro 00.
                        console.log(`⚠️ [FALLBACK] Nenhum ficheiro extra no servico '${data.folder}'. A mostrar o 00.webp de segurança.`);
                        discoveredMedia = getBaseMedia(data.folder);
                    }

                    const container = document.getElementById('dynamic-media-container');
                    
                    if (container && discoveredMedia) {
                        if (discoveredMedia.type === 'image') {
                            container.innerHTML = `<img src="${discoveredMedia.src}" alt="${data.title}" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">`;
                        } else if (discoveredMedia.type === 'video') {
                            container.innerHTML = `
                                <video autoplay loop muted playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
                                    <source src="${discoveredMedia.src}" type="video/mp4">
                                </video>
                            `;
                        } else if (discoveredMedia.type === '360') {
                            container.classList.add('viewer-360-container');
                            container.style.cursor = 'grab';
                            container.style.userSelect = 'none';
                            container.style.webkitUserSelect = 'none';
                            container.innerHTML = `
                                <img id="viewer-360-img" src="${discoveredMedia.folder}${discoveredMedia.prefix}00${discoveredMedia.extension}" style="width: 100%; height: 100%; object-fit: contain; max-height: 80vh; pointer-events: none;" alt="Visualização 360º">
                                
                                <div class="viewer-360-hint" style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; color: #d4af37; font-size: 0.9rem; pointer-events: none; opacity: 0.8; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
                                    <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 5px; font-size: 1.2rem;">360</span>
                                    A carregar interação...
                                </div>
                            `;
                            // Iniciar a lógica pesada do 360
                            init360Viewer(discoveredMedia);
                        }
                    }
                }
            }
        });
    });

    function closeModal() {

        modal.classList.remove('visible');
        
        // Retoma o scroll da página
        if (window.lenis) {
            window.lenis.start();
        }
        
        // Se houver um 360 viewer ativo, para o seu timer/animação de fundo
        const viewerContainer = document.querySelector('.viewer-360-container');
        if (viewerContainer && typeof viewerContainer.cleanup360 === 'function') {
            viewerContainer.cleanup360();
        }
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
    
    // Função global de limpeza (útil se o modal fechar)
    container.cleanup360 = null;
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
        
        // --- LÓGICA DE AUTO-ROTAÇÃO ---
        let autoRotateInterval = null;
        let isAutoRotating = true;
        let autoRotateTimeout = null;

        // Inicia a rotação automática a 15fps
        function startAutoRotate() {
            isAutoRotating = true;
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(() => {
                if (isAutoRotating && !isDragging) {
                    currentFrameIndex++;
                    if (currentFrameIndex >= data.mediaCount) currentFrameIndex = 0;
                    imgElement.src = images[currentFrameIndex].src;
                }
            }, 60); // 60ms ≈ 16 FPS
        }

        // Para temporariamente a auto-rotação quando o utilizador interagir
        function stopAutoRotate() {
            isAutoRotating = false;
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
        }
        
        // Retoma a auto-rotação após um atraso (1 segundo)
        function resumeAutoRotateDelay() {
            if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
            autoRotateTimeout = setTimeout(() => {
                startAutoRotate();
            }, 1000); // 1 segundo de espera
        }

        // Inicia a rodar logo de caras
        startAutoRotate();

        // Expõe uma forma de parar os timers se o utilizador fechar o modal
        container.cleanup360 = () => {
            stopAutoRotate();
        };
        // ------------------------------
        
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
            stopAutoRotate(); // Pausa imediatamente e cancela delays pendentes
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
                resumeAutoRotateDelay(); // Retoma rotação 1s após largar
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
            stopAutoRotate(); // Pausa imediatamente e cancela delays pendentes
        }, { passive: true });

        window.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                resumeAutoRotateDelay(); // Retoma rotação 1s após largar
            }
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
