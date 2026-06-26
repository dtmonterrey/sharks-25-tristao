import globals from './globals.js'
import { terrain } from './terreno.js'

const ctx = globals.ctx
const width = globals.width

const gravity = 0.5
const thruster_up = 0.7
const thruster_left = 1
const thruster_right = 1

const NORMAL = 1
const LANDED = 0
const COLISION = -1
const UP = 2
const LEFT = 3
const RIGHT = 4

export const statuses = {
    NORMAL: NORMAL,
    LANDED: LANDED,
    COLISION: COLISION,
    UP: UP,
    LEFT: LEFT,
    RIGHT: RIGHT,
}

const nave = {
    sprite: {
        nave: "/Imagens/foguete.png",
        explosao: "/Imagens/foguete_explosao.png",
        landed: "/Imagens/foguete_landed.png",
        up: "/Imagens/foguete_up.png",
        left: "/Imagens/foguete_left.png",
        right: "/Imagens/foguete_right.png",
    },
    image: {
        nave: null,
        explosao: null,
        landed: null,
        up: null,
        left: null,
        right: null,
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
            case UP:
                nave.ship = nave.image.up
                nave.momentumy -= thruster_up
                break
            case LEFT:
                nave.ship = nave.image.left
                nave.momentumx += thruster_left
                break
            case RIGHT:
                nave.ship = nave.image.right
                nave.momentumx -= thruster_right 
                break
            case NORMAL:
                nave.ship = nave.image.nave
            default:
                break
        }
        console.log(nave.momentumy)
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

        // calculate new vertical position
        nave.momentumy += gravity
        nave.posy += nave.momentumy 
        // check for landing
        const landed = terrain.checkLanded(nave.middle(), nave.bottom())
        if (landed) {
            nave.posy = landed - nave.height
            nave.setStatus(LANDED)
        } else {
            // check for a colision
            const colision = terrain.checkColision(nave.middle(), nave.bottom())
            if (colision) {
                nave.posy = colision - nave.height
                nave.setStatus(COLISION)
            } 
        }
        
        // calculate new horizontal position
        nave.posx += nave.momentumx

        // redraw
        nave.draw()
    }
}
nave.posx = (width / 2) - (nave.width / 2)

export default {
    nave: nave
}