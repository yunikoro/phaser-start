import Phaser from 'phaser'

export default class ScoreMeter extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text = '') {
        super(scene, x, y, text)
        this.scene = scene

        this.depth = 8        

        scene.add.existing(this)
    }
    updateScore(score) {
        let fullScore = score.toString()
        const maxLength = 8
        const scoreStr = score.toString()
        for (let i = 0; i < maxLength - scoreStr.length; i++) {
            fullScore  = ''.concat('0', fullScore)
        }

        return fullScore
    }
    updateScoreMeter(score) {
        const fullScore = this.updateScore(score)
        this.setText(`score:${fullScore}`)
        this.setStyle({ fontSize: '24px', fontFamily: 'amatic-bold' })
    }
}