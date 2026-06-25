import globals from './globals.js'
import { terrain } from './terreno.js'

const ctx = globals.ctx
const width = globals.width

const gravity = 9
const NORMAL = 1
const LANDED = 0
const COLISION = -1

const nave = {
    sprite: {
        nave: "/Imagens/foguete.png",
        explosao: "/Imagens/foguete_explosao.png",
        landed: "/Imagens/foguete_landed.png",
    },
    image: {
        nave: null,
        explosao: null,
        landed: null
    },
    ship: null,
    width: 50,
    height: 104,
    posx: 0,
    posy: 0,
    momentumx: 0,
    momentumy: 0,
    status: NORMAL,
    setStatus: (status) => {
        switch (status) {
            case COLISION:
                nave.ship = nave.image.explosao
                break
            case LANDED:
                nave.ship = nave.image.landed
                break
            case NORMAL:
                break
        }
        nave.status = status
    },
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
        if (nave.status === COLISION || nave.status === LANDED) return
        // clear canvas
        ctx.clearRect(nave.posx, nave.posy, nave.width, nave.height)
        // calculate new position
        nave.momentumy += gravity
        nave.posy += nave.momentumy 
        // check for landing
        const landed = terrain.checkLanded(nave.middle(), nave.bottom())
        if (landed) {
            nave.posy = landed - nave.height
            nave.setStatus(LANDED)
            console.log('LANDED ' + landed)
        } else {
            // check for a colision
            const colision = terrain.checkColision(nave.middle(), nave.bottom())
            if (colision) {
                nave.posy = colision - nave.height
                nave.setStatus(COLISION)
                console.log('COLISION ' + colision)
            } 
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