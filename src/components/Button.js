import Phaser from 'phaser'

export default class Button extends Phaser.GameObjects.Container {
    constructor({ scene, config }) {
        const { width: wWidth, height: wHeight } = scene.game.config
        const { x = (wWidth / 2), y = (wHeight / 2),
                width = 50, height = 30, colorHex = 0xFFFFFF,
                radius = 8, text = 'hello world',  } = config
        super(scene, x, y)
        this.scene = scene

        // const border = new Phaser.Geom.Rectangle(16, 16, 32, 32)
        // border.width = 32
        // border.height = 32
        // border.centerX = 64
        // border.centerY = 64
        // const borderGra = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xaa0000 }, fillStyle: { color: 0x0000aa } })
        // borderGra.lineStyle(2, 0xFF00FF, 1.0)
        // borderGra.strokeRectShape(border)
        // this.add(borderGra)

        this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, {})
        this.text.x = - this.text.displayWidth / 2
        this.text.y = - this.text.displayHeight / 2
        this.text.depth = 8
        this.add(this.text)


        const _width = width > this.text.displayWidth ? width : this.text.displayWidth + 15
        const _height = height > this.text.displayHeight ? height : this.text.height + 8
        this.roundRect = new Phaser.GameObjects.Graphics(scene)
        this.roundRect.lineStyle(2, colorHex, 1)
        this.roundRect.fillStyle(0x321444, 1)
        this.roundRect.strokeRoundedRect(- _width / 2, - _height / 2, _width, _height, radius)
        this.roundRect.fillRoundedRect(- _width / 2, - _height / 2, _width, _height, radius)
        this.roundRect.depth = 1
        this.add(this.roundRect)
        
        this.sort('depth')
        this.scene.add.existing(this)
    }
    regisHandler(cb = () => {}) {
        this.setInteractive()
    }
}