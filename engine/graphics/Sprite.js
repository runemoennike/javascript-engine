define( function (require) {
    var materials = require('./materials');

    /**
     * @constructor
     */
    function Sprite(material) {
        materials.loadMaterial(material);
    }

    Sprite.prototype.getRenderInfo = function() {

    }

    return Sprite;
});