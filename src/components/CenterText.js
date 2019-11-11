import Phaser from 'phaser'

export default class CenterText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style)

        const minusX = this.displayWidth / 2
        const minusY = this.displayHeight / 2
        this.x -= minusX
        this.y -= minusY

        scene.add.existing(this)
    }
}