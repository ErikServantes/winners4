
import fs from 'fs';
import path from 'path';

/**
 * GENERATE INVENTORY V2 - Flexível e Inteligente
 * Regras:
 * 1. '00.webp' (ou .mp4) é a Capa.
 * 2. Pastas terminadas em '_360' são sequências de frames.
 * 3. Ficheiros webp/mp4 com qualquer nome são aceites.
 * 4. Ordenação por data (Mais recente primeiro).
 */

const baseDir = './assets';
const outputFile = './assets/inventory.json';

const inventory = {};

console.log(`🔍 A iniciar scan inteligente na diretoria: ${baseDir}`);

try {
    const serviceFolders = fs.readdirSync(baseDir);

    for (const service of serviceFolders) {
        const servicePath = path.join(baseDir, service);
        
        if (fs.lstatSync(servicePath).isDirectory()) {
            console.log(`\t- A processar o serviço: ${service}`);
            
            const mediaFiles = fs.readdirSync(servicePath)
                // Ignorar capa '00' e ficheiros ocultos
                .filter(file => !file.startsWith('00.') && !file.startsWith('.'))
                .map(file => {
                    const mediaPath = path.join(servicePath, file);
                    const fileStat = fs.lstatSync(mediaPath);
                    const fileName = path.parse(file).name;
                    const extension = path.extname(file).toLowerCase();

                    // CASO 1: Pasta de Frames 360 (ex: 'peça_360/')
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
                    } 
                    // CASO 2: Vídeos normais
                    else if (extension === '.mp4' || extension === '.webm') {
                        return {
                            name: fileName,
                            type: 'video',
                            src: `assets/${service}/${file}`,
                            timestamp: fileStat.mtimeMs
                        };
                    } 
                    // CASO 3: Imagens normais
                    else if (extension === '.webp' || extension === '.jpg' || extension === '.png') {
                        return {
                            name: fileName,
                            type: 'image',
                            src: `assets/${service}/${file}`,
                            timestamp: fileStat.mtimeMs
                        };
                    }
                    
                    return null;
                })
                .filter(Boolean);

            // Ordena pela data (Mais recentes primeiro)
            mediaFiles.sort((a, b) => b.timestamp - a.timestamp);
            
            inventory[service] = mediaFiles;
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(inventory, null, 2));
    console.log(`\n✅ Inventário inteligente gerado em: ${outputFile}`);

} catch (error) {
    console.error(`❌ Erro ao gerar o inventário: ${error.message}`);
}
