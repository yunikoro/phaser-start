import Phaser from 'phaser'

export default class BillBoard extends Phaser.GameObjects.DOMElement {
    constructor({ scene, config = {} }) {
        const { x, y, cacheTag } = config
        super(scene, x, y)
        this.scene = scene
        this.createFromCache(cacheTag)
        this.addListener('touchend')

        this.scene.add.existing(this)
    }
    regisHandler(cb = () => {}) {
        this.on('touchend', e => {
            console.log('touchend')
            cb(e)
            this.destroy()
        })
    }
}