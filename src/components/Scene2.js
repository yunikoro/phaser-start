import Phaser from 'phaser'
import AcceCaler from './AcceCaler'
import FpsIndicator from './FpsIndicator'
import ShootTicker from './ShootTicker'
import Bullet from './Bullet'
import PowerUp from './PowerUp'
import EnemiesPool from './EnemiesPool'

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

        this.add.text(20, 20, 'Playing game... 玩游戏', {font: '25px Arial', fill: 'yellow'})
        this.background = this.add.tileSprite(0, 0, width, height, 'background')
        this.background.setOrigin(0, 0)

        this.bgPlane = this.add.sprite(width / 2 - 50, -30, 'bgPlane')
        this.mdPlane = this.add.sprite(width / 2, -30, 'mdPlane')
        this.smPlane = this.add.sprite(width / 2 + 50, -30, 'smPlane')
        this.fire = this.add.sprite(width / 2 + 50, height / 2, 'explosion')
        this.ship = this.physics.add.sprite(width / 2, 2 * height / 3, 'ship')
        
        // this.bgPlane.setInteractive()
        // this.mdPlane.setInteractive()
        // this.smPlane.setInteractive()

        // this.input.on('gameobjectdown', this.booming, this)

        this.anims.create({
            key: 'bgfly',
            frames: this.anims.generateFrameNames('bgPlane', {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'mdfly',
            frames: this.anims.generateFrameNames('mdPlane', {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'smfly',
            frames: this.anims.generateFrameNames('smPlane', {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'explo',
            frames: this.anims.generateFrameNames('explosion', {
                start: 0,
                end: 4,
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })
        this.anims.create({
            key: 'blue',
            frames: this.anims.generateFrameNames('powerUp', {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'red',
            frames: this.anims.generateFrameNames('powerUp', {
                start: 2,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'thrust',
            frames: this.anims.generateFrameNames('ship'),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNames('bullet', {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        })

        this.enemiesPool = new EnemiesPool({
            scene: this,
            config: {
                maxSize: 16,
            }
        })
        this.enemiesPool

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

        this.bgPlane.anims.play('bgfly', true)
        this.mdPlane.anims.play('mdfly', true)
        this.smPlane.anims.play('smfly', true)
        this.ship.anims.play('thrust', true)

        this.text = this.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' })
        
        this.projectiles = this.physics.add.group()
        // this.physics.add.collider(this.projectiles, this.powerUps, (projectiles, powerUp) => {
        //     projectiles.destroy()
        // })
        this.physics.add.overlap(this.ship, this.powerUps, (ship, powerUp) => {
            powerUp.disableBody(true, true)
            // powerUp.destroy()
        }, null, this)

        this.acceCaler.calAcce()

    }
    update(time, delta) {
        this.enemiesPool.plant()
        this.enemiesPool.reFly()
        this.background.tilePositionY -= 1
        this.flying(this.bgPlane, 'bgfly', 0.3)
        this.flying(this.mdPlane, 'mdfly', 0.6)
        this.flying(this.smPlane, 'smfly', 0.8)
        this.fire.anims.play('explo', true)
        this.tiller()
        this.shooting(delta)
        this.recycle()
        this.fpsIndicator.calFps(delta)
    }
    flying(plane, flag, speed) {
        // plane.anims.play(flag, true)
        plane.y += speed
        this.resetPos(plane)
    }
    resetPos(plane) {
        const { width, height } = this.game.config
        if (plane.y > height + 10) {
            plane.y = -10
            plane.x = Phaser.Math.Between(0, width)
        }
    }
    booming(pointer, gameObj) {
        gameObj.setTexture('explosion')
        // gameObj.stop()
        gameObj.anims.play('explo', true)
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