import Phaser from 'phaser'
import { dpr } from '../config'

export default class BillBoard extends Phaser.GameObjects.DOMElement {
    constructor({ scene, config = {} }) {
        const { score, x, y, cacheTag } = config
        super(scene, x, y)
        this.scene = scene
        this.setScale(dpr)
        this.createFromCache(cacheTag)
        this.addListener('touchend')
        const scoreEle = this.getChildByID('score')
        scoreEle.innerText = score

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