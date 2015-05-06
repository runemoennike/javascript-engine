define(function (require) {
    var Scene = require('engine/core/scene');

    /**
     * @type {Entity}
     */
    var parent;

    /**
     * @type {Array<Entity>}
     */
    var children;

    /**
     * @constructor
     */
    function Entity() {
        parent = null;
        children = [];
    }

    /**
     *
     * @param {Entity} parent
     * @param {boolean=true} reciprocate
     */
    Entity.prototype.attachTo = function (parent, reciprocate) {
        if (typeof reciprocate === 'undefined') {
            reciprocate = true;
        }

        if(! (parent instanceof Entity || parent instanceof Scene)) {
            console.error('Can only attach Entity to another Entity or to a Scene.');
            return;
        }

        parent = parent;

        if (reciprocate) {
            parent.addChild(this, false);
        }
    };

    /**
     *
     * @param {Entity} child
     * @param {boolean=true} reciprocate
     *
     */
    Entity.prototype.addChild = function (child, reciprocate) {
        if (typeof reciprocate === 'undefined') {
            reciprocate = true;
        }

        if(! child instanceof Entity) {
            console.error('Can only attach another Entity as a child to an Entity.');
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

    Entity.prototype.parent = function() {
        return parent;
    }

    return Entity;
});