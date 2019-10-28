import Phaser from 'phaser'

import desertBgUrl from '../assets/desert-backgorund.png'
import bgPlaneUrl from '../assets/enemy-big.png'
import mdPlaneUrl from '../assets/enemy-medium.png'
import smPlaneUrl from '../assets/enemy-small.png'
import explosionUrl from '../assets/explosion.png'
import powerupUrl from '../assets/power-up.png'
import shipUrl from '../assets/ship.png'
import bulletUrl from '../assets/laser-bolts.png'

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
        this.load.spritesheet('explosion',  explosionUrl, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('explosion',  explosionUrl, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('powerUp', powerupUrl, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('ship', shipUrl, {
            frameWidth: 16,
            frameHeight: 24
        })
        this.load.spritesheet('bullet', bulletUrl, {
            frameWidth: 16,
            frameWidth: 16,
        })
    }
    create() {
        this.add.text(20, 20, 'Loading game...')
        this.scene.start('playGame')
    }
}