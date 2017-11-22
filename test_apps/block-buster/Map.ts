import {Color} from '../../src/utils';

export interface MapItem {
    x: number;
    y: number;
    color: Color;
    width: number;
    height: number;
}

export interface Map {
    blocks: MapItem[];
}

const HEIGHT: number = 16;
const WIDTH: number = 69;
const SPACING: number = 10;

var getColor = (): Color => {
    var r: number = Math.random() * (255 - 100) + 100;
    var g: number = Math.random() * (255 - 100) + 100;
    var b: number = Math.random() * (255 - 100) + 100;

    // console.log(r,g,b);

    // return new Color(255,255,255);
    return new Color(r,g,b);
}

export {
    HEIGHT,
    WIDTH,
    SPACING,
    getColor
};
