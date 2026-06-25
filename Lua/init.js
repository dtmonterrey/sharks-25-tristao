import { drawTerrain } from './terreno.js'
import spaceship from './spaceship.js'

const nave = spaceship.nave

export async function init() {
    drawTerrain(8);

    // carregar nave
    // normal
    nave.image.nave = new Image()
    nave.image.nave.src = nave.sprite.nave
    await nave.image.nave.decode()
    nave.ship = nave.image.nave
    // explosao
    nave.image.explosao = new Image()
    nave.image.explosao.src = nave.sprite.explosao
    await nave.image.explosao.decode()
    // landed
    nave.image.landed = new Image()
    nave.image.landed.src = nave.sprite.landed
    await nave.image.landed.decode()
    // up
    nave.image.up = new Image()
    nave.image.up.src = nave.sprite.up
    await nave.image.up.decode()
    // left
    nave.image.left = new Image()
    nave.image.left.src = nave.sprite.left
    await nave.image.left.decode()
    // right
    nave.image.right = new Image()
    nave.image.right.src = nave.sprite.right
    return nave.image.right.decode()
}
