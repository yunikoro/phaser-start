export default class AnimationLoader {
    constructor({ scene }) {
        this.scene = scene
        this.scene.anims.create({
            key: 'bgfly',
            frames: this.scene.anims.generateFrameNames('bgPlane', {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'mdfly',
            frames: this.scene.anims.generateFrameNames('mdPlane', {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'smfly',
            frames: this.scene.anims.generateFrameNames('smPlane', {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'explo',
            frames: this.scene.anims.generateFrameNames('explosion', {
                start: 0,
                end: 4,
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })
        this.scene.anims.create({
            key: 'blue',
            frames: this.scene.anims.generateFrameNames('powerUp', {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'red',
            frames: this.scene.anims.generateFrameNames('powerUp', {
                start: 2,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'thrust',
            frames: this.scene.anims.generateFrameNames('ship'),
            frameRate: 20,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'shoot',
            frames: this.scene.anims.generateFrameNames('bullet', {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'cannon',
            frames: this.scene.anims.generateFrameNames('bullet', {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1
        })
    }
}