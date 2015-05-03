require([
    'require',

    'engine/core',
    'engine/graphics',

    'game/scenes/menu'
], main);

function main(require) {
    var core = require('engine/core');
    var MenuScene = require('game/scenes/menu');

    core.container.createCanvas();
    core.director.setScene(new MenuScene());
}