define(function (require) {
    var Entity = require('engine/core/entity')

    /**
     * @type {Array<Entity>}
     */
    var children;

    /**
     * @constructor
     */
    function Scene() {

    }

    /**
     *
     * @param {Entity} child
     * @param {boolean=true} reciprocate
     *
     */
    Entity.prototype.add = function (child, reciprocate) {
        if (typeof reciprocate === 'undefined') {
            reciprocate = true;
        }

        if(! child instanceof Entity) {
            console.error('Can only attach an Entity as a child to a Scene.');
            return;
        }

        children.push(child);

        if (reciprocate) {
            child.attachTo(this, false);
        }
    };

    Entity.prototype.children = function() {
        return children;
    }

    Entity.prototype.initialize = function() {
        this.doConstruct();

        _(children).forEach(function(child) {

        });
    }

    /**
     * Called in initialization, should setup Scene with Entities etc.
     */
    Entity.prototype.doConstruct = function() {}


    return Scene;
});