import spaceship, { statuses } from "./spaceship.js"

const nave = spaceship.nave

document.addEventListener("keydown", (ev) => {
    console.log(ev)
    switch (ev.key) {
        case 'ArrowUp':
            nave.setStatus(statuses.UP)
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