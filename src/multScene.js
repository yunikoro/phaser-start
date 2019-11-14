import Phaser from 'phaser'
import Vconsole from 'vconsole'
import Scene1 from './components/Scene1'
import Scene2 from './components/Scene2'

import './style.css'

const parent = document.querySelector('#container')
const dpr = window.devicePixelRatio

const game = new Phaser.Game({
    width: 256 * dpr,
    height: 272 * dpr,
    type: Phaser.AUTO,
    // parent,
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
    scale: {
        parent: 'container',
        mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        // width: 2000,
        // height: 600,
        // zoom: dpr / bsr
    }
})
new Vconsole()
