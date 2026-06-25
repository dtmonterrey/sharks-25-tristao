import { drawTerrain } from './terreno.js'
import spaceship from './spaceship.js'

const nave = spaceship.nave

export async function init() {
    drawTerrain(8);

    // carregar nave
    nave.image = new Image()
    nave.image.src = nave.sprite
    return nave.image.decode()

}
