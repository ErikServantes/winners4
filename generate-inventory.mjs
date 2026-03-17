
import fs from 'fs';
import path from 'path';

/**
 * GENERATE INVENTORY V2.1
 * Regras:
 * 1. Deteta a Capa (ficheiro começado por '00').
 * 2. Pastas terminadas em '_360' são sequências de frames.
 * 3. Ficheiros webp/mp4 com qualquer nome são aceites.
 * 4. Ordenação por data (Mais recente primeiro).
 */

const baseDir = './assets';
const outputFile = './assets/inventory.json';

const inventory = {
    meta: {
        lastUpdated: Date.now(),
        services: {}
    }
};

try {
    const serviceFolders = fs.readdirSync(baseDir);

    for (const service of serviceFolders) {
        const servicePath = path.join(baseDir, service);
        
        if (fs.lstatSync(servicePath).isDirectory()) {
            const serviceData = {
                cover: null,
                items: []
            };

            const allFiles = fs.readdirSync(servicePath);
            
            // 1. Procurar a Capa (00)
            const coverFile = allFiles.find(f => f.startsWith('00.'));
            if (coverFile) {
                const ext = path.extname(coverFile).toLowerCase();
                serviceData.cover = {
                    src: `assets/${service}/${coverFile}`,
                    type: (ext === '.mp4' || ext === '.webm') ? 'video' : 'image'
                };
            }

            // 2. Processar o resto dos itens
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
                                name: fileName,
                                type: '360',
                                folder: `assets/${service}/${file}/`,
                                prefix: 'frame_',
                                extension: '.webp',
                                count: fs.readdirSync(mediaPath).filter(f => f.startsWith('frame_')).length,
                                timestamp: fileStat.mtimeMs
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
    }

    fs.writeFileSync(outputFile, JSON.stringify(inventory, null, 2));
    console.log(`\n✅ Inventário V2.1 gerado com sucesso.`);

} catch (error) {
    console.error(`❌ Erro ao gerar o inventário: ${error.message}`);
}
