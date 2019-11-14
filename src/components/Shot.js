import Phaser from 'phaser'
import { dpr } from '../config'

export default class Shot extends Phaser.Physics.Arcade.Sprite {
    constructor({ scene, config }) {
        const { type = 'cannon', x, y, vX, vY } = config
        super(scene, x, y, 'bullet')
        this.scene = scene
        this.setScale(dpr)
        this.scene.add.existing(this)

        this.type = type
    }
    emission(x, y) {
        this.play(this.type)
        this.setVelocity(x, y)
    }
}