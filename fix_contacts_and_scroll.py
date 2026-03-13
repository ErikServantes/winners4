import re

# Update modal.js
with open('modules/modal.js', 'r') as f:
    modal_content = f.read()

modal_content = modal_content.replace("geral@4winners.pt", "geral@4winners.com.pt")
modal_content = modal_content.replace("'Rua do Barqueiro 754, 4805-016 Barco'", "'Rua do Barqueiro 754, 4805-016 Barco - GMR'")
modal_content = modal_content.replace("Rua+do+Barqueiro+754,+4805-016+Barco", "Rua+do+Barqueiro+754,+4805-016+Barco+-+GMR")

with open('modules/modal.js', 'w') as f:
    f.write(modal_content)

# Update script.js
with open('script.js', 'r') as f:
    script_content = f.read()

old_anchor_logic = """    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = targetId === '#' ? null : document.querySelector(targetId);
            
            if (targetElement) {
                // Usa o motor Lenis (que está disponível globalmente através do módulo smooth-scroll)
                // para fazer o scroll suave até ao destino
                window.lenis?.scrollTo(targetElement);
            }
        });
    });"""

new_anchor_logic = """    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignora links que são apenas "#" (para os modais não serem afetados)
            if (!targetId || targetId === '#') return; 
            
            e.preventDefault();
            
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.lenis?.scrollTo(targetElement);
                }
            } catch (err) {
                // Se o utilizador clicar num anchor inválido, ignora silenciosamente
                // em vez de rebentar com o erro 'querySelector' no terminal
            }
        });
    });"""

if old_anchor_logic in script_content:
    script_content = script_content.replace(old_anchor_logic, new_anchor_logic)
else:
    print("WARNING: Exact match for anchor logic not found in script.js")

with open('script.js', 'w') as f:
    f.write(script_content)

print("Updates applied.")
