import re

with open("modules/portfolio.js", "r") as f:
    content = f.read()

# Fix the renderGrid function completely
new_render_grid = """function renderGrid(gridContainer, filter) {
    gridContainer.innerHTML = ''; // Limpar grelha

    const items = [];

    if (filter === 'todos') {
        for (const folder in inventoryCache) {
            const data = inventoryCache[folder];
            if (Array.isArray(data)) {
                data.forEach(item => items.push({ folder, item }));
            }
        }
    } else {
        const data = inventoryCache[filter];
        if (Array.isArray(data)) {
            data.forEach(item => items.push({ folder: filter, item }));
        }
    }

    items.forEach(({ folder, item }) => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.dataset.folder = folder;
        div.dataset.type = item.type;

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.loading = 'lazy';
            img.alt = \`Portefólio \${folder}\`;
            div.appendChild(img);
        } else if (item.type === 'video') {
            // Miniatura estática para vídeo para poupar memória/CPU
            // Como não temos poster gerado, usamos a primeira frame (browser tenta carregar mas sem autoplay)
            const video = document.createElement('video');
            video.src = item.src + "#t=0.1"; // Sugestão para mostrar o início
            video.preload = "metadata";
            video.muted = true;
            video.playsInline = true;
            div.appendChild(video);
            
            const icon = document.createElement('span');
            icon.className = 'item-type-icon material-symbols-outlined';
            icon.textContent = 'play_circle';
            div.appendChild(icon);
        } else if (item.type === '360') {
            // Miniatura estática para 360
            const img = document.createElement('img');
            img.src = \`\${item.folder}frame_00.webp\`;
            img.loading = 'lazy';
            img.alt = \`Portefólio 360 \${folder}\`;
            div.appendChild(img);
            
            const icon = document.createElement('span');
            icon.className = 'item-type-icon material-symbols-outlined';
            icon.textContent = '360';
            div.appendChild(icon);
        }

        // Lightbox será implementado na próxima fase
        div.addEventListener('click', () => {
             console.log('Abrir Lightbox para:', folder, item);
        });

        gridContainer.appendChild(div);
    });
}"""

# Use regex to replace the function
content = re.sub(r'function renderGrid\(gridContainer, filter\) \{.*?\}', new_render_grid, content, flags=re.DOTALL)

with open("modules/portfolio.js", "w") as f:
    f.write(content)
