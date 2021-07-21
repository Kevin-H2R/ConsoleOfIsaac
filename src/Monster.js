import Displayable from "./Displayable.js";

class Monster extends Displayable {
    #updateRate
    #updateCounter
    constructor(x, y) {
        super(x, y, 'm')
        this.#updateRate = 20
        this.#updateCounter = this.#updateRate
    }

    getUpdateRate() {
        return this.#updateRate
    }

    getUpdateCounter() {
        return this.#updateCounter
    }

    inscreaseUpdateCounter() {
        this.#updateCounter++
    }
    initUpdateCounter() {
        this.#updateCounter = 0
    }
}

export default Monster