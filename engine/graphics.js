define(function core(require){
    return {
        scene: require('./core/Scene'),
        map: require('./graphics/map'),
        camera: require('./graphics/camera'),
        renderer: require('./graphics/renderer'),
        SpriteAspect: require('./graphics/SpriteEntity')
    }
});