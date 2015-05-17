define(function materials(require) {
    var logging = require('../debug/logging');
    var core = require('engine/core');

    var _shaderPrograms = {};
    var _materials = {};

    return {
        loadMaterial: loadMaterial,
        activateMaterial: activateMaterial
    };

    function loadMaterial(material) {
        require([material], function (materialDefinition) {
            if (!_(materialDefinition).has('shader')) {
                logging.error("No shader given in material definition. Cannot load material.");
                return;
            }

            require([materialDefinition.shader + '/shader.js'], function (shaderDefinition) {
                loadShaderProgram(materialDefinition.shader, shaderDefinition)
            });
        });
    }

    function loadShaderProgram(name, shaderDefinition) {
        if (_(_shaderPrograms).contains(name)) {
            return;
        }

        if (!_(shaderDefinition).has('fragment')) {
            logging.error("No fragment shader given in shader definition.");
            return;
        }

        if (!_(shaderDefinition).has('vertex')) {
            logging.error("No vertex shader given in shader definition.");
            return;
        }

        require([
            'text!' + shaderDefinition.fragment,
            'text!' + shaderDefinition.vertex,
        ], function (fragmentCode, vertexCode) {
            var gl = core.container.getRenderContext();

            var fragmentCompiled = compileShader(shaderDefinition.fragment, fragmentCode, gl.FRAGMENT_SHADER);
            var vertexCompiled = compileShader(shaderDefinition.vertex, vertexCode, gl.VERTEX_SHADER);

            var shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, fragmentCompiled);
            gl.attachShader(shaderProgram, vertexCompiled);

            gl.linkProgram(shaderProgram);

            if (gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                gl.useProgram(shaderProgram);
                _shaderPrograms[name] = shaderProgram;
            } else {
                logging.error('Failed to link shader program ' + name + ": " + gl.getShaderInfoLog(shader))
            }
        })
    }

    function compileShader(shaderName, shaderCode, shaderType) {
        var gl = core.container.getRenderContext();

        var shader = gl.createShader(shaderType);

        gl.shaderSource(shader, shaderCode);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        } else {
            logging.error('Failed to compile shader from ' + shaderName + ": " + gl.getShaderInfoLog(shader))
            gl.deleteShader(shader);
            return null;
        }
    }

    function activateMaterial(materialDefinition) {
        if (!_(_shaderPrograms).has(materialDefinition.shader)) {
            logging.error("Cannot activate material, shader not loaded: " + materialDefinition.shader);
            return;
        }

        var gl = core.container.getRenderContext();
        gl.useProgram(_shaderPrograms[materialDefinition.shader]);
    }
});