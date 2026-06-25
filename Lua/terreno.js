import globals from './globals.js'

const ctx = globals.ctx
const width = globals.width
const height = globals.height

function calcLinearParamA(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1)
}
function calcLinearParamB(x1, y1, a) {
    return y1 - (a * x1)
}
function isPointAboveSegment(x1, y1, x2, y2, x, y) {
    const a = calcLinearParamA(x1, y1, x2, y2)
    const b = calcLinearParamB(x1, y1, a)
    const calculated_y = a * x + b
    return {
        isAbove: y > calculated_y,
        colision_y: calculated_y
    }
}

export const terrain = {
    segments: [],
    checkColision: (x, y) => {
        let colision = false
        terrain.segments.forEach( (segment) => {
            if (!colision && x >= segment.x1 && x <= segment.x2) {
                const isAbove = isPointAboveSegment(segment.x1, -segment.y1, segment.x2, -segment.y2, x, -y)
                if (!isAbove.isAbove)
                colision = -isAbove.colision_y
            }
        })
        return colision
    }
}

function randomHeight() {
    // Mantém o terreno no terço inferior para não ocupar a tela toda
    let randomHeight = Math.round(Math.random() * (height / 3)) * -1 + height
    while (randomHeight >= height) {
        randomHeight = Math.round(Math.random() * (height / 3)) * -1 + height
    }
    return randomHeight
}

function generateTerrain(breaks) {
    const segment_len = width / breaks;
    const segments = []
    let flats = 0

    for (let i = 1; i <= breaks; i++) {
        if (flats < 2 && (Math.random() < 0.4 || i > breaks - 4)) {
            // adding a landing segment
            flats++ 
            if (segments.length === 0) {
                // first segment, special case
                let x1 = 0
                let y1 = randomHeight()
                let x2 = segment_len
                let y2 = y1
                segments.push({
                   x1: x1,
                   y1: y1,
                   x2: x2,
                   y2: y2,
                   landing: true
                })
            } else {
                const prev_segment = segments[i - 2]
                let x1 = prev_segment.x2
                let y1 = prev_segment.y2
                let x2 = x1 + segment_len
                let y2 = y1
                segments.push({
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    landing: true
                })
            }
        } else {
            // adding a random segment 
            if (segments.length === 0) {
                // first segment, special case
                let x1 = 0
                let y1 = randomHeight()
                let x2 = segment_len
                let y2 = randomHeight()
                segments.push({
                   x1: x1,
                   y1: y1,
                   x2: x2,
                   y2: y2,
                   landing: false
                })
            } else {
                const prev_segment = segments[i - 2]
                let x1 = prev_segment.x2
                let y1 = prev_segment.y2
                let x2 = x1 + segment_len
                let y2 = randomHeight()
                segments.push({
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    landing: false
                })
            }
        }
    }

    terrain.segments = segments
}

export function drawTerrain(breaks) {
    generateTerrain(breaks)
    
    // draw terrain
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    ctx.moveTo(terrain.segments[0].x1, terrain.segments[0].y1)
    terrain.segments.forEach(segment => {
        console.log(`segment landing ${segment.landing} (${segment.x1}, ${segment.y1})x(${segment.x2}, ${segment.y2})`) 
        // draw surface
        ctx.lineTo(segment.x2, segment.y2)
    }) 
    // finish the box and fill
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.stroke()
    ctx.fillStyle = 'lightgrey'
    ctx.fill()

    // draw landing segments
    ctx.beginPath()
    ctx.strokeStyle = 'yellow'
    ctx.lineWidth = 4;
    terrain.segments.forEach(segment => {
        if (segment.landing) {
            // draw landing segment
            ctx.moveTo(segment.x1, segment.y1)
            ctx.lineTo(segment.x2, segment.y2) 
        }
    }); 
    ctx.stroke() 

}
