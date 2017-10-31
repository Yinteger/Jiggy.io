
export class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 0) {
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
        this._r = r;
    }

    /**
     * 
     * @param g Number between 0-255
     */
    public setGreen(g: number): void {
        this._g = g;
    }

    /**
     * 
     * @param b Number between 0-255
     */
    public setBlue(b: number): void {
        this._b = b;
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

    valueOf(): string {
        return this.toString();
    }

    toString(): string {
        return `rgba(${this.getRed()},${this.getGreen()},${this.getBlue()},${this.getAlpha()})`;
    }

    private static _parseHexString(color: string): Array<number> {
        var colorCodes: Array<number> = [];

        color = color.replace('#', '');
        
        switch(color.length) {
            case 3: //This is a shorthand form, expand to full hex
                color = `${color.charAt(0)}${color.charAt(0)}${color.charAt(1)}${color.charAt(1)}${color.charAt(2)}${color.charAt(2)}`;
                break;
            case 4: //This is a shorthand (with alpha) form, expand to full hex
                color = `${color.charAt(0)}${color.charAt(0)}${color.charAt(1)}${color.charAt(1)}${color.charAt(2)}${color.charAt(2)}${color.charAt(3)}${color.charAt(3)}`;
                break;
            case 6: // This is a full hex without alpha, simply add the alpha.
                color = `${color}FF`;
                break;
            case 8: // This is just a capture case to prevent a valid hex value from tripping the error case
                break;
            default: //If we made it here, this is an invalid hex code
                throw new Error(`Malformed hex code "#${color}". Expecting hex length of 3, 4, 6, or 8.`);
        }

        var rHex: string = color.slice(0, 2);
        var gHex: string = color.slice(2, 4);
        var bHex: string = color.slice(4, 6);
        var aHex: string = color.slice(6, 8);

        colorCodes[0] = parseInt(rHex, 16);
        colorCodes[1] = parseInt(gHex, 16);
        colorCodes[2] = parseInt(bHex, 16);
        colorCodes[3] = parseInt(aHex, 16);

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
            colorCodes[3] = parseInt(parent[3]);
        }
        else if (color.indexOf('rgb(') > -1) {
            color = color.replace('rgb(', '');
            color = color.replace(')', '');

            var parts: Array<string> = color.split(',');  
            
            colorCodes[0] = parseInt(parts[0]);
            colorCodes[1] = parseInt(parts[1]);
            colorCodes[2] = parseInt(parts[2]);
            colorCodes[3] = 255;
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

    /**
     * 
     * @param color Accepted formats:
     * 
     * #FFF                 = rgba(255,255,255,1)
     * #FFF0                = rgba(255,255,255,0)
     * #FFFFFF              = rgba(255,255,255,1)
     * #000000FF            = rgba(  0,  0,  0,1)
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

        var r: number = colorCodes[0];
        var g: number = colorCodes[1];
        var b: number = colorCodes[2];
        var a: number = colorCodes[3];

        return new Color(r, g, b, a / 255);
    }

    /**
     * 
     * @param hex   Should be a 8 digit hex: 0x00000000 - 0xFFFFFFFF
     *                                                      ^^^^^^^^
     *                                                      | | | |>Alpha
     *                                                      | | |>Blue
     *                                                      | |>Green
     *                                                      |>Red                 
     */                         
    public static fromHex(hex: number): Color {
        return Color.fromString(`#${hex.toString(16)}`);
    }
}