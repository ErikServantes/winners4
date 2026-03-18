
import chokidar from 'chokidar';
import { exec } from 'child_process';

const watchPath = './assets';
const inventoryScript = 'generate-inventory.mjs';

console.log(`👀 Sentinela Ativa: A vigiar alterações em ${watchPath}...`);

const watcher = chokidar.watch(watchPath, {
    ignored: /(^|[\/\\])\..|inventory\.json/, 
    persistent: true,
    ignoreInitial: true 
});

function updateInventory(filePath) {
    console.log(`✨ Alteração detetada: ${filePath}. A atualizar...`);
    exec(`node ${inventoryScript}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Erro: ${error.message}`);
            return;
        }
        console.log(`✅ Inventário Atualizado com sucesso.`);
    });
}

watcher
    .on('add', path => updateInventory(path))
    .on('change', path => updateInventory(path))
    .on('unlink', path => updateInventory(path))
    .on('addDir', path => updateInventory(path))
    .on('unlinkDir', path => updateInventory(path));
