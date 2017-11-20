import {Color} from '../../src/utils';
import {Map, SPACING, HEIGHT, WIDTH, getColor} from './Map';

var map: Map = {
    blocks: []
};



for (var i: number = 0; i < 10; i++) {
    for (var k: number = 0; k < 10; k++) {
        var x: number = SPACING + SPACING * k + (k * WIDTH);
        var y: number = SPACING + SPACING * i + (i * HEIGHT);

        // console.log(x, y);

        map.blocks.push({
            x : x,
            y : y,
            height : HEIGHT,
            width : WIDTH,
            color : getColor()
        });
    }
}

export {map as Map1};