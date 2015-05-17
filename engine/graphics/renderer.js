define(function renderer(require) {
    var logging = require('engine/debug/logging');
    var core = require('engine/core');
    var materials = require('./materials');

    return {
        render: render
    }

    function render(renderable) {
        if(!_.isFunction(renderable.getRenderInfo)) {
            logging.warn('Cannot render object: No getRenderInfo() method.');
        }

        var renderInfo = renderable.getRenderInfo();
        var gl = core.container.getRenderContext();

        materials.activateMaterial(renderInfo.material);

        var program = materials.getShaderProgram(renderInfo.material);

        // Test
        var positionLocation = gl.getAttribLocation(program, "a_position");

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
            1.0, -1.0,
            1.0,  1.0]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

});