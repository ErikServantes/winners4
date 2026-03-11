import re

with open('modules/modal.js', 'r') as f:
    content = f.read()

new_services = """
    'quinagem': {
        title: 'Quinagem',
        description: 'A quinagem é um processo de dobragem de chapas de metal utilizando prensas dobradeiras (quinadoras). Permite criar ângulos e formas complexas com alta precisão e repetibilidade.',
        materials: ['Ferro', 'Inox', 'Alumínio']
    },
    'calandragem': {
        title: 'Calandragem',
        description: 'A calandragem é um processo contínuo de curvatura de chapas metálicas que passam por rolos. É utilizado para formar cilindros, cones e outras formas circulares a partir de chapas planas.',
        materials: ['Ferro', 'Inox', 'Alumínio']
    },
"""

# Insert new services before 'contacto'
content = content.replace("    'contacto': {", f"{new_services}    'contacto': {{")

with open('modules/modal.js', 'w') as f:
    f.write(content)
