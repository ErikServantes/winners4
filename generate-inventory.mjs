import { promises as fsPromises } from 'fs';
import fs from 'fs'; 
import path from 'path';

/**
 * GENERATE INVENTORY V3.2 - Assíncrono com Cache Busting Inteligente
 */

const baseDir = './assets';
const outputFile = './assets/inventory.json';

const inventory = {
    meta: {
        lastUpdated: Date.now(),
        groupCovers: {}, 
        services: {}     
    }
};

async function buildInventory() {
    try {
        // 1. Processar Capas Centrais (01 a 06)
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
            for (const file of files) {
                const prefix = file.substring(0, 2);
                const groupId = groupMapping[prefix];
                if (groupId) {
                    const mediaPath = path.join(groupPath, file);
                    const fileStat = await fsPromises.lstat(mediaPath);
                    const ext = path.extname(file).toLowerCase();
                    const cacheBuster = `?v=${fileStat.mtimeMs}`; // <== BUSTER
                    
                    inventory.meta.groupCovers[groupId] = {
                        src: `assets/servicos/${file}${cacheBuster}`,
                        type: (ext === '.mp4' || ext === '.webm') ? 'video' : 'image'
                    };
                }
            }
        }

        // 2. Localizar Pastas de Serviços
        const rawRootFiles = await fsPromises.readdir(baseDir);
        const serviceFolders = [];
        
        for (const f of rawRootFiles) {
            if (f !== 'servicos' && f !== 'inventory.json') {
                const stat = await fsPromises.lstat(path.join(baseDir, f));
                if (stat.isDirectory()) serviceFolders.push(f);
            }
        }

        // 3. Processar Serviços Assincronamente e Gerar Busters
        for (const service of serviceFolders) {
            const servicePath = path.join(baseDir, service);
            const serviceData = { cover: null, items: [] };
            const allFiles = await fsPromises.readdir(servicePath);
            
            const coverFile = allFiles.find(f => f.startsWith('00.'));
            if (coverFile) {
                const mediaPath = path.join(servicePath, coverFile);
                const fileStat = await fsPromises.lstat(mediaPath);
                const ext = path.extname(coverFile).toLowerCase();
                const cacheBuster = `?v=${fileStat.mtimeMs}`; // <== BUSTER
                
                serviceData.cover = {
                    src: `assets/${service}/${coverFile}${cacheBuster}`,
                    type: (ext === '.mp4' || ext === '.webm') ? 'video' : 'image'
                };
            }

            const itemsPromises = allFiles
                .filter(file => !file.startsWith('00.') && !file.startsWith('.'))
                .map(async file => {
                    const mediaPath = path.join(servicePath, file);
                    const fileStat = await fsPromises.lstat(mediaPath);
                    const fileName = path.parse(file).name;
                    const extension = path.extname(file).toLowerCase();
                    const cacheBuster = `?v=${Math.round(fileStat.mtimeMs)}`; // <== BUSTER GLOBAL

                    if (fileStat.isDirectory()) {
                        if (fileName.toLowerCase().endsWith('_360') && fs.existsSync(path.join(mediaPath, 'frame_00.webp'))) {
                            const frames = await fsPromises.readdir(mediaPath);
                            const count = frames.filter(f => f.startsWith('frame_')).length;
                            return {
                                name: fileName, type: '360', folder: `assets/${service}/${file}/`,
                                prefix: 'frame_', extension: '.webp', timestamp: fileStat.mtimeMs,
                                count: count, cacheBuster: cacheBuster // Útil para media-engine.js se necessário
                            };
                        }
                    } else if (extension === '.mp4' || extension === '.webm') {
                        return { name: fileName, type: 'video', src: `assets/${service}/${file}${cacheBuster}`, timestamp: fileStat.mtimeMs };
                    } else if (['.webp', '.jpg', '.png'].includes(extension)) {
                        return { name: fileName, type: 'image', src: `assets/${service}/${file}${cacheBuster}`, timestamp: fileStat.mtimeMs };
                    }
                    return null;
                });
            
            const resolvedItems = await Promise.all(itemsPromises);
            serviceData.items = resolvedItems.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp);
            
            inventory.meta.services[service] = serviceData;
        }

        await fsPromises.writeFile(outputFile, JSON.stringify(inventory, null, 2));
        console.log(`✅ Inventário V3.2 Gerado (Alta Performance + Prevenção de Cache)`);

    } catch (error) {
        console.error(`❌ Erro Falso Pânico: ${error.message}`);
    }
}

buildInventory();
