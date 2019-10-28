export default class FpsIndicator {
    constructor({ scene }) {
        this.scene = scene
        this.minFps = 120
    }
    calFps(delta) {
        const fps = 1000 / delta
        if(this.minFps > fps) {
            this.minFps = fps
        }
        this.scene.text.setText([
            'fps: ' + Number.parseInt(fps),
            'minFps: ' + Number.parseInt(this.minFps)
        ])
    }
}