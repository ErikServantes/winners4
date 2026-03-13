const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// Subir mais o logótipo em relação à frase. Para manter a frase no sítio e aumentar a distância, temos de separar os dois.
// Atualmente, o subtitle tem "margin-top: 60px" (Desktop) e "margin-top: 30px" (Mobile).
// O container do logo "#main-logo-container" tem "transform: translateY(-5vh);" globalmente.
//
// Se queremos que o 4winners suba (e a frase fique no mesmo sítio absoluto no ecrã), podemos:
// 1. Manter a margin-top como está na frase para empurrá-la para baixo a partir do centro (onde o logo costumava estar).
// 2. Aplicar um transform maior no logótipo APENAS, para que ele suba mais.
// MAS, "margin-top" na frase empurra a frase para baixo do logótipo. Se o logótipo sobe usando transform, a frase não sabe que o logótipo subiu, a frase fica no sítio! (Porque transform não altera o layout flow).
//
// Espera, no HTML, o #hero-subtitle está dentro de .content, LOGO a seguir a #main-logo-container.
// Se aumentarmos "margin-top" no subtítulo, a frase VAI descer.
// Se aumentarmos a altura/padding-bottom do container do logótipo, a frase vai descer.
//
// Se queremos que o 4winners SUBa no telemóvel para afastar-se da frase:
// No desktop: main-logo-container -> translateY(-5vh)
// No mobile, podemos dar-lhe um translateY(-8vh) ou -10vh.

code = code.replace(
    `/* Move the logo container higher on the screen */\\n#main-logo-container {\\n    transform: translateY(-5vh); /* Moves the logo 5% of the viewport height upwards */\\n}`,
    `/* Move the logo container higher on the screen */
#main-logo-container {
    transform: translateY(-5vh); /* Moves the logo 5% of the viewport height upwards */
}

@media (max-width: 768px) {
    #main-logo-container {
        /* No telemóvel, o logótipo sobe muito mais em relação ao centro (e em relação à frase) */
        transform: translateY(-8vh);
    }
}`
);

// We need to fix the badly formatted string first "\n#main-logo-container {\n" in the source code.
code = code.replace(
    '/* Move the logo container higher on the screen */\\n#main-logo-container {\\n    transform: translateY(-5vh); /* Moves the logo 5% of the viewport height upwards */\\n}',
    `/* Move the logo container higher on the screen */
#main-logo-container {
    transform: translateY(-5vh);
}

@media (max-width: 768px) {
    #main-logo-container {
        transform: translateY(-10vh); /* Sobe o logótipo significativamente no telemóvel */
    }
    
    #hero-subtitle {
        font-size: 0.9rem;
        /* Aumentamos a margem ligeiramente para 50px para afastar visualmente a frase do logótipo */
        margin-top: 50px; 
    }
}`
);

fs.writeFileSync('style.css', code);
