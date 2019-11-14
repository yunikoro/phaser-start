import Phaser from 'phaser'
import AcceCaler from './AcceCaler'
import FpsDashBoard from './FpsDashBoard'
import ShootTicker from './ShootTicker'
import Bullet from './Bullet'
import PowerUp from './PowerUp'
import EnemiesPool from './EnemiesPool'
import WanderShotPool from './WanderShotPool'
import AnimationLoader from './AnimationLoader'
import BillBoard from './BillBoard'
import ScoreMeter from './ScoreMeter'

import { dpr } from '../config'

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame')
        this.score = 0
        this.dead = false
        this.acceCaler = new AcceCaler({
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

        this.background = this.add.tileSprite(0, 0, width, height, 'background')
        this.background.setOrigin(0, 0)
        this.background.setScale(dpr)

        // this.fire = this.add.sprite(width / 2 + 50, height / 2, 'explosion')
        this.ship = this.physics.add.sprite(width / 2, 2 * height / 3, 'ship')
        this.ship.setScale(dpr)
        
        // this.bgPlane.setInteractive()
        // this.mdPlane.setInteractive()
        // this.smPlane.setInteractive()

        // this.input.on('gameobjectdown', this.booming, this)

        

        this.enemiesPool = new EnemiesPool({
            scene: this,
            config: {
                maxSize: 10,
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
        
        this.projectiles = this.physics.add.group()

        this.physics.add.overlap(this.projectiles, this.enemiesPool, (projectiles, enemy) => {
            projectiles.destroy()
            enemy.health -= 1
            this.score += 1
            if(enemy.health <= 0) {
                this.booming(enemy, () => {
                    enemy.destroy()
                    this.score += 100
                })
            }

        })
        this.physics.add.overlap(this.ship, this.powerUps, (ship, powerUp) => {
            powerUp.disableBody(true, true)
            // powerUp.destroy()
        }, null, this)
        this.physics.add.overlap(this.ship, this.wanderShotPool, (ship, shot) => {
            this.booming(ship, () => {
                this.dead = true
                ship.destroy()
                this.toast = new BillBoard({
                    scene: this,
                    config: {
                        score: this.score,
                        cacheTag: 'board',
                        x: 128 * dpr,
                        y: 120 * dpr
                    },
                })
                this.toast.regisHandler(() => {
                    const theOtherScene = this.scene.get('playGame')
                    theOtherScene.scene.start()
                    this.dead = false
                    this.score = 0
                })
            })
        })

        this.acceCaler.calAcce()

        this.fpsDashBoard = new FpsDashBoard(this, 5 * dpr, 245 * dpr)
        this.scoreMeter = new ScoreMeter(this, 150 * dpr, 5 * dpr)
    }
    update(time, delta) {
        this.enemiesPool.plant()
        this.enemiesPool.reFly()
        this.enemiesPool.updateTick(delta)
        this.enemiesPool.checkFire(cannonConfig => {
            if(!this.dead) {
                this.wanderShotPool.fire(cannonConfig)
            }
        })
        this.wanderShotPool.release()
        this.background.tilePositionY -= 1
        // this.fire.anims.play('explo', true)
        this.tiller()
        this.shooting(delta)
        this.recycle()
        this.fpsDashBoard.calFps(delta)
        this.scoreMeter.updateScoreMeter(this.score)
    }
    booming(gameObj, handler = () => {}) {
        gameObj.setTexture('explosion')
        // gameObj.stop()
        gameObj.anims.play('explo', true)
        gameObj.once('animationcomplete', handler)
    }
    shooting(delta) {
        if(!this.dead) {
            this.shootTicker.tick(delta, () => {
                const bullet = new Bullet(this)
            })
        }
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