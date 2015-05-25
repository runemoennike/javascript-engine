define(function materials(require) {
    var logging = require('../debug/logging');
    var core = require('engine/core');
    var q = require('q');

    var _shaderPrograms = {};
    var _materials = {};

    return {
        loadMaterial: loadMaterial,
        activateMaterial: activateMaterial,
        getShaderProgram: getShaderProgram,
        getMaterialDefinition: getMaterialDefinition,
    };

    function getMaterialDefinition(material) {
        if (!_(_materials).has(material)) {
            logging.error("Material not loaded: " + material);
            return;
        }

        return _materials[material];
    }

    function getShaderProgram(material) {
        var materialDefinition = getMaterialDefinition(material);

        if (!materialDefinition) {
            return;
        }

        if (!_(_shaderPrograms).has(materialDefinition.shader)) {
            logging.error("Cannot activate material, shader not loaded: " + materialDefinition.shader);
            return;
        }

        return _shaderPrograms[materialDefinition.shader];
    }

    function loadMaterial(material) {
        var dfd = q.defer();

        require([material], function (materialDefinition) {
            if (!_(materialDefinition).has('shader')) {
                logging.error("No shader given in material definition. Cannot load material.");
                dfd.reject();
                return;
            }

            _materials[material] = materialDefinition;

            require([materialDefinition.shader + '/shader.js'], function (shaderDefinition) {
                dfd.resolve(
                    loadShaderProgram(materialDefinition.shader, shaderDefinition)
                );
            });
        });

        return dfd.promise;
    }

    function loadShaderProgram(name, shaderDefinition) {
        var dfd = q.defer();

        if (_(_shaderPrograms).contains(name)) {
            dfd.resolve;
        } else if (!_(shaderDefinition).has('fragment')) {
            var errorMsg = "No fragment shader given in shader definition.";
            logging.error(errorMsg);
            dfd.reject(errorMsg)
        } else if (!_(shaderDefinition).has('vertex')) {
            var errorMsg = "No vertex shader given in shader definition.";
            logging.error(errorMsg);
            dfd.reject(errorMsg);
        } else {

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
                    dfd.resolve();
                } else {
                    var errorMsg = 'Failed to link shader program ' + name + ": " + gl.getShaderInfoLog(shader);
                    logging.error(errorMsg);
                    dfd.reject(errorMsg);
                }
            });
        }

        return dfd.promise;
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

    function activateMaterial(material) {
        var shaderProgram = getShaderProgram(material);

        var gl = core.container.getRenderContext();
        gl.useProgram(shaderProgram);
    }
});