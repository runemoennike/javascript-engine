define(function () {
    // Extend Aspect
    var Entity = require('engine/core/Entity')
    SpriteEntity.prototype = Object.create(Entity.prototype);

    /**
     * @constructor
     */
    function SpriteEntity() {
        Entity.call(this);

    }


    return SpriteEntity;
});