/**
 * CONFIGURAÇÃO DE SERVIÇOS V3
 * Organização por Grupos e Especificações Técnicas
 */

export const serviceGroups = {
    'design': {
        title: 'Design',
        icon: 'draw',
        services: ['desenho-vectorial', 'modelacao-3d']
    },
    'manufatura-aditiva': {
        title: 'Manufatura Aditiva',
        icon: 'layers',
        services: ['impressao-3d', 'fundicao']
    },
    'manufatura-subtrativa': {
        title: 'Manufatura Subtrativa',
        icon: 'precision_manufacturing',
        services: ['corte-laser', 'maquinacao-cnc', 'torneamento']
    },
    'conformacao': {
        title: 'Conformação',
        icon: 'compress',
        services: ['estampagem', 'repuxamento', 'quinagem', 'calandragem']
    },
    'acabamento': {
        title: 'Acabamento de Superfícies',
        icon: 'format_paint',
        services: ['polimento', 'evaporacao-vacuo', 'galvanizacao', 'pintura-envernizamento']
    },
    'personalizacao': {
        title: 'Personalização',
        icon: 'fingerprint',
        services: ['gravacao-laser', 'gravacao-fresa', 'impressao-uv']
    }
};

export const serviceConfig = {
    // --- DESIGN ---
    'desenho-vectorial': {
        title: 'Design Gráfico',
        description: 'Transformamos a sua identidade visual em dados de precisão. Otimizamos logótipos e imagens para garantir que o resultado final reflete a sua marca com o máximo rigor e excelência.',
        tags: ['Vetorização de Logótipos', 'Preparação para Fabrico', 'Tratamento de Imagem']
    },
    'modelacao-3d': {
        title: 'Modelação 3D',
        description: 'Damos volume e forma aos seus conceitos. Desenvolvemos modelos tridimensionais rigorosos para garantir que o resultado final em produção corresponda exatamente à visão inicial da sua ideia.',
        tags: ['Design de Engenharia e Mecânica', 'Modelação Orgânica e Escultura', 'Visualização Fotorealista']
    },

    // --- ADITIVA ---
    'impressao-3d': {
        title: 'Impressão 3D',
        description: 'Materializamos o mundo digital com máxima fidelidade geométrica. Convertemos os seus modelos 3D em peças físicas rigorosas, libertando o seu projeto das restrições de geometria do fabrico tradicional.',
        tags: ['Prototipagem Funcional', 'Originais para Moldes', 'Peças Finais de Produção']
    },
    'fundicao': {
        title: 'Fundição',
        description: 'Aliamos a arte milenar da moldagem às necessidades da engenharia moderna. Produzimos peças complexas e resistentes através do vazamento de materiais fundidos em moldes de precisão, adaptando o processo desde peças únicas a lotes de produção.',
        tags: ['Ligas Metálicas Diversas', 'Resinas Técnicas']
    },

    // --- SUBTRATIVA ---
    'corte-laser': {
        title: 'Corte de Laser',
        description: 'Utilizamos tecnologia laser avançada para efetuar cortes de extrema precisão e acabamentos limpos. Este processo permite materializar desde formas geométricas simples até aos detalhes mais complexos, garantindo eficiência e uma qualidade de topo sem desgaste mecânico da peça.',
        tags: ['Metal', 'Acrílico', 'Madeira']
    },
    'maquinacao-cnc': {
        title: 'Maquinação Computadorizada (CNC)',
        description: 'Recorremos a centros de maquinação controlados por computador para esculpir blocos sólidos com tolerâncias rigorosas. Removemos o excesso de material com máxima eficácia, produzindo peças tridimensionais complexas e de alta fiabilidade estrutural.',
        tags: ['Metal', 'Acrílico', 'Madeira']
    },
    'torneamento': {
        title: 'Torneamento',
        description: 'Através da rotação controlada da peça contra ferramentas de corte especializadas, moldamos componentes cilíndricos e de revolução perfeitos. Uma técnica essencial, executada com tecnologia CNC para assegurar total repetibilidade e rigor geométrico.',
        tags: ['Metal', 'Acrílico', 'Madeira']
    },

    // --- CONFORMAÇÃO ---
    'estampagem': {
        title: 'Embutissagem ou Estampagem Profunda de Chapa Metálica',
        description: 'Um processo de excelência para a produção em massa e consistência estrutural. Através da aplicação de força e matrizes de precisão, deformamos chapas planas criando componentes tridimensionais complexos e de elevada resistência mecânica.',
        tags: ['Metal']
    },
    'repuxamento': {
        title: 'Repuxamento',
        description: 'Moldamos a chapa progressivamente sobre um mandril em rotação, um processo ideal para criar formas cónicas e cilíndricas ocas. Garantimos simetria perfeita e paredes sem costuras para aplicações que exigem pureza de forma.',
        tags: ['Metal']
    },
    'quinagem': {
        title: 'Quinagem',
        description: 'Através de prensas de precisão, realizamos a dobragem linear e rigorosa de chapas em ângulos exatos. Um método fundamental para a construção de estruturas, invólucros e peças angulares com tolerâncias mínimas.',
        tags: ['Metal', 'Acrílico']
    },
    'calandragem': {
        title: 'Calandragem',
        description: 'Curvamos chapas de forma contínua e suave através de um sistema de rolos. Essencial para criar formas cilíndricas amplas, anéis e curvas progressivas, garantindo um raio consistente ao longo de toda a superfície.',
        tags: ['Metal']
    },

    // --- ACABAMENTO ---
    'polimento': {
        title: 'Polimento e Abrilhantamento',
        description: 'Elevamos a qualidade tátil e visual dos materiais. Através da utilização minuciosa de lamelas de lixa e discos de pano, as superfícies são progressivamente amaciadas e lustradas até atingirem o nível de brilho exato pretendido pelo seu projeto.',
        tags: ['Metal', 'Acrílico']
    },
    'evaporacao-vacuo': {
        title: 'Evaporação Metálica em Vácuo',
        description: 'Uma solução de vanguarda que transcende os limites dos materiais tradicionais. Aplicamos um finíssimo revestimento metálico a peças que não são naturalmente condutoras de energia, permitindo criar um acabamento luxuoso e premium em qualquer substrato.',
        tags: ['Metal', 'Resina', 'Vidro', 'Cerâmica', 'Plástico']
    },
    'galvanizacao': {
        title: 'Processos Galvânicos',
        description: 'Através de processos eletroquímicos especializados, adicionamos um revestimento metálico de precisão a peças eletricamente condutoras. Este processo aumenta exponencialmente a resistência anticorrosiva e permite uma personalização estética absoluta (como ouro, prata e cobre).',
        tags: ['Metal']
    },
    'pintura-envernizamento': {
        title: 'Pintura e Envernizamento',
        description: 'A camada final de proteção e cor. Utilizamos tintas líquidas ou termoendurecíveis (pintura a pó) com cura em estufa, assegurando um acabamento duradouro, resistente a impactos e intempéries, e perfeitamente alinhado com o pantone da sua marca.',
        tags: ['Metal', 'Plástico Resistente', 'Madeira']
    },

    // --- PERSONALIZAÇÃO ---
    'gravacao-laser': {
        title: 'Gravação Laser',
        description: 'Marcamos a sua identidade com precisão inalterável. Utilizamos feixes de laser de alta resolução para remover seletivamente a superfície do material, criando texturas, números de série ou logótipos complexos que resistem ao teste do tempo.',
        tags: ['Metal', 'Acrílico', 'Madeira']
    },
    'gravacao-fresa': {
        title: 'Gravação por Fresa',
        description: 'A clássica incisão mecânica levada à máxima precisão por controlo numérico (CNC). Ideal para placas de sinalética, moldes e painéis industriais onde a profundidade do sulco e a leitura tátil são requisitos críticos do projeto.',
        tags: ['Metal']
    },
    'impressao-uv': {
        title: 'Impressão UV',
        description: 'Aplicamos a sua marca e design a qualquer superfície rígida. Graças à tecnologia de cura ultra-rápida por LED UV, a tinta adere instantaneamente aos substratos, garantindo cores vibrantes, durabilidade e a possibilidade de aplicar efeitos de relevo e verniz localizado.',
        tags: ['Todos os Materiais']
    },

    // --- CONTACTO ---
    'contacto': {
        title: 'Entre em Contacto',
        address: 'Rua do Barqueiro 754, 4805-016 Barco - GMR',
        address_link: 'https://www.google.com/maps/search/?api=1&query=Rua+do+Barqueiro+754,+4805-016+Barco+-+GMR',
        phone: '253 576 251',
        phone_link: 'tel:+351253576251',
        email: 'geral@4winners.com.pt',
        schedule: [
            'Segunda a Sexta: 08:30 – 18:30',
            'Sábado: 09:00 – 12:30',
            'Domingo: Encerrado'
        ]
    }
};
