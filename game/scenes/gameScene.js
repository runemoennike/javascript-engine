define(function () {
    var core = require('engine/core');
    var graphics = require('engine/graphics');

    // Extend Scene
    var Scene = require('engine/core/scene')
    GameScene.prototype = Object.create(Scene.prototype);

    /**
     * @constructor
     */
    function GameScene() {
        Scene.call(this);

    }

    GameScene.prototype.doConstruct = function() {
        Scene.add(
            graphics.SpriteEntity('game/textures/p1_spritesheet')
        )
    }


    return GameScene;
});