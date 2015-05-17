define(function core(require){
    return {
        camera: require('./graphics/camera'),
        renderer: require('./graphics/renderer'),
        materials: require('./graphics/materials'),
        Sprite: require('./graphics/Sprite')
    }
});