import Phaser from 'phaser'

import { dpr } from '../config'

export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        const x = scene.ship.x
        const y = scene.ship.y

        super(scene, x, y, 'bullet')
        this.setScale(dpr)

        scene.projectiles.add(this)
        scene.add.existing(this)
        
        this.play('shoot')
        // scene.physics.world.enableBody(this)
        this.body.velocity.y = -250 * dpr
    }
    update() {
        if(this.y < 32) {
            this.destroy()
        }
    }
}