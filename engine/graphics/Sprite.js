define( function (require) {
    var materials = require('./materials');

    Sprite.prototype.material = null;
    Sprite.prototype.x = 0;
    Sprite.prototype.y = 0;

    /**
     * @constructor
     */
    function Sprite(material) {
        this.material = material;
        materials.loadMaterial(material);
    }

    Sprite.prototype.getRenderInfo = function() {
        return {
            material: this.material,
            x: this.x,
            y: this.y
        }
    }

    return Sprite;
});