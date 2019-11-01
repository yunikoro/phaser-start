import Phaser, { Physics } from 'phaser'
import Shot from './Shot'

export default class WanderShotPool extends Phaser.Physics.Arcade.Group {
    constructor({ scene }) {
        super(scene.physics.world, scene)
        this.scene = scene
        
        this.loopIdx = 0
    }
    fire(cannonConfig) {
        const { x, y, planeType } = cannonConfig
        if (planeType == 'bgPlane') {
            const shot1 = new Shot({
                scene: this.scene,
                config: {
                    x,
                    y
                }
            })
            const shot2 = new Shot({
                scene: this.scene,
                config: {
                    x,
                    y
                }
            })
            const shot3 = new Shot({
                scene: this.scene,
                config: {
                    x,
                    y
                }
            })
            this.add(shot1)
            this.add(shot2)
            this.add(shot3)

            shot1.emission(-30, 100)
            shot2.emission(0, 116)
            shot3.emission(30, 100)
        } else if (planeType == 'mdPlane') {

        } else {

        }
    }
    release() {
        const curSize = this.getChildren().length
        if(this.loopIdx < curSize) {

            this.loopIdx++
        } else {
            this.loopIdx = 0
        }
    }
}