import Game from "./src/Game.js"
const game = new Game()

function loop() {
    let alive = game.turn()
    if (!alive) {
        console.log("YOU LOST YOU POTATOE")
        process.exit()
    }
    setTimeout(loop, 32)
}
loop()