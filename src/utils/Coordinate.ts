export class Coordinate {
    private _x: number;
    private _y: number;
    private _z: number;
    constructor (x: number, y: number, z?: number) {
        this._x = x;
        this._y = y;
        this._z = z || 0;
    }
    public toCartesian(): Coordinate {
        return new Coordinate((2 * this._y + this._x) / 2, (2 * this._y - this._x) / 2, this._z);
    }
    public static fromIsometric(x: number, y: number): Coordinate {
        return new Coordinate((2 * y + x) / 2, (2 * y - x) / 2);
    }
    public toIsometric(): Coordinate {
        return new Coordinate(this._x  - this._y, (this._x + this._y) / 2, this._z);
    }
    public setX(x: number): void {
        this._x = x;
    }
    public setY(y: number): void {
        this._y = y;
    }
    public getX(): number {
        return this._x;
    }

    public getY(): number {
        return this._y;
    }

    public getZ(): number {
        return this._z;
    }

    public setZ(z: number): void {
        this._z = z;
    }
    public incrementX(x: number): void {
        this._x += x;
    }
    public incrementY(y: number): void {
        this._y += y;
    }
    public incrementZ(z: number): void {
        this._z += z;
    }
}