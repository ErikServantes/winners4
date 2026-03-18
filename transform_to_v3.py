import re

# O conteúdo HTML dos 6 novos grupos V3
new_groups_html = """        <!-- GRUPO 1: DESIGN -->
        <section id="design" class="fullscreen-section theme-glass layout-split zigzag-left" style="--theme-color: #d4af37;">
            <div class="section-media" data-service-folder="design">
                <img src="assets/placeholder-industrial.webp" alt="Design">
            </div>
            <div class="content glass-panel" style="--service-icon: 'draw';">
                <h1>Design</h1>
                <ul class="service-list">
                    <li data-service="desenho-vectorial">Desenho Vectorial</li>
                    <li data-service="modelacao-3d">Modelação 3D</li>
                </ul>
            </div>
        </section>

        <!-- GRUPO 2: ADITIVA -->
        <section id="manufatura-aditiva" class="fullscreen-section theme-glass layout-split zigzag-right" style="--theme-color: #d4af37;">
            <div class="section-media" data-service-folder="manufatura-aditiva">
                <img src="assets/placeholder-industrial.webp" alt="Manufatura Aditiva">
            </div>
            <div class="content glass-panel" style="--service-icon: 'layers';">
                <h1>Manufactura Aditiva</h1>
                <ul class="service-list">
                    <li data-service="impressao-3d">Impressão 3D (prototipagem rápida)</li>
                    <li data-service="fundicao">Fundição Metais ou Resina</li>
                </ul>
            </div>
        </section>

        <!-- GRUPO 3: SUBTRATIVA -->
        <section id="manufatura-subtrativa" class="fullscreen-section theme-glass layout-split zigzag-left" style="--theme-color: #d4af37;">
            <div class="section-media" data-service-folder="manufatura-subtrativa">
                <img src="assets/placeholder-industrial.webp" alt="Manufatura Subtrativa">
            </div>
            <div class="content glass-panel" style="--service-icon: 'precision_manufacturing';">
                <h1>Manufatura Subtrativa</h1>
                <ul class="service-list">
                    <li data-service="corte-laser">Corte de Laser Metais ou Acrílicos</li>
                    <li data-service="maquinacao-cnc">Maquinação Computadorizada (CNC)</li>
                    <li data-service="torneamento">Torneamento (Manual e CNC)</li>
                </ul>
            </div>
        </section>

        <!-- GRUPO 4: CONFORMAÇÃO -->
        <section id="conformacao" class="fullscreen-section theme-glass layout-split zigzag-right" style="--theme-color: #d4af37;">
            <div class="section-media" data-service-folder="conformacao">
                <img src="assets/placeholder-industrial.webp" alt="Conformação">
            </div>
            <div class="content glass-panel" style="--service-icon: 'compress';">
                <h1>Conformação</h1>
                <ul class="service-list">
                    <li data-service="estampagem">Estampagem de chapa ou ambutissagem</li>
                    <li data-service="repuxamento">Repuxamento manual ou computadorizado</li>
                    <li data-service="quinagem">Quinagem</li>
                    <li data-service="calandragem">Calandragem</li>
                </ul>
            </div>
        </section>

        <!-- GRUPO 5: ACABAMENTO -->
        <section id="acabamento" class="fullscreen-section theme-glass layout-split zigzag-left" style="--theme-color: #d4af37;">
            <div class="section-media" data-service-folder="acabamento">
                <img src="assets/placeholder-industrial.webp" alt="Acabamento">
            </div>
            <div class="content glass-panel" style="--service-icon: 'shimmer';">
                <h1>Acabamento de Superfícies</h1>
                <ul class="service-list">
                    <li data-service="polimento">Polimento e abrilhantamento</li>
                    <li data-service="evaporacao-vacuo">Evaporação metálica em vácuo</li>
                    <li data-service="galvanizacao">Processos Galvânicos</li>
                    <li data-service="pintura-envernizamento">Pintura e Envernizamento</li>
                </ul>
            </div>
        </section>

        <!-- GRUPO 6: PERSONALIZAÇÃO -->
        <section id="personalizacao" class="fullscreen-section theme-glass layout-split zigzag-right" style="--theme-color: #d4af37;">
            <div class="section-media" data-service-folder="personalizacao">
                <img src="assets/placeholder-industrial.webp" alt="Personalização">
            </div>
            <div class="content glass-panel" style="--service-icon: 'fingerprint';">
                <h1>Personalização</h1>
                <ul class="service-list">
                    <li data-service="gravacao-laser">Gravação Laser</li>
                    <li data-service="gravacao-fresa">Gravação (incisão) por fresa</li>
                    <li data-service="impressao-uv">Impressão directa nos materiais</li>
                </ul>
            </div>
        </section>

        <section id="contacto" class="fullscreen-section theme-glass" style="--theme-color: #d4af37;">
            <div class="content glass-panel" style="--service-icon: 'alternate_email';">
                <h1>Fale Connosco</h1>
                <p>Estamos prontos para transformar a sua ideia em realidade.</p>
                <button class="details-btn" data-service="contacto">Ver Detalhes</button>
            </div>
        </section>
"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Atualizar o Menu Lateral (side-nav)
new_nav = """    <nav id="side-nav">
        <ul>
            <li><a href="#hero-4winners" class="active" data-name="Home"><span class="dot"></span></a></li>
            <li><a href="#design" data-name="Design"><span class="dot"></span></a></li>
            <li><a href="#manufatura-aditiva" data-name="Manufactura Aditiva"><span class="dot"></span></a></li>
            <li><a href="#manufatura-subtrativa" data-name="Manufatura Subtrativa"><span class="dot"></span></a></li>
            <li><a href="#conformacao" data-name="Conformação"><span class="dot"></span></a></li>
            <li><a href="#acabamento" data-name="Acabamento"><span class="dot"></span></a></li>
            <li><a href="#personalizacao" data-name="Personalização"><span class="dot"></span></a></li>
            <li><a href="#contacto" data-name="Contacto"><span class="dot contact-dot"></span></a></li>
        </ul>
    </nav>"""
content = re.sub(r'<nav id="side-nav">.*?</nav>', new_nav, content, flags=re.DOTALL)

# 2. Atualizar os Background Layers (cores de fundo ao fazer scroll)
new_layers = """    <div id="background-layers">
        <div class="layer" id="layer-hero-4winners" style="background-color: #000000;" data-section="hero-4winners"></div>
        <div class="layer" id="layer-design" style="background-color: #050505;" data-section="design"></div>
        <div class="layer" id="layer-manufatura-aditiva" style="background-color: #050505;" data-section="manufatura-aditiva"></div>
        <div class="layer" id="layer-manufatura-subtrativa" style="background-color: #050505;" data-section="manufatura-subtrativa"></div>
        <div class="layer" id="layer-conformacao" style="background-color: #050505;" data-section="conformacao"></div>
        <div class="layer" id="layer-acabamento" style="background-color: #050505;" data-section="acabamento"></div>
        <div class="layer" id="layer-personalizacao" style="background-color: #050505;" data-section="personalizacao"></div>
        <div class="layer" id="layer-contacto" style="background-color: #050505;" data-section="contacto"></div>
    </div>"""
content = re.sub(r'<div id="background-layers">.*?</div>\s*<main', new_layers + '\n\n    <main', content, flags=re.DOTALL)

# 3. Substituir os serviços mantendo o Hero e o fim da tag main
# Encontrar onde acaba a secção do hero (</section>) e começa a secção de contacto (</main>)
hero_end_idx = content.find('</section>', content.find('id="hero-4winners"')) + 10
main_end_idx = content.find('</main>')

# O novo conteúdo da tag main é o hero original + os novos grupos
new_main_content = content[:hero_end_idx] + '\n\n' + new_groups_html + '\n        <div style="height: 25vh;"></div>\n    '

content = new_main_content + content[main_end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Edição Cirúrgica concluída: Logótipo intacto, Menu e Grupos V3 atualizados.")
