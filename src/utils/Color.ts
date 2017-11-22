
import {ColorCode, IColorMap, ColorMap} from './ColorCode';

interface RGB {
    r: number;
    g: number;
    b: number;
}

export class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    public constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
        this.setRed(r);
        this.setGreen(g);
        this.setBlue(b);
        this.setAlpha(a);
    }

    /**
     * 
     * @param r Number between 0-255
     */
    public setRed(r: number): void {
        this._r = parseInt(r.toString());
    }

    /**
     * 
     * @param g Number between 0-255
     */
    public setGreen(g: number): void {
        this._g = parseInt(g.toString());
    }

    /**
     * 
     * @param b Number between 0-255
     */
    public setBlue(b: number): void {
        this._b = parseInt(b.toString());
    }

    /**
     * 
     * @param a Number between 0-1
     */
    public setAlpha(a: number): void {
        this._a = a * 255;
    }

    public getRed(): number {
        return this._r;
    }

    public getGreen(): number {
        return this._g;
    }

    public getBlue(): number {
        return this._b;
    }

    public getAlpha(): number {
        return this._a / 255;
    }

    /**
     * toRGB
     * 
     * Returns as string in rgb(red,green,blue) format. Note this does not return an alpha value.
     */
    public toRGB(): string {
        return `rgb(${this.getRed()},${this.getGreen()},${this.getBlue()})`;
    }

    /**
     * toRGB
     * 
     * Returns as string in rgba(red,green,blue,alpha) format.
     */
    public toRGBA(): string {
        return `rgba(${this.getRed()},${this.getGreen()},${this.getBlue()},${this.getAlpha()})`;
    }

    /**
     * toRGB
     * 
     * Returns as integer/ColorCode. Note this does not return an alpha value.
     */
    public toHex(): number {
        return (this.getRed() << 16) + (this.getGreen() << 8) + this.getBlue();
    }

    /**
     * toHexString
     * 
     * Returns a hex string in #RRGGBB format.
     */
    public toHexString(): string {
        var hex: string = `#`
        
        hex += this._toHexString(this.getRed());
        hex += this._toHexString(this.getGreen());
        hex += this._toHexString(this.getBlue());

        return hex.toUpperCase();
    }

    public valueOf(): string {
        return this.toString();
    }

    public toString(): string {
        return this.toRGBA();
    }

    private _toHexString(value: number): string {
        var hex: string = value.toString(16);

        if (hex.length === 1) {
            hex = '0' + hex;
        }

        return hex;
    }

    private static _parseHexString(color: string): Array<number> {
        var colorCodes: Array<number> = [];

        color = color.replace('#', '');
        
        switch(color.length) {
            case 3: //This is a shorthand form, expand to full hex
                color = `${color.charAt(0)}${color.charAt(0)}${color.charAt(1)}${color.charAt(1)}${color.charAt(2)}${color.charAt(2)}`;
                break;
            case 6: // This is just a capture case to prevent a valid hex value from tripping the error case
                break;
            default: //If we made it here, this is an invalid hex code
                throw new Error(`Malformed hex code "#${color}". Expecting hex length of 3 or 6.`);
        }

        var rHex: string = color.slice(0, 2);
        var gHex: string = color.slice(2, 4);
        var bHex: string = color.slice(4, 6);

        colorCodes[0] = parseInt(rHex, 16);
        colorCodes[1] = parseInt(gHex, 16);
        colorCodes[2] = parseInt(bHex, 16);
        colorCodes[3] = 255;

        for (var i: number = 0; i < colorCodes.length; i++) {
            if (isNaN(colorCodes[i])) {
                throw new Error('Invalid hex code.');
            }
        }

        return colorCodes;
    }

    private static _parseRGB(color: string): Array<number> {
        var colorCodes: Array<number> = [];

        color = color.toLowerCase();

        if (color.indexOf('rgba(') > -1) {
            color = color.replace('rgba(', '');
            color = color.replace(')', '');

            var parts: Array<string> = color.split(',');

            colorCodes[0] = parseInt(parts[0]);
            colorCodes[1] = parseInt(parts[1]);
            colorCodes[2] = parseInt(parts[2]);
            colorCodes[3] = parseInt(parts[3]);
        }
        else if (color.indexOf('rgb(') > -1) {
            color = color.replace('rgb(', '');
            color = color.replace(')', '');

            var parts: Array<string> = color.split(',');  
            
            colorCodes[0] = parseInt(parts[0]);
            colorCodes[1] = parseInt(parts[1]);
            colorCodes[2] = parseInt(parts[2]);
            colorCodes[3] = 255; //Alpha
        }
        else {
            throw new Error(`Malformed RGB structure "${color}". Expecting rgb(#,#,#) or rgba(#,#,#,#)`)
        }

        for (var i: number = 0; i < colorCodes.length; i++) {
            var code: number = colorCodes[i];

            if (isNaN(code) || (code < 0 || code > 255)) {
                throw new Error('Invalid code value in RGB');
            }
        }

        return colorCodes;
    }

    private static _parseColorName(color: string): Array<number> {
        if (ColorMap[color] !== undefined) {
            var colorCode: ColorCode = ColorMap[color];
            var rgb: RGB = Color._parseHex(colorCode);
            return [rgb.r, rgb.g, rgb.b, /*alpha*/255];
        }
        else {
            throw new Error(`Invalid color "${color}"`);
        }
    }

    /**
     * 
     * @param color Accepted formats:
     * 
     * #FFF                 = rgba(255,255,255,1)
     * #FFF0                = rgba(255,255,255,0)
     * #FFFFFF              = rgba(255,255,255,1)
     * 
     * rgb(255,255,255)     = rgba(255,255,255,1)
     * rgba(255,255,255,1)  = rgba(255,255,255,1)
     * 
     * If all else fails, a color map will be used to map a color string to the appropriate color.
     */
    public static fromString(color: string): Color {
        var colorCodes: Array<number>;
        if (color.charAt(0) === '#') {
            //This is a hex code
            colorCodes = Color._parseHexString(color);
        }
        else if (/rgba?/.test(color)) {
            colorCodes = Color._parseRGB(color);
        }
        else {
            colorCodes = Color._parseColorName(color);
        }

        var r: number = colorCodes[0];
        var g: number = colorCodes[1];
        var b: number = colorCodes[2];
        var a: number = colorCodes[3];

        return new Color(r, g, b, a / 255);
    }

    /**
     * 
     * @param hex   Should be a 6 digit hex: 0x00000000 - 0xFFFFFF
     *                                                      ^^^^^^
     *                                                      | | |
     *                                                      | | |>Blue
     *                                                      | |>Green
     *                                                      |>Red                 
     */                         
    public static fromHex(hex: number | ColorCode): Color {
        var rgb: RGB = Color._parseHex(hex);
        return new Color(rgb.r, rgb.g, rgb.b);
    }

    public static fromColorCode(code: ColorCode): Color {
        return Color.fromHex(code);
    }

    private static _parseHex(hex: number | ColorCode): RGB {
        var r = hex >> 16;
        var g = hex >> 8 & 0xFF;
        var b = hex & 0xFF;

        return {r,g,b};
    }
}
