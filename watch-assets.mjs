
import chokidar from 'chokidar';
import { exec } from 'child_process';
import fs from 'fs';

const watchPath = './assets';
const inventoryScript = 'generate-inventory.mjs';
const triggerInAssets = 'assets/atualizar.now';
const triggerInRoot = './atualizar.now';

console.log(`👀 Sentinela Ativa em ${watchPath}...`);
console.log(`💡 FTP: Arraste 'atualizar.now' para dentro de 'assets/' para forçar a atualização.`);

const watcher = chokidar.watch(watchPath, {
    ignored: /(^|[\/\\])\..|inventory\.json/, 
    persistent: true,
    ignoreInitial: true 
});

function updateInventory(filePath) {
    const isManualTrigger = filePath.includes('atualizar.now');
    
    console.log(`✨ ${isManualTrigger ? 'MANUAL' : 'AUTO'}: Mudança em ${filePath}.`);
    
    exec(`node ${inventoryScript}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Erro: ${error.message}`);
            return;
        }
        console.log(`✅ Inventário Atualizado.`);

        if (isManualTrigger && fs.existsSync(triggerInAssets)) {
            try {
                fs.renameSync(triggerInAssets, triggerInRoot);
                console.log(`♻️ Gatilho movido de volta para a raiz.`);
            } catch (e) {
                fs.unlinkSync(triggerInAssets);
                console.log(`🗑️ Gatilho removido.`);
            }
        }
    });
}

watcher
    .on('add', path => updateInventory(path))
    .on('change', path => updateInventory(path))
    .on('unlink', path => updateInventory(path))
    .on('addDir', path => updateInventory(path))
    .on('unlinkDir', path => updateInventory(path));
