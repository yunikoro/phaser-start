import Phaser from 'phaser'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor({ scene, config }) {
        const { x = 0, y = 0, type = 'bgPlane' } = config
        super(scene, x, y, type)
        this.scene = scene

        this.scene.physics.world.enableBody(this)
        this.scene.add.existing(this)

        this.type = type
        this.accumRound = 0
        if(type == 'bgPlane') {
            this.animsKey = 'bgfly'
            this.health = 6
            this.velocityY = (30 + Math.random() * 10 )
            this.round = 2500
        } else if(type == 'mdPlane') {
            this.animsKey = 'mdfly'
            this.health = 4
            this.velocityY = (60 + Math.random() * 10 )
            this.round = 1500
        } else {
            this.animsKey = 'smfly'
            this.health = 2
            this.velocityY = (90 + Math.random() * 10 )
            this.round = 1000
        }
    }
    emission(velocityY) {
        this.anims.play(this.animsKey, true)
        if(velocityY) {
            this.setVelocityY(velocityY)
        } else {
            this.setVelocityY(this.velocityY)
        }
    }
    tick(delta) {
        this.accumRound += delta
    }
    tickFire(fireHandler = () => {}) {
        if(this.accumRound >= this.round) {
            fireHandler({
                x: this.x,
                y: this.y,
                planeType: this.type
            })
            this.accumRound = 0
        }
    }
} 