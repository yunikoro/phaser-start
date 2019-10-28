export default class ShootTicker {
    constructor({ scene }) {
        this.scene = scene
        
        this.threshold = 200
        this.accum = 0
    }
    tick(delta, cb = () => {}) {
        this.accum += delta
        if(this.accum >= this.threshold) {
            cb()
            this.accum = 0
        }
    }
}