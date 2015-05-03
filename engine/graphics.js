define(function core(require){
    return {
        scene: require('./core/scene'),
        map: require('./graphics/map'),
        camera: require('./graphics/camera'),
        renderer: require('./graphics/renderer'),
        sprite: require('./graphics/sprite')
    }
});