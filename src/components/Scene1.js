import Phaser from 'phaser'

import desertBgUrl from '../assets/desert-backgorund.png'
import bgPlaneUrl from '../assets/enemy-big.png'
import mdPlaneUrl from '../assets/enemy-medium.png'
import smPlaneUrl from '../assets/enemy-small.png'
import explosionUrl from '../assets/explosion.png'
import powerupUrl from '../assets/power-up.png'
import shipUrl from '../assets/ship.png'
import bulletUrl from '../assets/laser-bolts.png'

import Button from './Button'
import CenterText from './CenterText'

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
        new CenterText(this, 128, 80, '征服全宇宙', { fontFamily: 'ali-light', fontSize: '32px' })

        this.btn = new Button({
            scene: this,
            config: {
                text: '起飞',
                width: 100,
                height: 40,
                x: 128,
                y: 200,
                style: {
                    lineColor: 0xF1743F,
                    fillColor: 0x000000,
                    textStyle: {
                        color: '#F1743F',
                        fontSize: '20px',
                    }
                },
                activeStyle: {
                    lineColor: 0x000000,
                    fillColor: 0xF1743F,
                    textStyle: {
                        color: '#000000',
                        fontSize: '20px',
                    }
                }
            },
        })
        this.btn.regisHandler(() => {
            this.scene.start('playGame')
        })
    }
}