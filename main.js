require.config({
    paths: {
        "text": 'lib/require/text'
    }
});

require([
    'require',

    'engine/core',
    'engine/graphics',
], main);

function main(require) {
    var core = require('engine/core');
    var graphics = require('engine/graphics');

    core.container.createCanvas();

    var playerSprite = new graphics.Sprite('game/materials/matPlayer');
    playerSprite.x = 0;
    playerSprite.y = 0;

    core.control.run(gameLoop);

    function gameLoop(speed) {
        graphics.renderer.render(playerSprite);
    }

}