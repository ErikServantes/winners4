
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseDir = './assets';
const targetSize = 1000;

async function walk(dir) {
    let files = fs.readdirSync(dir);
    for (const file of files) {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (!file.toLowerCase().endsWith('_360')) {
                await walk(fullPath);
            }
        } else if (['.webp', '.jpg', '.png', '.jpeg'].includes(path.extname(file).toLowerCase())) {
            await processImage(fullPath);
        }
    }
}

async function processImage(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        const metadata = await sharp(buffer).metadata();

        if (metadata.width === targetSize && metadata.height === targetSize) return;

        console.log(`⏳ A processar: ${filePath} (${metadata.width}x${metadata.height})`);

        const tempPath = filePath + '.tmp';
        await sharp(buffer)
            .resize(targetSize, targetSize, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 85 })
            .toFile(tempPath);

        fs.renameSync(tempPath, filePath);
        console.log(`✅ Concluído: ${filePath}`);
    } catch (e) {
        console.error(`❌ Erro em ${filePath}: ${e.message}`);
    }
}

console.log("🚀 Iniciando padronização 1000x1000 (Ignorando 360)...");
walk(baseDir);
