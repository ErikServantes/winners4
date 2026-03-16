with open("modules/portfolio.js", "r") as f:
    content = f.read()

content = content.replace(r"\`Portefólio \${folder}\`", "`Portefólio ${folder}`")
content = content.replace(r"\`\${item.folder}frame_00.webp\`", "`${item.folder}frame_00.webp`")
content = content.replace(r"\`Portefólio 360 \${folder}\`", "`Portefólio 360 ${folder}`")

with open("modules/portfolio.js", "w") as f:
    f.write(content)
