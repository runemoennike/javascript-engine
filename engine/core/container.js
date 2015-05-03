define(function container(require) {
    var logging = require('../debug/logging');

    return {
        createCanvas: createCanvas,
        setCanvas: setCanvas,
        getCanvas: getCanvas,
        getRenderContext: getRenderContext
    };

    var _canvas = void 0;
    var _renderContext = void 0;

    //region Canvas

    function createRenderContext(canvasElement) {
        try {
            _renderContext = canvasElement.getContext("experimental-webgl");
            _renderContext.viewportWidth = canvasElement.width;
            _renderContext.viewportHeight = canvasElement.height;

            _renderContext.enable(_renderContext.CULL_FACE);
            _renderContext.cullFace(_renderContext.BACK);
        } catch (e) {
        }
        if (!gl) {
            logging.error("Could not initialise WebGL render context.");
        }
    }

    function getRenderContext () {
        return _renderContext;
    }

    function setCanvas(canvas) {
        _canvas = canvas;
        createRenderContext(canvas);
    }

    function getCanvas() {
        return _canvas;
    }

    function createCanvas() {
        var bodyElements = document.getElementsByTagName('body');

        if (bodyElements.length != 1) {
            logging.error('There must be exactly one body element.');
            return;
        }

        var bodyElement = bodyElements[0];
        var canvasElement = createCanvasElement();

        bodyElement.appendChild(canvasElement);

        setCanvas(canvasElement);
    }

    function createCanvasElement() {
        var element = document.createElement('canvas');

        element.id = 'game-canvas';
        element.style.width = '100%';
        element.style.height = '100%';
        element.style.position = 'absolute';
        element.style.border = '0';
        element.style.top = 0;
        element.style.left = 0;

        return element;
    }

    //endregion
});