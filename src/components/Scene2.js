import Phaser from 'phaser'
import AcceCaler from './AcceCaler'
import FpsIndicator from './FpsIndicator'
import ShootTicker from './ShootTicker'
import Bullet from './Bullet'
import PowerUp from './PowerUp'
import EnemiesPool from './EnemiesPool'
import WanderShotPool from './WanderShotPool'
import AnimationLoader from './AnimationLoader'
import Enemy from './Enemy'

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame')
        this.acceCaler = new AcceCaler({
            scene: this,
        })
        this.fpsIndicator = new FpsIndicator({
            scene: this,
        })
        this.shootTicker = new ShootTicker({
            scene: this,
        })
    }
    create() {
        const { width, height } = this.game.config

        new AnimationLoader({
            scene: this
        })

        this.add.text(20, 20, 'Playing game... 玩游戏', {font: '25px Arial', fill: 'yellow'})
        this.background = this.add.tileSprite(0, 0, width, height, 'background')
        this.background.setOrigin(0, 0)

        this.fire = this.add.sprite(width / 2 + 50, height / 2, 'explosion')
        this.ship = this.physics.add.sprite(width / 2, 2 * height / 3, 'ship')
        
        // this.bgPlane.setInteractive()
        // this.mdPlane.setInteractive()
        // this.smPlane.setInteractive()

        // this.input.on('gameobjectdown', this.booming, this)

        

        this.enemiesPool = new EnemiesPool({
            scene: this,
            config: {
                maxSize: 16,
            }
        })
        this.wanderShotPool = new WanderShotPool({
            scene: this
        })

        this.powerUps = this.physics.add.group()
        const maxObject = 4
        for (let i = 0; i < maxObject; i++) {
            const powerUp = new PowerUp({
                scene: this,
                config: {}
            })
            this.powerUps.add(powerUp)
            powerUp.setRandomPosition(0, 0, width, height)

            if (Math.random() > 0.5) {
                powerUp.setType('red')
            } else {
                powerUp.setType('blue')
            }

            powerUp.setVelocity(100, 100)
            powerUp.setCollideWorldBounds(1)
            powerUp.setBounce(0.98)
        }

        this.text = this.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' })
        
        this.projectiles = this.physics.add.group()

        this.physics.add.overlap(this.projectiles, this.enemiesPool, (projectiles, enemy) => {
            projectiles.destroy()
            enemy.health -= 1
            if(enemy.health <= 0) {
                this.booming(enemy, () => {
                    enemy.destroy()
                })
            }
        })
        this.physics.add.overlap(this.ship, this.powerUps, (ship, powerUp) => {
            powerUp.disableBody(true, true)
            // powerUp.destroy()
        }, null, this)

        this.acceCaler.calAcce()

    }
    update(time, delta) {
        this.enemiesPool.plant()
        this.enemiesPool.reFly()
        this.enemiesPool.updateTick(delta)
        this.enemiesPool.checkFire(cannonConfig => {
            this.wanderShotPool.fire(cannonConfig)
        })
        this.wanderShotPool.release()
        this.background.tilePositionY -= 1
        this.fire.anims.play('explo', true)
        this.tiller()
        this.shooting(delta)
        this.recycle()
        this.fpsIndicator.calFps(delta)
    }
    booming(gameObj, handler = () => {}) {
        gameObj.setTexture('explosion')
        // gameObj.stop()
        gameObj.anims.play('explo', true)
        gameObj.once('animationcomplete', handler)
    }
    shooting(delta) {
        this.shootTicker.tick(delta, () => {
            const bullet = new Bullet(this)
        })
    }
    recycle() {
        const projectChildren = this.projectiles.getChildren()
        if (!this.bulletIdx || this.bulletIdx >= projectChildren.length) {
            this.bulletIdx = 0
        }
        if (projectChildren.length == 0) {
            return
        }

        projectChildren[this.bulletIdx].update()
        this.bulletIdx++
    }
    tiller(cb = () => {}) {
        const { activePointer: pointer } = this.input
        this.ship.x += this.acceCaler.acce.x * 1.25
        this.ship.y += this.acceCaler.acce.y * 1.25
    }
}