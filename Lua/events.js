import spaceship, { statuses } from "./spaceship.js"

const nave = spaceship.nave

document.addEventListener("keydown", (ev) => {
    ev.preventDefault()
    switch (ev.key) {
        case 'ArrowUp':
            nave.setStatus(statuses.UP)
            break
        case 'ArrowLeft':
            nave.setStatus(statuses.LEFT)
           break 
        case 'ArrowRight':
            nave.setStatus(statuses.RIGHT)
           break 
    }
})

document.addEventListener("keyup", (ev) => {
    console.log(ev)
    switch (ev.key) {
        case 'ArrowUp':
            nave.setStatus(statuses.NORMAL)
            break
    }
})