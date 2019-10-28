import Phaser from 'phaser'

export default class AcceCaler {
    constructor({ scene }) {
        this.scene = scene

        this.startPos = new Phaser.Math.Vector2()
        this.acce = new Phaser.Math.Vector2()
    }
    calAcce() {
        this.scene.input.on('pointerdown', pointer => {
            const { x, y } = pointer
            this.startPos.set(x, y)
            this.acce.set(0)
        })
        this.scene.input.on('pointermove', pointer => {
            const { x, y } = pointer
            const currPos = new Phaser.Math.Vector2(x, y)
            const acce = currPos.subtract(this.startPos)
            this.acce.set(acce.x, acce.y)
            this.startPos.set(x, y)
        })
        this.scene.input.on('pointerup', pointer => {
            this.acce.set(0)
        })
    }
}