import Phaser from 'phaser'

export default class FpsDashBoard extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text) {
        super(scene, x, y, { fontSize: '10px' })
        this.scene = scene
        this.minFps = 120
        
        this.depth = 8
        this.alpha = 0.2
        this.setText([
            `fps: 0`,
            `minFps: 120`
        ])

        scene.add.existing(this)
    }
    calFps(delta) {
        const fps = 1000 / delta
        if(this.minFps > fps) {
            this.minFps = fps
        }
        this.setText([
            `fps: ${Number.parseInt(fps)}`,
            `minFps: ${Number.parseInt(this.minFps)}`
        ])
    }
}