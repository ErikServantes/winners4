import { promises as fsPromises } from 'fs';
import fs from 'fs'; // Para existsSync (não tem alternativa assíncrona simples no fsPromises sem try/catch)
import path from 'path';

/**
 * GENERATE INVENTORY V3.1 - Arquitetura Assíncrona de Alta Performance
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

async function buildInventory() {
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
            const files = await fsPromises.readdir(groupPath);
            files.forEach(file => {
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

        // 2. Localizar Pastas de Serviços Individuais
        const rawRootFiles = await fsPromises.readdir(baseDir);
        const serviceFolders = [];
        
        for (const f of rawRootFiles) {
            if (f !== 'servicos' && f !== 'inventory.json') {
                const stat = await fsPromises.lstat(path.join(baseDir, f));
                if (stat.isDirectory()) serviceFolders.push(f);
            }
        }

        // 3. Processar Serviços Assincronamente 
        for (const service of serviceFolders) {
            const servicePath = path.join(baseDir, service);
            const serviceData = { cover: null, items: [] };
            const allFiles = await fsPromises.readdir(servicePath);
            
            const coverFile = allFiles.find(f => f.startsWith('00.'));
            if (coverFile) {
                const ext = path.extname(coverFile).toLowerCase();
                serviceData.cover = {
                    src: `assets/${service}/${coverFile}`,
                    type: (ext === '.mp4' || ext === '.webm') ? 'video' : 'image'
                };
            }

            // O mapeamento de Promises permite IO pararelo massivo
            const itemsPromises = allFiles
                .filter(file => !file.startsWith('00.') && !file.startsWith('.'))
                .map(async file => {
                    const mediaPath = path.join(servicePath, file);
                    const fileStat = await fsPromises.lstat(mediaPath);
                    const fileName = path.parse(file).name;
                    const extension = path.extname(file).toLowerCase();

                    if (fileStat.isDirectory()) {
                        if (fileName.toLowerCase().endsWith('_360') && fs.existsSync(path.join(mediaPath, 'frame_00.webp'))) {
                            const frames = await fsPromises.readdir(mediaPath);
                            const count = frames.filter(f => f.startsWith('frame_')).length;
                            return {
                                name: fileName, type: '360', folder: `assets/${service}/${file}/`,
                                prefix: 'frame_', extension: '.webp', timestamp: fileStat.mtimeMs,
                                count: count
                            };
                        }
                    } else if (extension === '.mp4' || extension === '.webm') {
                        return { name: fileName, type: 'video', src: `assets/${service}/${file}`, timestamp: fileStat.mtimeMs };
                    } else if (['.webp', '.jpg', '.png'].includes(extension)) {
                        return { name: fileName, type: 'image', src: `assets/${service}/${file}`, timestamp: fileStat.mtimeMs };
                    }
                    return null;
                });
            
            const resolvedItems = await Promise.all(itemsPromises);
            serviceData.items = resolvedItems.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp);
            
            inventory.meta.services[service] = serviceData;
        }

        // 4. Escrever JSON no fim
        await fsPromises.writeFile(outputFile, JSON.stringify(inventory, null, 2));
        console.log(`✅ Inventário V3.1 Gerado de forma ultra-rápida (Assíncrona).`);

    } catch (error) {
        console.error(`❌ Erro Falso Pânico: ${error.message}`);
    }
}

// Em Módulos ES, podemos chamar e gerir promessas de raiz
buildInventory();
