with open("modules/portfolio.js", "r") as f:
    content = f.read()

content = content.replace("data.forEach(item => items.push({ folder, item }", "data.forEach(item => items.push({ folder, item }));")
content = content.replace("data.forEach(item => items.push({ folder: filter, item }", "data.forEach(item => items.push({ folder: filter, item }));")

with open("modules/portfolio.js", "w") as f:
    f.write(content)
