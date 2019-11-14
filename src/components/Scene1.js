import Phaser from 'phaser'

import { dpr } from '../config'

import desertBgUrl from '../assets/desert-backgorund.png'
import bgPlaneUrl from '../assets/enemy-big.png'
import mdPlaneUrl from '../assets/enemy-medium.png'
import smPlaneUrl from '../assets/enemy-small.png'
import explosionUrl from '../assets/explosion.png'
import powerupUrl from '../assets/power-up.png'
import shipUrl from '../assets/ship.png'
import bulletUrl from '../assets/laser-bolts.png'
import boardUrl from '../assets/billBoard.html'

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
        this.load.html('board', boardUrl)
    }
    create() {
        new CenterText(this, 128 * dpr, 80 * dpr, '流浪地球', { fontFamily: 'ali-light', fontSize: `${32 * dpr}px` })

        this.btn = new Button({
            scene: this,
            config: {
                text: '起飞',
                width: 100 * dpr,
                height: 20 * dpr,
                x: 128 * dpr,
                y: 200 * dpr,
                style: {
                    lineColor: 0xF1743F,
                    fillColor: 0x000000,
                    textStyle: {
                        fontFamily: 'ali-light',
                        color: '#F1743F',
                        fontSize: `${20 * dpr}px`,
                    }
                },
                activeStyle: {
                    lineColor: 0x000000,
                    fillColor: 0xF1743F,
                    textStyle: {
                        fontFamily: 'ali-light',
                        color: '#000000',
                        fontSize: `${20 * dpr}px`,
                    }
                }
            },
        })
        this.btn.regisHandler(() => {
            this.scene.start('playGame')
        })
    }
}