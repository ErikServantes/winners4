const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

code = code.replace(
    `@media (max-width: 768px) {
    #main-logo-container {
        /* No telemóvel, o logótipo sobe muito mais em relação ao centro (e em relação à frase) */
        transform: translateY(-8vh);
    }
}`,
    `@media (max-width: 768px) {
    #main-logo-container {
        /* Metade da distância exagerada que tínhamos colocado (era -8vh, passou para -6.5vh) */
        transform: translateY(-6.5vh);
    }
}`
);

fs.writeFileSync('style.css', code);
