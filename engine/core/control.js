define(function control(require) {
    var logging = require('../debug/logging');

    var requestAnimationFrameFn;
    var cancelAnimationFrameFn;
    var timestampFn;

    var targetFramerate = 60.0;

    activate();

    return {
        run: run,
        timestamp: timestamp
    };

    function activate() {
        setupRequestAnimationFrameFn();
    }

    ///////////////////////////////////////////////////////////

    /**
     *
     * @param fn
     */
    function run(fn) {
        var lastCallTime = timestamp();

        var callback = function() {
            var calledTime = timestamp();
            var deviation = (calledTime - lastCallTime) * targetFramerate / 1000.0;

            fn(deviation);

            lastCallTime = calledTime;
            requestAnimationFrameFn(callback);
        };

        requestAnimationFrameFn(callback);
    }

    function timestamp() {
        if(window.performance && window.performance.now) {
            return window.performance.now();
        } else {
            return Date.now();
        }
    }

    ///////////////////////////////////////////////////////////

    function setupRequestAnimationFrameFn() {
        // Adapted from https://gist.github.com/paulirish/1579671
        var vendors = ['ms', 'moz', 'webkit', 'o'];

        requestAnimationFrameFn = window.requestAnimationFrame;
        cancelAnimationFrameFn = window.cancelRequestAnimationFrame;

        if (!requestAnimationFrameFn) {
            for (var x = 0; x < vendors.length; x++) {
                requestAnimationFrameFn = window[vendors[x] + 'RequestAnimationFrame'];
                cancelAnimationFrameFn = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }
        }

        if (!requestAnimationFrameFn) {
            var lastTime = 0;

            requestAnimationFrameFn = function (callback) {
                var currTime = timestamp();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!cancelAnimationFrameFn) {
            cancelAnimationFrameFn = function (id) {
                clearTimeout(id);
            };
        }
    }
})
;