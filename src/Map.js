import Monster from "./Monster.js"
import Player from "./Player.js"
import Bonus from "./Bonus.js"
class Map {
    static HEIGHT = 10
    static WIDTH = 10

    #shots
    #monsters
    #bonuses
    #game

    constructor(game) {
        this.#shots = []
        this.#monsters = []
        this.#bonuses = []
        this.#game = game
    }

    display(player) {
        let displayString = this.#displayMap()
        
        displayString = this.#displayBonuses(displayString)
        displayString = this.#positionPlayer(
            displayString, player.getX(), player.getY()
        )
        displayString = this.#displayShots(displayString)
        displayString = this.#displayMonsters(displayString, player)
        console.log(displayString)
    }

    shotFired(shot) {
        this.#shots.push(shot)
    }

    spawnMonster(monster) {
        this.#monsters.push(monster)
    }

    getMonstersCount() {
        return this.#monsters.length
    }

    getMonsters() {
        return this.#monsters
    }

    getBonuses() {
        return this.#bonuses
    }

    removeBonus(index) {
        this.#bonuses.splice(index, 1)
    }

    #displayMap() {
        console.clear()
        let displayString = ""
        for (let j = -1; j < Map.HEIGHT + 1; ++j) {
            for (let i = -1; i < Map.WIDTH + 1; ++i) {
                if (j === -1 || j === Map.HEIGHT) {
                    displayString += ' ― '
                } else if (i === -1 || i === Map.HEIGHT) {
                    displayString += ' | '
                } else {
                    displayString += '   '
                }
                
                if (i === Map.WIDTH) {
                    displayString += '\n'
                }
            }
        }

        return displayString
    }

    #positionPlayer(str, x, y) {
        return this.#positionElement(str, x, y, 'P')
    }

    #positionMonster(str, monster) {
        return this.#positionElement(str, monster.getX(), monster.getY(), 'm')
    }

    #positionBonus(str, bonus) {
        return this.#positionElement(str, bonus.getX(), bonus.getY(), '◯')
    }

    #positionElement(str, x, y, c) {
        const yOffset = (y + 1) * ((Map.WIDTH + 2) * 3 + 1)
        const xOffset = x * 3 + 5
        const index = xOffset + yOffset
        const result = str.substr(0, index - 1) + c + str.substr(index)
        return result
    }

    #getElementAtPos(str, x, y) {
        const yOffset = (y + 1) * ((Map.WIDTH + 2) * 3 + 1)
        const xOffset = x * 3 + 5
        const index = xOffset + yOffset
        return str[index]
    }

    #displayBonuses(str) {
        this.#bonuses.forEach(bonus => {
            str = this.#positionBonus(str, bonus)
        })
        return str
    }

    #displayMonsters(str, player) {
        this.#monsters.forEach(monster => {
            str = this.#positionMonster(str, monster)
            if (monster.getUpdateCounter() < monster.getUpdateRate()) {
                monster.inscreaseUpdateCounter()
                return
            }
            monster.initUpdateCounter()
            const mx = monster.getX()
            const my = monster.getY()
            const px = player.getX()
            const py = player.getY()
            const absX = Math.abs(mx - px)
            const absY = Math.abs(my - py)
            if (absX > absY) {
                if (mx > px && this.#getElementAtPos(str, mx - 1, my) !== 'm') {
                    monster.setX(mx - 1)
                } else if (this.#getElementAtPos(str, mx + 1, my) !== 'm') {
                    monster.setX(mx + 1)
                }
                return
            }
            if (my > py && this.#getElementAtPos(str, mx, my - 1) !== 'm') {
                monster.setY(my - 1)
            } else if (this.#getElementAtPos(str, mx, my + 1) !== 'm') {
                monster.setY(my + 1)
            }
        })

        return str
    }

    #displayShots(str) {
        let clonedArray = this.#shots.slice()
        for (let i = 0; i < clonedArray.length; ++i) {
            const shot = clonedArray[i]
            if (shot.getX() < 0 || shot.getX() > Map.WIDTH - 1 ||
                 shot.getY() < 0 || shot.getY() > Map.HEIGHT - 1) {
                this.#shots.splice(i, 1)
                continue
            }
            if (this.#checkCollision(shot)) {
                this.#shots.splice(i, 1)
                continue
            }
            let char = '|'
            if (shot.getDirection() % 2 === 0) {
                char = '―'
            }
            str = this.#positionElement(str, shot.getX(), shot.getY(), char)
            shot.update()
        }

        return str
    }

    #checkCollision(shot) {
        let clonedMonster = this.#monsters.slice()
        let hitMonster = false
        for (let i = 0; i < clonedMonster.length; ++i) {
            const monster = clonedMonster[i]
            if (monster.getX() === shot.getX() &&
             monster.getY() === shot.getY()) {
                this.#monsters.splice(i, 1)
                hitMonster = true
                this.#game.killMonster()
                const shouldDrop = Math.floor(Math.random() * 4)
                if (shouldDrop === 0) {
                    this.#bonuses.push(new Bonus(monster.getX(), monster.getY()))
                }
                break;
             }
        }
        return hitMonster
    }
}

export default Map