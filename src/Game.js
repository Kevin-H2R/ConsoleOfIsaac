import Map from "./Map.js"
import Monster from "./Monster.js";
import Player from "./Player.js";

class Game {
    #map
    #player
    #monsterSpawnCooldown
    #turnSinceLastMonsterSpawn
    #monsterKills

    constructor() {
        this.#map = new Map(this)
        this.#player = new Player()
        this.#player.setMap(this.#map)
        this.#monsterSpawnCooldown = 15
        this.#turnSinceLastMonsterSpawn = 15
        this.#monsterKills = 0
    }

    turn() {
        this.#spawnMonster()
        this.#map.display(this.#player)
        this.#displayStats()
        const x = this.#player.getX()
        const y = this.#player.getY()

        const monsters = this.#map.getMonsters()
        for (let i = 0; i < monsters.length; ++i) {
            const monster = monsters[i]
            if (monster.getX() === x && monster.getY() === y) {
                return false
            }
        }

        const bonuses = this.#map.getBonuses()
        for (let i = 0; i < bonuses.length; ++i) {
            const bonus = bonuses[i]
            if (bonus.getX() === x && bonus.getY() === y) {
                this.#player.catchBonus(bonus)
                this.#map.removeBonus(i)
                break
            }
        }
        return true 
    }

    killMonster() {
        this.#monsterKills++
    }

    #spawnMonster() {
        if (this.#map.getMonstersCount() > 2) {
            return
        }
        if (this.#turnSinceLastMonsterSpawn < this.#monsterSpawnCooldown) {
            this.#turnSinceLastMonsterSpawn++
            return
        }
        this.#turnSinceLastMonsterSpawn = 0
        let randomX = Math.floor(Math.random() * Map.WIDTH)
        let randomY = Math.floor(Math.random() * Map.HEIGHT)
        while (randomX === this.#player.getX() && randomY === this.#player.getY()) {
            randomX = Math.floor(Math.random() * Map.WIDTH)
            randomY = Math.floor(Math.random() * Map.HEIGHT)
        }
        const monster = new Monster(randomX, randomY)
        this.#map.spawnMonster(monster)
    }

    #displayStats() {
        let statsString = "range: " + this.#player.getRange() + "\n"
        statsString += "m: x" + this.#monsterKills
        console.log(statsString)
    }

}

export default Game