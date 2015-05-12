define(function logging(require) {
    return {
        error: error,
        warn: warn,
        log: log
    };

    function error() {
        var argumentsArray = Array.prototype.slice.apply(arguments);
        console.error.apply(console, argumentsArray);
    }

    function warn() {
        var argumentsArray = Array.prototype.slice.apply(arguments);
        console.warn.apply(console, argumentsArray);
    }

    function log() {
        var argumentsArray = Array.prototype.slice.apply(arguments);
        console.log.apply(console, argumentsArray);
    }
});