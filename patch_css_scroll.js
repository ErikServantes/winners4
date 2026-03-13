const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// The issue: "overflow-y: hidden" on body/html was meant to hide the double scrollbar when Lenis is running.
// BUT, Lenis explicitly handles this if smoothTouch: false. In touch devices, Lenis relies on NATIVE scroll (because smoothTouch is false).
// If body has overflow-y: hidden, native scroll is completely disabled! Therefore, mobile devices cannot scroll AT ALL.

code = code.replace(
    `    /* Evita scroll horizontal causado pelos canvas */
    overflow-y: hidden; /* Scroll nativo escondido pelo Lenis, elimina a barra dupla */`,
    `    /* IMPORTANTE: Em mobile (onde o Lenis desativa o smooth e usa o scroll nativo), o overflow-y não pode ser hidden! */
    overflow-y: auto; 
    overflow-x: hidden;`
);

fs.writeFileSync('style.css', code);
