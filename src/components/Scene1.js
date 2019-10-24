import Phaser from 'phaser'

import desertBgUrl from '../assets/desert-backgorund.png'
import bgPlaneUrl from '../assets/enemy-big.png'
import mdPlaneUrl from '../assets/enemy-medium.png'
import smPlaneUrl from '../assets/enemy-small.png'

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super('bootGame')
    }
    preload() {
        this.load.image('background', desertBgUrl)
        this.load.spritesheet('bgPlane', bgPlaneUrl, {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('mdPlane', mdPlaneUrl, {
            frameWidth: 32,
            frameHeight: 16
        })
        this.load.spritesheet('smPlane', smPlaneUrl, {
            frameWidth: 16,
            frameHeight: 16
        })
    }
    create() {
        this.add.text(20, 20, 'Loading game...')
        this.scene.start('playGame')
    }
}