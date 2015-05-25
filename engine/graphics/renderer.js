define(function renderer(require) {
    var logging = require('engine/debug/logging');
    var core = require('engine/core');
    var materials = require('./materials');

    return {
        render: render
    }

    function render(renderable) {
        if (!_.isFunction(renderable.getRenderInfo)) {
            logging.warn('Cannot render object: No getRenderInfo() method.');
        }

        var renderInfo = renderable.getRenderInfo();
        var gl = core.container.getRenderContext();
        var canvas = core.container.getCanvas();

        materials.activateMaterial(renderInfo.material);

        var program = materials.getShaderProgram(renderInfo.material);

        // set the resolution
        var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

        // Test
        var positionLocation = gl.getAttribLocation(program, "a_position");

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        setRectangle(0,0,100,100);


        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function setRectangle(x, y, width, height) {
        var gl = core.container.getRenderContext();

        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2]), gl.STATIC_DRAW);
    }

});