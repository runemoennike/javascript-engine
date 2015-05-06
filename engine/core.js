define(function core(require){
    return {
        container: require('./core/container'),
        Entity: require('./core/Entity'),
        director: require('./core/director'),
        Scene: require('./core/Scene'),
        Aspect: require('./core/Aspect')
    }
});