# Mobile First HTML5 WebGL Game
# Wandering Earth 移动端H5游戏 - 流浪地球
## Product ScreenShot 产品截图
![main_entry](https://raw.githubusercontent.com/yunikoro/phaser-start/master/wander-left.jpg)
![plane_fly](https://raw.githubusercontent.com/yunikoro/phaser-start/master/wander-right.jpg)
## Tools and Frameworks Using 框架选型
### 1. Phaserjs
### 2. Webpack

## Project Starting
```shell
npm install
```
### 1. local dev server starting 
```shell
npm run dev
```
### 2. build for production
```shell
npm run build:prod
```

## Project Structure
##### /component WebGL game modules
- **Scene1.js** - Game start menu.
- **Scene2.js** - Game plane flying scene.
- **AcceCaler.js** - Receive coordinate from user touching interaction and calculate the acce.
- **AnimationLoader.js** - Create the animation from spritesheet.
- **BillBoard.js** - A billBoard to show total score extends from Phaser DOMELement.
- **Bullet.js** - A bullet extends from Phaser Sprite.
- **Button.js** - A start button extends from Phaser Container.
- **CenterText.js** - To show gamee main title extends form Phaser Text
- **EnemiesPool.js** - A enemies pool to manage plane build/rebuild, destory and refly.
- **Enemy.js** - Enemy plane wrap 3 kinds of plane, switch by config.
- **FpsDashBoard.js** - Receive frame delay from renderLoop and calculate FPS to show the performance state.
- **WanderShotPool.js** - Controling enemy plane fire with diffirent
