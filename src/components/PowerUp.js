import Phaser from 'phaser'

import { dpr } from '../config'

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor ({ scene,  config}) {
        const { x = 0, y = 0, type = 'red' } = config
        super(scene, x, y, 'powerUp')
        this.scene = scene
        this.setScale(dpr)

        this.type = type
        this.play(type)
        
        this.scene.add.existing(this)
    }
    setType(type) {
        this.type = type
        this.play(type)
    }
}