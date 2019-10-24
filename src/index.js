import Phaser from 'phaser'

import skyUrl from './assets/sky.png'
import groundUrl from './assets/platform.png'
import starUrl from './assets/star.png'
import bombUrl from './assets/bomb.png'
import dudeUrl from './assets/dude.png'

const parent = document.querySelector('#container')
let cursor = null
let player = null
const game = new Phaser.Game({
    width: '100%',
    height: '100vh',
    parent,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload() {
            this.load.image('sky', skyUrl)
            this.load.image('ground', groundUrl)
            this.load.image('star', starUrl)
            this.load.image('bomb', bombUrl)
            this.load.spritesheet('dude', dudeUrl, {
                frameWidth: 32,
                frameHeight: 48
            })
        },

        create() {
            this.add.image(0, 0, 'sky').setOrigin(0, 0)
            this.add.image(0, 0, 'star').setOrigin(0, 0)
            const platforms = this.physics.add.staticGroup()

            player = this.physics.add.sprite(100, 450, 'dude')
            player.setBounce(0.2)
            player.setCollideWorldBounds(true)
            
            platforms.create(400, 568, 'ground').setScale(2).refreshBody()
            platforms.create(600, 400, 'ground')
            platforms.create(50, 250, 'ground')
            platforms.create(750, 220, 'ground')

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', {
                    start: 0,
                    end: 3,
                    frameRate: 10,
                    repeat: -1
                })
            })
            this.anims.create({
                key: 'turn',
                frames: [{
                    key: 'dude',
                    frame: 4
                }],
                frameRate: 20
            })
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', {
                    start: 5,
                    end: 8
                }),
                frameRate: 10,
                repeat: -1
            })
            this.physics.add.collider(player, platforms)
            cursor = this.input.keyboard.createCursorKeys()
            
        },
        update() {
            if (cursor.left.isDown) {
                player.setVelocityX(-16)
                player.anims.play('left', true)
            } else if (cursor.right.isDown) {
                player.setVelocityX(16)
                player.anims.play('right', true)
            }
        }
    }
})