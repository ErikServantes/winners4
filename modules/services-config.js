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
        title: 'Estampagem de Chapa ou Ambutissagem',
        specs: { 'Capacidade': 'Até 400 toneladas', 'Série Mínima': '50 unidades' },
        materials: ['Ferro', 'Inox', 'Latão', 'Alumínio']
    },
    'repuxamento': {
        title: 'Repuxamento (Manual ou CNC)',
        specs: { 'Diâmetro Máx.': '1200 mm', 'Espessura Máx.': '5 mm (Alumínio)' },
        materials: ['Alumínio', 'Cobre', 'Latão', 'Ferro']
    },
    'quinagem': {
        title: 'Quinagem',
        specs: { 'Comprimento Máx.': '3000 mm', 'Força': '100 toneladas' },
        materials: ['Chapas Metálicas até 6mm']
    },
    'calandragem': {
        title: 'Calandragem',
        specs: { 'Largura Máx.': '1500 mm', 'Diâmetro Mín.': '100 mm' },
        materials: ['Chapa de Ferro', 'Inox', 'Alumínio']
    },

    // --- ACABAMENTO ---
    'polimento': {
        title: 'Polimento e Abrilhantamento',
        specs: { 'Tipo': 'Manual e Vibratório', 'Acabamento': 'Espelhado, Acetinado' },
        materials: ['Inox', 'Latão', 'Alumínio', 'Cobre']
    },
    'evaporacao-vacuo': {
        title: 'Evaporação Metálica em Vácuo',
        specs: { 'Processo': 'PVD (Physical Vapor Deposition)', 'Cores': 'Ouro, Prata, Cobre, Rainbow' },
        materials: ['Plásticos', 'Vidro', 'Metais']
    },
    'galvanizacao': {
        title: 'Processos Galvânicos',
        specs: { 'Banhos': 'Niquelagem, Latonagem, Cobreagem, Prata', 'Tamanho': 'Tanques de 600mm' },
        materials: ['Metais Condutores']
    },
    'pintura-envernizamento': {
        title: 'Pintura e Envernizamento',
        specs: { 'Tipo': 'Electrostática (Pó) e Líquida', 'Cura': 'Estufa de Alta Temperatura' },
        materials: ['Todos os Metais', 'Plásticos Resistentes']
    },

    // --- PERSONALIZAÇÃO ---
    'gravacao-laser': {
        title: 'Gravação Laser',
        specs: { 'Tipo': 'Fibra e CO2', 'Área Máx.': '300x300 mm' },
        materials: ['Metal', 'Madeira', 'Couro', 'Vidro']
    },
    'gravacao-fresa': {
        title: 'Gravação (Incisão) por Fresa',
        specs: { 'Profundidade': 'Ajustável', 'Tipo': 'Mecânica Directa' },
        materials: ['Latão', 'Alumínio', 'Plásticos Bicamada (Gravoply)']
    },
    'impressao-uv': {
        title: 'Impressão Directa nos Materiais',
        specs: { 'Tecnologia': 'UV Led', 'Cores': 'CMYK + Branco + Verniz' },
        materials: ['Objectos Planos e Cilíndricos', 'Brindes', 'Painéis']
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
