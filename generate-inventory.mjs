
import fs from 'fs';
import path from 'path';

// Diretório base onde estão as pastas dos serviços
const baseDir = './assets';
// Ficheiro de saída onde o inventário será guardado
const outputFile = './assets/inventory.json';

const inventory = {};

console.log(`🔍 A iniciar scan na diretoria: ${baseDir}`);

try {
    // Lê todas as entradas na diretoria 'assets'
    const serviceFolders = fs.readdirSync(baseDir);

    for (const service of serviceFolders) {
        const servicePath = path.join(baseDir, service);
        // Verifica se a entrada é uma diretoria
        if (fs.lstatSync(servicePath).isDirectory()) {
            console.log(`\t- A processar o serviço: ${service}`);
            
            // Lê todos os ficheiros/pastas dentro da diretoria do serviço
            const mediaFiles = fs.readdirSync(servicePath)
                // Filtra para remover a imagem de capa '00.webp' e outros ficheiros de sistema (ex: .DS_Store)
                .filter(file => file !== '00.webp' && !file.startsWith('.'))
                // Mapeia para um formato mais rico em dados
                .map(file => {
                    const mediaPath = path.join(servicePath, file);
                    const fileStat = fs.lstatSync(mediaPath);
                    const fileNameWithoutExt = path.parse(file).name;

                    // Deteta se é uma diretoria (para 360) ou um ficheiro (imagem/vídeo)
                    if (fileStat.isDirectory()) {
                        // Verifica se é um visualizador 360 válido (se tem pelo menos 'frame_00.webp')
                        if (fs.existsSync(path.join(mediaPath, 'frame_00.webp'))) {
                            return {
                                index: parseInt(fileNameWithoutExt, 10),
                                type: '360',
                                folder: `assets/${service}/${file}/`,
                                prefix: 'frame_',
                                extension: '.webp',
                                count: 36 // Assumimos 36 frames por convenção
                            };
                        }
                    } else {
                        const extension = path.extname(file).toLowerCase();
                        if (extension === '.mp4') {
                            return {
                                index: parseInt(fileNameWithoutExt, 10),
                                type: 'video',
                                src: `assets/${service}/${file}`
                            };
                        } else if (extension === '.webp') {
                            return {
                                index: parseInt(fileNameWithoutExt, 10),
                                type: 'image',
                                src: `assets/${service}/${file}`
                            };
                        }
                    }
                    return null;
                })
                .filter(Boolean); // Remove quaisquer entradas nulas (ficheiros não suportados)

            // Ordena os ficheiros pelo seu índice numérico
            mediaFiles.sort((a, b) => a.index - b.index);
            
            inventory[service] = mediaFiles;
        }
    }

    // Escreve o objeto de inventário completo para o ficheiro JSON
    fs.writeFileSync(outputFile, JSON.stringify(inventory, null, 2));
    console.log(`\n✅ Inventário gerado com sucesso em: ${outputFile}`);

} catch (error) {
    console.error(`❌ Erro ao gerar o inventário: ${error.message}`);
}
