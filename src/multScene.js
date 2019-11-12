import Phaser from 'phaser'
import Scene1 from './components/Scene1'
import Scene2 from './components/Scene2'

import './style.css'

const parent = document.querySelector('#container')

const game = new Phaser.Game({
    width: 256,
    height: 272,
    parent,
    scene: [Scene1, Scene2],
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
})