
export class Vector2D {
    private x: number;
    private y: number;

    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public add(v: Vector2D): Vector2D {
        var x1: number = this.getX();
        var x2: number = v.getX();
        var y1: number = this.getY();
        var y2: number = v.getY();

        return new Vector2D(x1 + x2, y1 + y2);
    }

    public subtract(v: Vector2D): Vector2D {
        var x1: number = this.getX();
        var x2: number = v.getX();
        var y1: number = this.getY();
        var y2: number = v.getY();

        return new Vector2D(x1 - x2, y1 - y2);
    }

    public multiply(v: Vector2D): Vector2D {
        var x1: number = this.getX();
        var x2: number = v.getX();
        var y1: number = this.getY();
        var y2: number = v.getY();

        return new Vector2D(x1 * x2, y1 * y2);
    }

    public divide(v: Vector2D): Vector2D {
        var x1: number = this.getX();
        var x2: number = v.getX();
        var y1: number = this.getY();
        var y2: number = v.getY();

        return new Vector2D(x1 / x2, y1 / y2);
    }

    public magnitude(): number {
        var x: number = this.getX();
        var y: number = this.getY();

        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    public dot(v: Vector2D): number {
        return (this.getX() * v.getX()) + (this.getY() * v.getY());
        // return (this.magnitude() * v.magnitude() * Math.cos(0));
    }

    public getAngle(v?: Vector2D): number {
        if (!v) {
            v = new Vector2D(0,0);
        }

        return Math.atan2(this.getY(), this.getX()) - Math.atan2(v.getY(), v.getX());

        // var dot: number = v.dot(this);
        // return Math.acos(dot);
    }

    public getAngleDegrees(v?: Vector2D): number {
        var radians: number = this.getAngle(v);

        var deg: number = radians * 180 / Math.PI;

        if (deg < 0) {
            deg += 360;
        }

        return deg;
    }

    public normal(): Vector2D {
        var mag: number = this.magnitude();
        if (mag > 0) {
            return this.divide(new Vector2D(mag, mag));
        }
        else {
            return Vector2D.fromVector2D(this);
        }
    }

    // Vect2 = Vect1 - 2 * WallN * (WallN DOT Vect1)
    public reflect(normal: Vector2D): Vector2D {
        var vector: Vector2D = new Vector2D(2,2);
        var dot: number = normal.dot(this);

        vector = vector.multiply(normal);
        vector = vector.multiply(new Vector2D(dot, dot));
        vector = this.subtract(vector);
        
        return vector.inverse();
    }

    public inverse(): Vector2D {
        return new Vector2D(-this.getX(), -this.getY());
    }

    public rotate(radians: number): Vector2D {
        /*
        β = radians
        x2 = cosβ(x1) − sinβ(y1)
        y2 = sinβ(x1) + cosβ(y1)
        */
        var x: number = Math.cos(radians) * this.getX() - Math.sin(radians) * this.getY();
        var y: number = Math.sin(radians) * this.getX() + Math.cos(radians) * this.getY();
        return new Vector2D(x, y);
    }

    static fromVector2D(v: Vector2D) {
        return new Vector2D(v.getX(), v.getY());
    }

    static fromAngle(radians: number): Vector2D {
        var x: number = Math.sin(radians);
        var y: number = Math.cos(radians);
        // var x: number = cos * -sin;
        // var y: number = sin * cos;
        return new Vector2D(x, y);
    }

    static fromAngleDegrees(degrees: number): Vector2D {
        // Needs to go to radians, so valid degrees is -90 to +90.

        // if (degrees > 90) {
        //     degrees -= 360;
        // }
        // else if (degrees < -90) {
        //     degrees += 360;
        // }

        return Vector2D.fromAngle(degrees * Math.PI / 180);
    }
}

// Test

// var v1: Vector2D = new Vector2D(1, 0);
// var v2: Vector2D = new Vector2D(1, 2);

// var angle: number = Math.atan2(v2.getY(), v2.getX()) - Math.atan2(v1.getY(), v1.getX());
// console.log(angle);

// console.log(v1.getAngleDegrees());
// console.log(v2.getAngleDegrees());
// console.log(v2.reflect(v1));

// var dot: number = v1.dot(v2);
// console.log('dot', dot);

// var angle: Vector2D = v1.add(v2);
// console.log(angle.getAngle());

// var mag: number = angle.magnitude();
// console.log(mag);

// var dot: number = v1.dot(v2);

// var v1Mag: number = v1.magnitude();
// var v2Mag: number = v2.magnitude();
// console.log('v1', v1Mag);
// console.log('v2', v2Mag);
// console.log('m', dot);

// var rad = dot / (v1Mag * v2Mag);
// console.log('rad', rad);
// console.log('deg', rad * 180 / Math.PI);

