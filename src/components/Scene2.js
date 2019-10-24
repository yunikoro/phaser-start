import Phaser from 'phaser'

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame')
    }
    create() {
        this.add.text(20, 20, 'Playing game... 玩游戏', {font: '25px Arial', fill: 'yellow'})
        this.background = this.add.image(0, 0, 'background')
        this.background.setOrigin(0, 0)

        const { width, height } = this.game.config
        this.bgPlane = this.add.sprite(width / 2 - 50, -30, 'bgPlane')
        this.mdPlane = this.add.sprite(width / 2, -30, 'mdPlane')
        this.smPlane = this.add.sprite(width / 2 + 50, -30, 'smPlane')
        
        this.bgPlane.setInteractive()
        this.mdPlane.setInteractive()
        this.smPlane.setInteractive()

        this.input.on('gameobjectdown', this.booming, this)

        this.anims.create({
            key: 'bgfly',
            frames: this.anims.generateFrameNames('bgPlane', {
                start: 0,
                end: 1,
                frameRate: 10,
                repeat: -1
            })
        })
        this.anims.create({
            key: 'mdfly',
            frames: this.anims.generateFrameNames('mdPlane', {
                start: 0,
                end: 1,
                frameRate: 10,
                repeat: -1
            })
        })
        this.anims.create({
            key: 'smfly',
            frames: this.anims.generateFrameNames('smPlane', {
                start: 0,
                end: 1,
                frameRate: 10,
                repeat: -1
            })
        })
    }
    update() {
        // this.bgPlane.anims.play('bgfly', true)
        // this.mdPlane.anims.play('mdfly', true)
        // this.smPlane.anims.play('smfly', true)
        this.flying(this.bgPlane, 'bgfly', 0.3)
        this.flying(this.mdPlane, 'mdfly', 0.6)
        this.flying(this.smPlane, 'smfly', 0.8)
    }
    flying(plane, flag, speed) {
        plane.anims.play(flag, true)
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
    booming() {

    }
}