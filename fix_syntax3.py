with open("modules/portfolio.js", "r") as f:
    content = f.read()

content = content.replace("""    if (filter === 'todos') {
        for (const folder in inventoryCache) {
            const data = inventoryCache[folder];
            if (Array.isArray(data)) {
                data.forEach(item => items.push({ folder, item }));
        }
    } else {
        const data = inventoryCache[filter];
        if (Array.isArray(data)) {
            data.forEach(item => items.push({ folder: filter, item }));
    }""", """    if (filter === 'todos') {
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
    }""")

with open("modules/portfolio.js", "w") as f:
    f.write(content)
