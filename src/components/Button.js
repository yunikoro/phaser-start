import Phaser from 'phaser'

export default class Button extends Phaser.GameObjects.Container {
    constructor({ scene, config }) {
        const { width: wWidth, height: wHeight } = scene.game.config
        const { x = (wWidth / 2), y = (wHeight / 2),
                width = 50, height = 30, radius = 8,
                text = 'hello world', activeStyle, style } = config
        super(scene, x, y)
        this.scene = scene
        
        this.style = {
            lineColor: 0xFFFFFF,
            fillColor: 0xDDDDDD,
            textStyle: {
                color: '#000',
                shadow: {
                    offsetX: 1,
                    offsetY: 1,
                    color: '#666',
                    fill: true
                }
            }
        }
        if (style) {
            this.style = style
        }
        this.activeStyle = {
            lineColor: 0x000000,
            fillColor: 0x000000,
            textStyle: {
                color: '#DDDDDD',
            }
        }
        if (activeStyle) {
            this.activeStyle = activeStyle
        }
        const { lineColor, fillColor, 
            textStyle } = this.style

        this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, textStyle)
        this.text.x = - this.text.displayWidth / 2
        this.text.y = - this.text.displayHeight / 2
        this.text.depth = 8
        this.add(this.text)

        
        this._width = width > this.text.displayWidth ? width : this.text.displayWidth + 15
        this._height = height > this.text.displayHeight ? height : this.text.height + 8
        this.radius = radius ? radius : 8

        const interRect = new Phaser.Geom.Rectangle(- this._width / 2, - this._height / 2, this._width, this._height)
        this.roundRect = new Phaser.GameObjects.Graphics(scene)
        this.roundRect.lineStyle(4, lineColor, 1)
        this.roundRect.fillStyle(fillColor, 1)
        this.roundRect.strokeRoundedRect(- this._width / 2, - this._height / 2, this._width, this._height, this.radius)
        this.roundRect.fillRoundedRect(- this._width / 2, - this._height / 2, this._width, this._height, this.radius)
        this.roundRect.setInteractive(interRect, Phaser.Geom.Rectangle.Contains)
        this.roundRect.depth = 1
        
        this.add(this.roundRect)
        this.sort('depth')

        this.scene.add.existing(this)
    }
    setStyle(styleObj) {
        const { lineColor, fillColor, 
            textStyle } = styleObj
        this.text.setStyle(textStyle)
        this.roundRect.lineStyle(4, lineColor, 1)
        this.roundRect.fillStyle(fillColor)
        this.roundRect.strokeRoundedRect(- this._width / 2, - this._height / 2, this._width, this._height, this.radius)
        this.roundRect.fillRoundedRect(- this._width / 2, - this._height / 2, this._width, this._height, this.radius)
    }
    regisHandler(cb = () => {}) {
        this.roundRect.setInteractive().on('pointerdown', pointer => {
            this.setStyle(this.activeStyle)
        }).on('pointerup', pointer => {
            this.setStyle(this.style)
            cb(pointer)
        })
    }
}