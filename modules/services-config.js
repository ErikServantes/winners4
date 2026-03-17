
export const serviceConfig = {
    'estampagem': {
        title: 'Estampagem',
        icon: 'compress',
        specs: {
            'Capacidade': 'Até 400 toneladas',
            'Série Mínima': '50 unidades'
        },
        materials: ['Latão', 'Ferro', 'Alumínio']
    },
    'corte-laser': {
        title: 'Corte de Laser',
        icon: 'flare',
        specs: {
            'Área Corte CO2': { value: '1600 x 1000 mm', materials: ['Acrílico', 'Madeira', 'Cartão'] },
            'Área Corte Fibra': { value: '1000 x 1500 mm', materials: ['INOX', 'Ferro', 'Alumínio'] }
        },
        materials: []
    },
    'gravacao-laser': {
        title: 'Gravação a Laser',
        icon: 'fingerprint',
        specs: {
            'Área Gravação CO2': { value: '1600 x 1000 mm', materials: ['Acrílico', 'Madeira'] },
            'Área Gravação FIBRA': { value: '200 x 200 mm', materials: ['Ferro', 'INOX', 'Alumínio', 'Cobre', 'Prata', 'Estanho'] }
        },
        materials: []
    },
    'impressao-uv': {
        title: 'Impressão UV',
        icon: 'light_mode',
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
        icon: 'layers',
        specs: {
            'Volume de Construção': '223 x 223 x 305 mm',
            'Resolução de Camada': '100 - 300 microns',
            'Tecnologias': 'FDM'
        },
        materials: ['PLA']
    },
    'modelacao-3d': {
        title: 'Modelação 3D',
        icon: 'view_in_ar',
        specs: {
            'Softwares': 'Solidworks, Zbrush',
            'Ficheiros de Entrega': '.STEP, .IGES, .STL, .OBJ'
        },
        materials: []
    },
    'maquinacao-cnc': {
        title: 'Maquinação CNC',
        icon: 'precision_manufacturing',
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
        icon: 'rotate_right',
        specs: {
            'Diâmetro Máx.': '300 mm',
            'Comprimento Máx.': '300 mm',
            'Tolerância': '± 0.1 mm'
        },
        materials: ['Aço', 'Inox', 'Alumínio', 'Cobre', 'Latão']
    },
    'repuxamento': {
        title: 'Repuxamento',
        icon: 'donut_large',
        specs: {
            'Diâmetro Máx. da Chapa': '1200 mm',
            'Espessura Máx. (Aço)': '3 mm',
            'Espessura Máx. (Alumínio)': '5 mm'
        },
        materials: ['Aço Carbono', 'Inox', 'Alumínio', 'Cobre']
    },
    'galvanizacao': {
        title: 'Galvanização',
        icon: 'shield',
        specs: {
            'Banhos Disponíveis': 'Latonagem, Niquelagem e Cobreagem',
            'Tamanho Máx. da Peça': '300 x 300 x 300 mm'
        },
        materials: ['Inox', 'Cobre', 'Ferro', 'Alumínio']
    },
    'quinagem': {
        title: 'Quinagem',
        icon: 'polyline',
        specs: {
            'Comprimento Máximo': 'Até 2000 mm',
            'Espessura Máx.': 'Por consulta'
        },
        materials: ['Ferro', 'Inox', 'Alumínio']
    },
    'calandragem': {
        title: 'Calandragem',
        icon: 'all_inclusive',
        specs: {
            'Comprimento Máx.': 'Até 1200 mm',
            'Espessura': 'Por consulta',
            'Diâmetro Mínimo Interno': '80 mm'
        },
        materials: ['Ferro', 'Inox', 'Alumínio']
    },
    'contacto': {
        title: 'Entre em Contacto',
        icon: 'alternate_email',
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
