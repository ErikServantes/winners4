
import fs from 'fs';
import path from 'path';

/**
 * GENERATE INVENTORY V3.0 - Suporte a Grupos e Capas Centrais
 */

const baseDir = './assets';
const outputFile = './assets/inventory.json';

const inventory = {
    meta: {
        lastUpdated: Date.now(),
        groupCovers: {}, // Capas vindas de assets/servicos/
        services: {}     // Media individual de cada serviço
    }
};

try {
    // 1. Processar Capas de Grupos Centrais (01 a 06 em assets/servicos/)
    const groupMapping = {
        '01': 'design',
        '02': 'manufatura-aditiva',
        '03': 'manufatura-subtrativa',
        '04': 'conformacao',
        '05': 'acabamento',
        '06': 'personalizacao'
    };

    const groupPath = path.join(baseDir, 'servicos');
    if (fs.existsSync(groupPath)) {
        fs.readdirSync(groupPath).forEach(file => {
            const prefix = file.substring(0, 2);
            const groupId = groupMapping[prefix];
            if (groupId) {
                const ext = path.extname(file).toLowerCase();
                inventory.meta.groupCovers[groupId] = {
                    src: `assets/servicos/${file}`,
                    type: (ext === '.mp4' || ext === '.webm') ? 'video' : 'image'
                };
            }
        });
    }

    // 2. Processar Serviços Individuais
    const serviceFolders = fs.readdirSync(baseDir).filter(f => f !== 'servicos' && fs.lstatSync(path.join(baseDir, f)).isDirectory());

    for (const service of serviceFolders) {
        const servicePath = path.join(baseDir, service);
        const serviceData = { cover: null, items: [] };
        const allFiles = fs.readdirSync(servicePath);
        
        const coverFile = allFiles.find(f => f.startsWith('00.'));
        if (coverFile) {
            const ext = path.extname(coverFile).toLowerCase();
            serviceData.cover = {
                src: `assets/${service}/${coverFile}`,
                type: (ext === '.mp4' || ext === '.webm') ? 'video' : 'image'
            };
        }

        serviceData.items = allFiles
            .filter(file => !file.startsWith('00.') && !file.startsWith('.'))
            .map(file => {
                const mediaPath = path.join(servicePath, file);
                const fileStat = fs.lstatSync(mediaPath);
                const fileName = path.parse(file).name;
                const extension = path.extname(file).toLowerCase();

                if (fileStat.isDirectory()) {
                    if (fileName.toLowerCase().endsWith('_360') && fs.existsSync(path.join(mediaPath, 'frame_00.webp'))) {
                        return {
                            name: fileName, type: '360', folder: `assets/${service}/${file}/`,
                            prefix: 'frame_', extension: '.webp', timestamp: fileStat.mtimeMs,
                            count: fs.readdirSync(mediaPath).filter(f => f.startsWith('frame_')).length
                        };
                    }
                } else if (extension === '.mp4' || extension === '.webm') {
                    return { name: fileName, type: 'video', src: `assets/${service}/${file}`, timestamp: fileStat.mtimeMs };
                } else if (['.webp', '.jpg', '.png'].includes(extension)) {
                    return { name: fileName, type: 'image', src: `assets/${service}/${file}`, timestamp: fileStat.mtimeMs };
                }
                return null;
            })
            .filter(Boolean)
            .sort((a, b) => b.timestamp - a.timestamp);
        
        inventory.meta.services[service] = serviceData;
    }

    fs.writeFileSync(outputFile, JSON.stringify(inventory, null, 2));
    console.log(`✅ Inventário V3 Gerado (Capas Centrais ativas).`);

} catch (error) {
    console.error(`❌ Erro: ${error.message}`);
}
