import globals from './globals.js'
import { terrain } from './terreno.js'

const ctx = globals.ctx
const width = globals.width

const gravity = 9

const nave = {
    sprite: {
        nave: "/Imagens/foguete.png",
        explosao: "/Imagens/foguete_explosao.png",
    },
    image: {
        nave: null,
        explosao: null,
    },
    ship: null,
    width: 50,
    height: 104,
    posx: 0,
    posy: 0,
    momentumx: 0,
    momentumy: 0,
    bottom: () => {
        return nave.posy + nave.height
    }, 
    middle: () => {
        return nave.posx + nave.width / 2
    },
    draw: () => {
        ctx.drawImage(nave.ship, nave.posx, nave.posy, nave.width, nave.height)
    },
    react: () => {
        // clear canvas
        ctx.clearRect(nave.posx, nave.posy, nave.width, nave.height)
        // calculate new position
        nave.momentumy += gravity
        nave.posy += nave.momentumy 
        const colision = terrain.checkColision(nave.middle(), nave.bottom())
        if (colision) {
            nave.posy = colision - nave.height
            nave.ship = nave.image.explosao
            console.log('COLISION ' + colision)
        }
        console.log(nave.posy)
        // redraw
        nave.draw()
    }
}
nave.posx = (width / 2) - (nave.width / 2)

export default {
    nave: nave
}