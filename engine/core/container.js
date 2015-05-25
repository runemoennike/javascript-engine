define(function container(require) {
    var logging = require('../debug/logging');
    var q = require('q');

    return {
        createCanvas: createCanvas,
        attachCanvas: attachCanvas,
        setCanvas: setCanvas,
        getCanvas: getCanvas,
        getRenderContext: getRenderContext
    };

    var _canvas = void 0;
    var _renderContext = void 0;

    //region Canvas

    function createRenderContext(canvasElement) {

        _renderContext = canvasElement.getContext("experimental-webgl");
        _renderContext.viewportWidth = canvasElement.width;
        _renderContext.viewportHeight = canvasElement.height;

        _renderContext.enable(_renderContext.CULL_FACE);
        _renderContext.cullFace(_renderContext.BACK);

        if (!_renderContext) {
            logging.error("Could not initialise WebGL render context.");
        }
    }

    function getRenderContext() {
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
        var canvasElement = createCanvasElement();

        var promise =
            attachCanvas(canvasElement)
                .then(function () {
                    setCanvas(canvasElement);
                });

        return promise;
    }

    function createCanvasElement() {
        var canvasElement = document.createElement('canvas');

        canvasElement.id = 'game-canvas';
        canvasElement.style.width = '100%';
        canvasElement.style.height = '100%';
        canvasElement.style.position = 'absolute';
        canvasElement.style.border = '0';
        canvasElement.style.top = 0;
        canvasElement.style.left = 0;

        return canvasElement;
    }

    function attachCanvas(canvasElement) {
        var bodyElements = document.getElementsByTagName('body');

        if (bodyElements.length != 1) {
            logging.error('There must be exactly one body element.');
            return;
        }

        var bodyElement = bodyElements[0];
        bodyElement.appendChild(canvasElement);

        return q
            // Wait for element to be attached and properties to have settled
            .delay(100)
            // Set backing store resolution to the same as the displayed size
            .then(function () {
                canvasElement.width = canvasElement.offsetWidth;
                canvasElement.height = canvasElement.offsetHeight;
            })
            .thenResolve(canvasElement);
    }

    //endregion
});