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
    // landed
    nave.image.landed = new Image()
    nave.image.landed.src = nave.sprite.landed
    // wait for the download of the images
    return nave.image.nave.decode().then( () => {
        nave.ship = nave.image.nave
        nave.image.explosao.decode().then( () => {
            nave.image.landed.decode()
        })
    })

}
