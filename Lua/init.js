import { drawTerrain } from './terreno.js'
import spaceship from './spaceship.js'

const nave = spaceship.nave

export async function init() {
    drawTerrain(8);

    // carregar nave
    // normal
    nave.image.nave = new Image()
    nave.image.nave.src = nave.sprite.nave
    // explosao
    nave.image.explosao = new Image()
    nave.image.explosao.src = nave.sprite.explosao
    return nave.image.nave.decode().then( () => {
        nave.ship = nave.image.nave
        nave.image.explosao.decode()
    })

}
