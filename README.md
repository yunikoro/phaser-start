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
### 1. Local dev server starting 
```shell
npm run dev
```
### 2. Build for production
```shell
npm run build:prod
```

## Project Structure
##### /component WebGL game modules
- **Scene1.js** - Game start menu. 游戏开始菜单场景。
- **Scene2.js** - Game plane flying scene. 游戏主场景
- **AcceCaler.js** - Receive coordinate from user touching interaction and calculate the acce. 接收来自用户屏幕交互的坐标，计算飞机移动的加速度。
- **AnimationLoader.js** - Create the animation from spritesheet. 从雪碧图对象初始化2D动画。
- **BillBoard.js** - A billBoard to show total score extends from Phaser DOMElement. 继承自Phaser DOMElement类，用来展示游戏结束后的总得分。
- **Bullet.js** - A bullet extends from Phaser Sprite. 子弹类，继承自Phaser Sprite。
- **Button.js** - A start button extends from Phaser Container. 一个在场景中使用的按钮，继承自Phaser Container。
- **CenterText.js** - To show game main title extends form Phaser Text. 展示游戏入口页面游戏标题，继承自Phaser Text。
- **EnemiesPool.js** - A enemies pool to manage plane build/rebuild, destory and refly. 敌机池，管理敌机的部署，销毁和复飞。
- **Enemy.js** - Enemy plane wrap 3 kinds of plane, switch by config. 封装了3种类型的敌机类，可根据初始化配置切换类型。
- **FpsDashBoard.js** - Receive frame delay from renderLoop and calculate FPS to show the performance state. 接收每一帧渲染的延迟毫秒数计算平均FPS值，用于调试阶段监控游戏性能。
- **WanderShotPool.js** - Controling enemy plane fire with diffirent barrage, and recycle/dispose useless bullets. 控制不同敌机的弹幕，回收、释放不再使用的流弹。
