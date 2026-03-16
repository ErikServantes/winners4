with open("modules/portfolio.js", "r") as f:
    content = f.read()

# Fix image src logic
content = content.replace("""        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = \`assets/\${folder}/\${item.file}\`;
            img.loading = 'lazy';
            img.alt = \`Portefólio \${folder}\`;
            div.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = \`assets/\${folder}/\${item.file}\`;""", """        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.loading = 'lazy';
            img.alt = \`Portefólio \${folder}\`;
            div.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;""")

# Fix 360 src logic
content = content.replace("""        } else if (item.type === '360') {
            const img = document.createElement('img');
            img.src = \`assets/\${folder}/\${item.folder}/frame_00.webp\`; // Fallback image""", """        } else if (item.type === '360') {
            const img = document.createElement('img');
            img.src = \`\${item.folder}frame_00.webp\`; // Fallback image""")

with open("modules/portfolio.js", "w") as f:
    f.write(content)
