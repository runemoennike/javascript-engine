define(function logging(require) {
    return {
        error: error
    };

    function error() {
        var argumentsArray = Array.prototype.slice.apply(arguments);
        console.error.apply(console, argumentsArray);
    }
});