import Phaser from 'phaser'
import Shot from './Shot'

export default class WanderShotPool extends Phaser.Physics.Arcade.Group {
    constructor({ scene }) {
        super(scene.physics.world, scene)
        this.scene = scene
        this.clock = new Phaser.Time.Clock(this.scene)
        
        this.loopIdx = 0
    }
    fire(cannonConfig) {
        const { x, y, planeType, planeObj } = cannonConfig
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
            const shot1 = new Shot({
                scene: this.scene,
                config: {
                    x: x - 5,
                    y
                }
            })
            const shot2 = new Shot({
                scene: this.scene,
                config: {
                    x: x + 5,
                    y
                }
            })
            this.add(shot1)
            this.add(shot2)
            shot1.emission(0, 116)
            shot2.emission(0, 116)
        } else {
            setTimeout(planeObj => {
                const { x, y } = planeObj
                const shot = new Shot({
                    scene: this.scene,
                    config: {
                        x,
                        y
                    }
                })
                this.add(shot)
                shot.emission(0, 150)
            }, 200, planeObj)
            setTimeout(planeObj => {
                const { x, y } = planeObj
                const shot = new Shot({
                    scene: this.scene,
                    config: {
                        x,
                        y
                    }
                })
                this.add(shot)
                shot.emission(0, 150)
            }, 400, planeObj)
        }
    }
    release() {
        const curSize = this.getChildren().length
        if(this.loopIdx < curSize) {
            const { height } = this.scene.game.config
            const shot = this.getChildren()[this.loopIdx]
            if(shot.y > height + 10) {
                this.remove(shot, true, true)
            }

            this.loopIdx++
        } else {
            this.loopIdx = 0
        }
    }
}