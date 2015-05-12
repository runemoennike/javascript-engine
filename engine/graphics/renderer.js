define(function renderer(require) {
    var logging = require('engine/debug/logging');

    return {
        render: render
    }

    function render(renderable) {
        if(!_(renderable).has('getRenderInfo')) {
            logging.warn('Cannot render object: No getRenderInfo() method.');
        }

        var renderInfo = renderable.getRenderInfo();
    }

});