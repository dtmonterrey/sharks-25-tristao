import { canvas, width, height } from './globals.js'

function randomHeight() {
    // Mantém o terreno no terço inferior para não ocupar a tela toda
    return Math.round(Math.random() * (height / 3)) * -1 + height;
}

export function drawTerrain(breaks) {
    
    const ctx = canvas.getContext('2d');
    const segmento = width / breaks;

    let currentY = 400;
    let flats = [];

    ctx.beginPath();
    ctx.moveTo(0, currentY);

    for (let i = 1; i < breaks; i++) {
        let previousY = currentY;

        if (flats.length < 3 && (Math.random() < 0.4 || i > breaks - 4)) {
            // Store flat segment coordinates
            flats.push({
                x1: segmento * (i - 1),
                y1: currentY,
                x2: segmento * i,
                y2: currentY
            });
        } else {
            currentY = randomHeight();
        }

        ctx.lineTo(segmento * i, currentY);
    }

    ctx.lineTo(width, 400);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);

    ctx.fillStyle = 'grey';
    ctx.fill();

    // Draw landing pads in white
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;

    flats.forEach(flat => {
        ctx.beginPath();
        ctx.moveTo(flat.x1, flat.y1);
        ctx.lineTo(flat.x2, flat.y2);
        ctx.stroke();
    });
}