import Phaser from 'phaser'

export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        const x = scene.ship.x
        const y = scene.ship.y

        super(scene, x, y, 'bullet')
        scene.projectiles.add(this)
        scene.add.existing(this)
        
        this.play('shoot')
        scene.physics.world.enableBody(this)
        this.body.velocity.y = -250
    }
    update() {
        if(this.y < 32) {
            this.destroy()
        }
    }
}