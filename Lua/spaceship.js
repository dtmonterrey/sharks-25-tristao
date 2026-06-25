import globals from './globals.js'

const ctx = globals.ctx
const width = globals.width
const gravity = 9

const nave = {
    sprite: "/Imagens/foguete.png",
    image: null,
    width: 50,
    height: 104,
    posx: 0,
    posy: 0,
    momentumx: 0,
    momentumy: 0,
    draw: () => {
        ctx.drawImage(nave.image, nave.posx, nave.posy, nave.width, nave.height)
    },
    react: () => {
        // clear canvas
        ctx.clearRect(nave.posx, nave.posy, nave.width, nave.height)
        // calculate new position
        nave.momentumy += gravity
        nave.posy += nave.momentumy 
        if (nave.posy - nave.height > 400) {
            nave.posy = 400 - nave.height
        }
        // redraw
        nave.draw()
    }
}
nave.posx = (width / 2) - (nave.width / 2)

export default {
    nave: nave
}