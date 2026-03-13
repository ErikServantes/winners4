with open('style.css', 'r') as f:
    css_content = f.read()

# Substituir a instrução perigosa overflow-y: scroll por overflow-y: auto ou hidden se o Lenis a causar
# Lenis necessita do body para o seu scroll virtual, logo overflow-y forçado costuma duplicar
css_content = css_content.replace("    overflow-y: scroll;\n", "    overflow-y: hidden; /* Scroll nativo escondido pelo Lenis, elimina a barra dupla */\n")

# Lenis styling
if ".lenis.lenis-smooth" not in css_content:
    lenis_styles = """
/* Esconder de vez barras de scroll nativas durante scroll virtual */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
"""
    css_content += lenis_styles

with open('style.css', 'w') as f:
    f.write(css_content)

print("Double scrollbar fix applied.")
