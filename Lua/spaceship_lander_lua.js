import { init } from './init.js'
import spaceship from './spaceship.js'

const nave = spaceship.nave

function mainLoop() {
    console.log('looping ' + Date.now())
    nave.react() 
    setTimeout(mainLoop, 1000);
}

init().then( () => {
    mainLoop()
})