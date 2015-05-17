define(function renderer(require) {
    var logging = require('engine/debug/logging');
    var core = require('engine/core');

    return {
        render: render
    }

    function render(renderable) {
        if(!_.isFunction(renderable.getRenderInfo)) {
            logging.warn('Cannot render object: No getRenderInfo() method.');
        }

        var renderInfo = renderable.getRenderInfo();
        var renderContext = core.container.getRenderContext();


    }

});