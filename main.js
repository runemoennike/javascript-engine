require([
    'require',

    'engine/core',
    'engine/graphics',

    'game/scenes/menuScene'
], main);

function main(require) {
    var core = require('engine/core');
    var MenuScene = require('game/scenes/menuScene');
    var GameScene = require('game/scenes/gameScene');

    core.container.createCanvas();
    //core.director.setScene(new MenuScene());
    core.director.setScene(new GameScene());
}