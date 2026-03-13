const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// O utilizador reparou que algo alterou o desktop (provavelmente a reparação da string mal formatada "\n#main-logo-container {\n" no último patch fê-lo parecer diferente, ou o facto de ter mexido nas margens top sem pensar).
// O objetivo é: a distância entre o logo e o texto deve ser o equivalente a 1.5x a altura da linha do texto, em AMBOS os casos (desktop e telemóvel), e devemos parar de tentar "puxar para cima" o logótipo para ganhar margens, devemos sim usar margens reais entre os dois elementos.

// O "line-height" global do texto (#hero-subtitle) é 1.5. 
// No Desktop, font-size é 1.2rem. A altura da linha será 1.2 * 1.5 = 1.8rem.
// O utilizador quer que a margem seja 1.5x a altura da linha.
// Margem = 1.8rem * 1.5 = 2.7rem.
// 2.7rem = ~43.2px (assumindo 1rem=16px).
// Estava margin-top: 60px no Desktop. Se pusermos 2.7rem (ou 45px), ficará proporcional. E podemos usar a unidade "em" para ser perfeito!
// Se usarmos margin-top: 2.25em; (porque line-height é 1.5, e queremos 1.5x line-height -> 1.5 * 1.5 = 2.25em).

// No Mobile, font-size é 0.9rem.
// Como queremos "1.5x a altura da linha", e line-height é herdado como 1.5,
// A margem continua a ser rigorosamente 2.25em no mobile! 
// Desta forma o CSS escala automaticamente a distância em relação ao tamanho da fonte!

// Vamos limpar as acrobacias do "transform" e fixar o margin-top para ser puramente baseado na tipografia.

code = code.replace(
    `#hero-subtitle {
    font-size: 1.2rem; /* Was around 2rem or inheriting large sizes, now 40% smaller */
    letter-spacing: 2px;
    margin-top: 60px; /* Increased distance from the logo */
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7); /* Slightly muted to let the golden logo shine */
}

@media (max-width: 768px) {
    #hero-subtitle {
        font-size: 0.9rem; /* Even smaller on mobile */
        margin-top: 30px;
    }
}`,
    `#hero-subtitle {
    font-size: 1.2rem; /* Was around 2rem or inheriting large sizes, now 40% smaller */
    letter-spacing: 2px;
    /* Distância equivalente a 1.5x a altura da linha (line-height é 1.5, logo 1.5 * 1.5 = 2.25em) */
    margin-top: 2.25em;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7); /* Slightly muted to let the golden logo shine */
}

@media (max-width: 768px) {
    #hero-subtitle {
        font-size: 0.9rem; /* Even smaller on mobile */
        /* Como usamos 'em', a margem encolhe automaticamente com a fonte no telemóvel! */
        margin-top: 2.25em; 
    }
}`
);

code = code.replace(
    `/* Move the logo container higher on the screen */
#main-logo-container {
    transform: translateY(-5vh); /* Moves the logo 5% of the viewport height upwards */
}

@media (max-width: 768px) {
    #main-logo-container {
        /* Metade da distância exagerada que tínhamos colocado (era -8vh, passou para -6.5vh) */
        transform: translateY(-6.5vh);
    }
}`,
    `/* O logótipo sobe de igual forma em todo o lado para centralizar o grupo (Logo+Texto) verticalmente */
#main-logo-container {
    transform: translateY(-5vh);
}`
);

fs.writeFileSync('style.css', code);
