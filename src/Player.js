import keypress from 'keypress'
import Map from './Map.js';
import Shot from './Shot.js';
import Displayable from './Displayable.js';
import Bonus from './Bonus.js';
class Player extends Displayable {
    #updating;
    #map
    #range

    constructor() {
        super(0, 0)
        this.#updating = false
        this.#range = 3

        keypress(process.stdin);
        var that = this
        process.stdin.on('keypress', function (ch, key) {
            if (key && key.ctrl && key.name == 'c') {
                process.exit()
            }
            if (key && key.name === 'down' &&
             !that.#updating && (that._y + 1) < Map.HEIGHT) {
                that.#updating = true
                that.increaseY()
                return
            }
            if (key && key.name === 'up' && !that.#updating && that._y > 0) {
                that.#updating = true
                that.decreaseY()
                return
            }
            if (key && key.name === 'right' &&
             !that.#updating && (that._x + 1) < Map.WIDTH) {
                that.#updating = true
                that.increaseX()
                return
            }
            if (key && key.name === 'left' && !that.#updating && that._x > 0) {
                that.#updating = true
                that.decreaseX()
                return
            }
            if (key && key.name === 'd') {
                that.shoot(that._x + 1, that._y, 0)
                return
            }
            if (key && key.name === 's') {
                that.shoot(that._x, that._y + 1, 1)
                return
            }
            if (key && key.name === 'a') {
                that.shoot(that._x - 1, that._y, 2)
                return
            }
            if (key && key.name === 'w') {
                that.shoot(that._x, that._y - 1, 3)
                return
            }
            

        });
        process.stdin.setRawMode(true);
        process.stdin.resume()

    }

    increaseX() {
        this.setX(this._x + 1)
        this.#updating = false
    }

    increaseY() {
        this.setY(this._y + 1)
        this.#updating = false
    }

    decreaseX() {
        this.setX(this._x - 1)
        this.#updating = false
    }

    decreaseY() {
        this.setY(this._y - 1)
        this.#updating = false
    }

    setMap(map) {
        this.#map = map
    }
    shoot(x, y, direction) {
        const shot = new Shot(x, y ,direction, this.#range)
        this.#map.shotFired(shot)
    }

    getRange() {
        return this.#range
    }

    catchBonus(bonus) {
        switch (bonus.getType()) {
            case Bonus.RANGE:
                if (this.#range < 6) this.#range++
                break;
        }
    }
}

export default Player