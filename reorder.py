import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Update Navigation
nav_regex = re.compile(r'<nav id="side-nav">.*?</nav>', re.DOTALL)
new_nav = '''<nav id="side-nav">
        <ul>
            <li><a href="#hero-4winners" class="dot active" data-name="Home"></a></li>
            <li><a href="#corte-laser" class="dot" data-name="Corte de Laser"></a></li>
            <li><a href="#gravacao-laser" class="dot" data-name="Gravação a Laser"></a></li>
            <li><a href="#modelacao-3d" class="dot" data-name="Modelação 3D"></a></li>
            <li><a href="#impressao-3d" class="dot" data-name="Impressão 3D"></a></li>
            <li><a href="#maquinacao-cnc" class="dot" data-name="Maquinação CNC"></a></li>
            <li><a href="#estampagem" class="dot" data-name="Estampagem"></a></li>
            <li><a href="#quinagem" class="dot" data-name="Quinagem"></a></li>
            <li><a href="#calandragem" class="dot" data-name="Calandragem"></a></li>
            <li><a href="#repuxamento" class="dot" data-name="Repuxamento"></a></li>
            <li><a href="#torneamento" class="dot" data-name="Torneamento"></a></li>
            <li><a href="#galvanizacao" class="dot" data-name="Galvanização"></a></li>
            <li><a href="#impressao-uv" class="dot" data-name="Impressão UV"></a></li>
            <li><a href="#contacto" class="dot contact-dot" data-name="Contacto"></a></li>
        </ul>
    </nav>'''
content = nav_regex.sub(new_nav, content)

# 2. Update Background Layers
layers_regex = re.compile(r'<div id="background-layers">.*?</div>\n\n    <main', re.DOTALL)
new_layers = '''<div id="background-layers">
        <div class="layer" id="layer-hero-4winners" style="background-color: #1a1a1a;" data-section="hero-4winners"></div>
        <div class="layer" id="layer-corte-laser" style="background-color: #444c54;" data-section="corte-laser"></div>
        <div class="layer" id="layer-gravacao-laser" style="background-color: #00d4ff;" data-section="gravacao-laser"></div>
        <div class="layer" id="layer-modelacao-3d" style="background-color: #eeeeee;" data-section="modelacao-3d"></div>
        <div class="layer" id="layer-impressao-3d" style="background-color: #ffffff;" data-section="impressao-3d"></div>
        <div class="layer" id="layer-maquinacao-cnc" style="background-color: #8c8c8c;" data-section="maquinacao-cnc"></div>
        <div class="layer" id="layer-estampagem" style="background-color: #c9a46a;" data-section="estampagem"></div>
        <div class="layer" id="layer-quinagem" style="background-color: #a04040;" data-section="quinagem"></div>
        <div class="layer" id="layer-calandragem" style="background-color: #c05050;" data-section="calandragem"></div>
        <div class="layer" id="layer-repuxamento" style="background-color: #d4af37;" data-section="repuxamento"></div>
        <div class="layer" id="layer-torneamento" style="background-color: #a0a0a0;" data-section="torneamento"></div>
        <div class="layer" id="layer-galvanizacao" style="background-color: #e5e4e2;" data-section="galvanizacao"></div>
        <div class="layer" id="layer-impressao-uv" style="background-color: #b3b3b3;" data-section="impressao-uv"></div>
        <div class="layer" id="layer-contacto" style="background-color: #2a2a2a;" data-section="contacto"></div>
    </div>

    <main'''
content = layers_regex.sub(new_layers, content)

# 3. Update Sections Order (and add missing ones)
# Extract sections
section_regex = re.compile(r'<section id="([^"]+)".*?</section>', re.DOTALL)
sections_dict = {}
for match in section_regex.finditer(content):
    id = match.group(1)
    sections_dict[id] = match.group(0)

# Add new sections
sections_dict['quinagem'] = '''<section id="quinagem" class="fullscreen-section">
            <div class="content">
                <h1>Quinagem</h1>
                <p>Quinagem de chapas para perfis angulares e complexos.</p>
                <button class="details-btn" data-service="quinagem">Saber Mais</button>
            </div>
        </section>'''
sections_dict['calandragem'] = '''<section id="calandragem" class="fullscreen-section">
            <div class="content">
                <h1>Calandragem</h1>
                <p>Curvatura de chapas com precisão para formas cilíndricas.</p>
                <button class="details-btn" data-service="calandragem">Saber Mais</button>
            </div>
        </section>'''

# Rebuild sections
sections_order = [
    'hero-4winners',
    'corte-laser',
    'gravacao-laser',
    'modelacao-3d',
    'impressao-3d',
    'maquinacao-cnc',
    'estampagem',
    'quinagem',
    'calandragem',
    'repuxamento',
    'torneamento',
    'galvanizacao',
    'impressao-uv',
    'contacto'
]

new_main_content = '\n        '.join([sections_dict[id] for id in sections_order])

# Replace old main content
main_regex = re.compile(r'<main id="scroll-container">.*?(<div style="height: 25vh;"></div>\n    </main>)', re.DOTALL)
content = main_regex.sub(f'<main id="scroll-container">\n        {new_main_content}\n        \n        \\1', content)

with open('index.html', 'w') as f:
    f.write(content)
