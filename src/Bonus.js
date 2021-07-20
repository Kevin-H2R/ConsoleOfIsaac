import Displayable from "./Displayable.js";

class Bonus extends Displayable {
    static RANGE = 1
    static types = [Bonus.RANGE]
    #type
    constructor(x, y) {
        super(x, y)
        this.#type = Bonus.types[Math.floor(Math.random() * Bonus.types.length)]
    }

    getType() {
        return this.#type
    }
}

export default Bonus