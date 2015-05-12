require([
    'require',

    'engine/core',
    'engine/graphics',
], main);

function main(require) {
    var core = require('engine/core');
    var graphics = require('engine/graphics');

    core.container.createCanvas();

    var playerSprite = new graphics.Sprite('game/textures/p1_spritesheet.png');

    core.control.run(gameLoop);

    function gameLoop(speed) {
        graphics.renderer.render(playerSprite);
    }

}