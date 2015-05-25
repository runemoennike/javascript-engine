require.config({
    paths: {
        text: 'lib/require/text',
        q: 'lib/q/q'
    }
});

require([
    'require',

    'engine/core',
    'engine/graphics',

    'game/game',
], main);

function main(require) {
    var core = require('engine/core');
    var game = require('game/game');

    core
        .container
        .createCanvas()
            .done(game.start);

}
