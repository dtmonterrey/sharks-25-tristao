var canvas = document.getElementById('canvas')
const width = 640; const height = 480;
function randomHeight() {
    return Math.round(Math.random() * (height) / 3) * -1 + height
}

function drawTerrain(breaks) {
    const ctx = canvas.getContext('2d')
    // início
    ctx.beginPath()
    ctx.moveTo(0, 400)
   
    // quebras intermédias
    const segmento = width / breaks
    for (let i = 1; i < breaks; i++) {
        ctx.lineTo(segmento * i, randomHeight())
    }
    // fim
    ctx.lineTo(width, 400)
    
    // fechar caixa
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)

    // preencher chão
    ctx.closePath()
    ctx.fillStyle = 'grey'
    ctx.fill()
}

drawTerrain(8)