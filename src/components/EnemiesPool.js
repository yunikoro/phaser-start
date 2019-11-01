import Phaser from 'phaser'
import Enemy from './Enemy'

export default class EnemiesPool extends Phaser.Physics.Arcade.Group {
    constructor({ scene, config }) {
        const { maxSize = 8 } = config
        super(scene.physics.world, scene)
        this.scene = scene
        this.maxSize = maxSize

        this.curIdx = 0
        this.curFlyIdx = 0
    }
    plant() {
        const curSize = this.getChildren().length
        if(this.curIdx < this.maxSize - curSize) {
            const { width } = this.scene.game.config
            const x = Phaser.Math.Between(0, width)
            const randSeed = Math.random()
            let type = ''
            if(randSeed < 0.2) {
                type = 'bgPlane'
            } else if(randSeed >= 0.2 && randSeed < 0.5) {
                type = 'mdPlane'
            } else {
                type = 'smPlane'
            }
            const enemy = new Enemy({
                scene: this.scene,
                config: {
                    x,
                    y: -30,
                    type
                }
            })
            this.add(enemy)
            enemy.emission()
            this.curIdx++
        } else {
            this.curIdx = 0
        }
    }
    reFly() {
        const curSize = this.getChildren().length
        if(this.curFlyIdx < curSize) {
            const { height, width } = this.scene.game.config
            const enemy = this.getChildren()[this.curFlyIdx]
            if(enemy.y > height + 10) {
                const x = Phaser.Math.Between(0, width)
                enemy.x = x
                enemy.y = -30
            }
            this.curFlyIdx++
        } else {
            this.curFlyIdx = 0
        }
    }
    updateTick(delta) {
        const enemies = this.getChildren()
        enemies.forEach(enemy => {
            enemy.tick(delta)
        })
    }
    checkFire(fireHandler = () => {}) {
        const curSize = this.getChildren().length
        if(this.curFlyIdx < curSize) {
            const enemy = this.getChildren()[this.curFlyIdx]
            
            enemy.tickFire(fireHandler)
            
            this.curFlyIdx++
        } else {
            this.curFlyIdx = 0
        }
    }
}