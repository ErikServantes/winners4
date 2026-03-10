document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.fullscreen-section');

    // Set the first layer to be visible by default
    gsap.set('#layer-estampagem', { opacity: 1 });

    // ... (Existing GSAP animation code) ...

    // --- Modal Logic ---

    const serviceData = {
        'estampagem': {
            title: 'Estampagem',
            description: 'A estampagem é um processo de conformação de chapas metálicas, onde a força de uma prensa molda o material para criar peças com precisão e repetibilidade. Ideal para produção em massa de componentes complexos.',
            materials: ['Latão', 'Ferro', 'Alumínio']
        },
        'corte-laser': {
            title: 'Corte de Laser',
            description: 'Utilizando um feixe de laser de alta potência, este processo corta materiais com uma precisão excecional, permitindo a criação de geometrias complexas e acabamentos limpos sem contacto físico com a peça.',
            materials: ['Metal', 'Acrílico', 'Madeira']
        },
        'gravacao-laser': {
            title: 'Gravação a Laser',
            description: 'A gravação a laser remove seletivamente a superfície de um material para criar marcas permanentes, como logótipos, números de série ou designs decorativos, com um detalhe impressionante.',
            materials: ['Metal', 'Acrílico', 'Madeira', 'Vidro / Cristal']
        },
        'impressao-uv': {
            title: 'Impressão UV',
            description: 'A impressão UV utiliza tintas especiais que secam instantaneamente sob luz ultravioleta. Este processo permite imprimir designs vibrantes e duradouros numa vasta gama de superfícies rígidas e semi-rígidas.',
            materials: ['Metal', 'Acrílico', 'Madeira', 'Plástico', 'Vidro / Cristal']
        },
        'impressao-3d': {
            title: 'Impressão 3D',
            description: 'A impressão 3D, ou manufatura aditiva, constrói objetos tridimensionais camada por camada a partir de um modelo digital. É perfeita para prototipagem rápida, peças personalizadas e produção de baixo volume.',
            materials: ['PLA (Ácido Polilático)']
        },
        'modelacao-3d': {
            title: 'Modelação 3D',
            description: 'A modelação 3D é o processo de criar uma representação matemática de um objeto tridimensional usando software especializado. É o primeiro passo essencial para a impressão 3D, maquinação CNC e visualizações de produtos.',
            materials: []
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
        }
    };

    const modal = document.getElementById('details-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const detailBtns = document.querySelectorAll('.details-btn');

    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalMaterialsList = document.getElementById('modal-materials');

    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.dataset.service;
            const data = serviceData[service];

            if (data) {
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                
                modalMaterialsList.innerHTML = ''; // Clear previous materials
                if (data.materials.length > 0) {
                    data.materials.forEach(material => {
                        const li = document.createElement('li');
                        li.textContent = material;
                        modalMaterialsList.appendChild(li);
                    });
                    document.querySelector('#modal-body h3').style.display = 'block';
                } else {
                    document.querySelector('#modal-body h3').style.display = 'none';
                }

                modal.classList.add('visible');
            }
        });
    });

    function closeModal() {
        modal.classList.remove('visible');
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close if the overlay (background) is clicked, but not the content inside it
        if (e.target === modal) {
            closeModal();
        }
    });

    // ... (Keep the rest of the GSAP animation code below this) ...
    // ScrollTrigger.matchMedia({ ... });
    // etc.

});