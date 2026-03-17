
import fs from 'fs';
import path from 'path';

// Diretório base onde estão as pastas dos serviços
const baseDir = './assets';
// Ficheiro de saída onde o inventário será guardado
const outputFile = './assets/inventory.json';

const inventory = {};

console.log(`🔍 A iniciar scan inteligente na diretoria: ${baseDir}`);

try {
    // Lê todas as entradas na diretoria 'assets'
    const serviceFolders = fs.readdirSync(baseDir);

    for (const service of serviceFolders) {
        const servicePath = path.join(baseDir, service);
        
        // Verifica se a entrada é uma diretoria
        if (fs.lstatSync(servicePath).isDirectory()) {
            console.log(`\t- A processar o serviço: ${service}`);
            
            // Lê todos os ficheiros dentro da diretoria do serviço
            const mediaFiles = fs.readdirSync(servicePath)
                // Filtra para remover a imagem de capa '00.webp' e outros ficheiros de sistema
                .filter(file => file !== '00.webp' && !file.startsWith('.'))
                .map(file => {
                    const mediaPath = path.join(servicePath, file);
                    const fileStat = fs.lstatSync(mediaPath);
                    
                    // Ignorar sub-diretórios (o antigo sistema de frames 360)
                    if (fileStat.isDirectory()) return null;

                    const extension = path.extname(file).toLowerCase();
                    const fileName = path.parse(file).name;
                    const is360 = fileName.toLowerCase().endsWith('_360');

                    const item = {
                        name: fileName,
                        src: `assets/${service}/${file}`,
                        timestamp: fileStat.mtimeMs, // Data de modificação para lógica "New First"
                        date: fileStat.mtime // Para debug humano se necessário
                    };

                    if (extension === '.mp4' || extension === '.webm') {
                        item.type = is360 ? 'video360' : 'video';
                        return item;
                    } else if (extension === '.webp' || extension === '.jpg' || extension === '.png') {
                        item.type = 'image';
                        return item;
                    }

                    return null;
                })
                .filter(Boolean); // Remove entradas nulas

            // Ordena os ficheiros pela data de modificação (Mais recentes primeiro)
            mediaFiles.sort((a, b) => b.timestamp - a.timestamp);
            
            inventory[service] = mediaFiles;
        }
    }

    // Escreve o objeto de inventário completo para o ficheiro JSON
    fs.writeFileSync(outputFile, JSON.stringify(inventory, null, 2));
    console.log(`\n✅ Inventário inteligente gerado com sucesso em: ${outputFile}`);
    console.log(`💡 Regra: Ficheiros com '_360' no nome são tratados como visualizadores interativos.`);

} catch (error) {
    console.error(`❌ Erro ao gerar o inventário: ${error.message}`);
}
