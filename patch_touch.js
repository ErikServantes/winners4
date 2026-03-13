const fs = require('fs');
let code = fs.readFileSync('modules/modal.js', 'utf8');

// The touchmove listener on the window is too aggressive, it intercepts all touch moves on the screen when the modal is open, even outside the container.
// If isDragging is false, we early return, so we don't prevent default. BUT wait, is the problem the whole page scroll when modal is closed, or scroll inside the modal when it's open?
// Actually, if the user touches OUTSIDE the 360 container, isDragging is false, so it returns immediately and does NOT call preventDefault().
// However, maybe the issue is that something else broke the scroll? Let's check when Lenis is running or if the body overflow changed.
