import Phaser from 'phaser'

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame')
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
        this.ship = this.add.sprite(width / 2, 2 * height / 3, 'ship')

        
        this.bgPlane.setInteractive()
        this.mdPlane.setInteractive()
        this.smPlane.setInteractive()

        this.input.on('gameobjectdown', this.booming, this)

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

        this.powerUps = this.physics.add.group()

        const maxObject = 4
        for (let i = 0; i < maxObject; i++) {
            const powerUp = this.physics.add.sprite(16, 16, 'powerUp')
            this.powerUps.add(powerUp)
            powerUp.setRandomPosition(0, 0, width, height)

            if (Math.random() > 0.5) {
                powerUp.play('red')
            } else {
                powerUp.play('blue')
            }

            powerUp.setVelocity(100, 100)
            powerUp.setCollideWorldBounds(1)
            powerUp.setBounce(0.98)
        }

        this.bgPlane.anims.play('bgfly', true)
        this.mdPlane.anims.play('mdfly', true)
        this.smPlane.anims.play('smfly', true)
        this.ship.anims.play('thrust', true)
    }
    update() {
        this.background.tilePositionY -= 1
        this.flying(this.bgPlane, 'bgfly', 0.3)
        this.flying(this.mdPlane, 'mdfly', 0.6)
        this.flying(this.smPlane, 'smfly', 0.8)
        this.fire.anims.play('explo', true)
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
}