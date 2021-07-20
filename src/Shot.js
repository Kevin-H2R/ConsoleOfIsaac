import Displayable from "./Displayable.js"
class Shot extends Displayable {
    #direction
    #updateCounter
    #updateRate
    #range
    #traveled

    constructor(x, y, direction, range) {
        super(x, y)
        this.#direction = direction
        this.#updateRate = 1
        this.#updateCounter = this.#updateRate
        this.#range = range
        this.#traveled = 1
    }

    getDirection() {
        return this.#direction
    }
    update() {
        if (this.#updateCounter < this.#updateRate) {
            this.#updateCounter ++
            return
        }
        this.#updateCounter = 0
        if (this.#traveled === this.#range) {
            this._x = -1 // ugly AF
            return
        }
        this.#traveled++
        if (this.#direction === 0) {
            this._x++
            return
        }
        if (this.#direction === 1) {
            this._y++
            return
        }
        if (this.#direction === 2) {
            this._x--
            return
        }
        if (this.#direction === 3) {
            this._y--
        }
    }
}

export default Shot