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
        specs: { 'Softwares': 'Solidworks, Zbrush, Rhino', 'Ficheiros': '.STEP, .IGES, .STL, .OBJ' },
        materials: ['Engenharia de Produto', 'Escultura Digital', 'Renderização']
    },

    // --- ADITIVA ---
    'impressao-3d': {
        title: 'Impressão 3D (Prototipagem Rápida)',
        specs: { 'Tecnologias': 'FDM, SLA, SLS', 'Volume Máx.': '300x300x400 mm' },
        materials: ['PLA', 'Resina', 'Nylon', 'ABS']
    },
    'fundicao': {
        title: 'Fundição (Metais ou Resina)',
        specs: { 'Processo': 'Cera Perdida, Moldagem em Areia', 'Capacidade': 'Por consulta' },
        materials: ['Bronze', 'Alumínio', 'Zamac', 'Resinas Técnicas']
    },

    // --- SUBTRATIVA ---
    'corte-laser': {
        title: 'Corte de Laser (Metais ou Acrílicos)',
        specs: { 'Área Máx.': '1500x3000 mm', 'Precisão': '± 0.1 mm' },
        materials: ['Aço Inox', 'Ferro', 'Alumínio', 'Acrílico', 'Madeira']
    },
    'maquinacao-cnc': {
        title: 'Maquinação Computadorizada (CNC)',
        specs: { 'Eixos': '3 e 4 eixos simultâneos', 'Rotação': 'Até 24.000 RPM' },
        materials: ['Metais Ferrosos', 'Latão', 'Alumínio', 'Plásticos Técnicos']
    },
    'torneamento': {
        title: 'Torneamento (Manual e CNC)',
        specs: { 'Diâmetro Máx.': '400 mm', 'Comprimento Máx.': '1000 mm' },
        materials: ['Aços', 'Inox', 'Bronze', 'Alumínio', 'Nylon']
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
