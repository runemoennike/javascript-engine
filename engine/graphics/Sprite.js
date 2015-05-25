define(function (require) {
    var materials = require('./materials');
    var q = require('q');

    var readyDeferred = q.defer();
    Sprite.prototype.readyPromise = readyDeferred.promise;

    Sprite.prototype.material = null;
    Sprite.prototype.x = 0;
    Sprite.prototype.y = 0;

    /**
     * @constructor
     */
    function Sprite(material) {
        this.material = material;

        var materialPromise = materials.loadMaterial(material);

        q.all([materialPromise])
            .done(function () {
                readyDeferred.resolve();
            })
    }

    Sprite.prototype.getRenderInfo = function () {
        return {
            material: this.material,
            x: this.x,
            y: this.y
        }
    }

    return Sprite;
});