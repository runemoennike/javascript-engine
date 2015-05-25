define(function (require) {
    var core = require('engine/core');
    var graphics = require('engine/graphics');
    var q = require('q');

    return {
        start: start
    };

    var playerSprite;

    function start() {
        var loadingPromises = [];

        playerSprite = new graphics.Sprite('game/materials/matPlayer');
        playerSprite.x = 0;
        playerSprite.y = 0;
        loadingPromises.push(playerSprite.readyPromise);

        q.all(loadingPromises)
            .done(function () {
                core.control.run(gameLoop);
            })
    }

    function gameLoop(speed) {
        graphics.renderer.render(playerSprite);
    }
});