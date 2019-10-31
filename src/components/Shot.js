import Phaser from 'phaser'

export default class Shot extends Phaser.GameObjects.Sprite {
    constructor({ scene, config }) {
        const { type = 'cannon', x, y, vX, vY } = config
        super(scene, x, y, 'bullet')
        this.scene = scene
        this.scene.add.existing(this)
    }
    emission(vellocity) {
        this.play(type)
        this.velocity = velocity
    }
}