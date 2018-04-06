import {Point} from './point';

export class Vector2d {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    static createFromAngle(thetaDegrees, length=1) {
        const thetaRadians = thetaDegrees * (Math.PI / 180);
        const v = new Vector2d(
            length * Math.cos(thetaRadians),
            length * Math.sin(thetaRadians)
        );
        return v;
    }    

    static createFromRadians(theta, length=1) {
        const v = new Vector2d(
            length * Math.cos(theta),
            length * Math.sin(theta)
        );
        return v;
    }

    static createFromSum(a, b) {
        const r = new Vector2d(a.x, a.y);
        r.add(b);
        return r; 
    }

    static createFromDifference(a, b) {
        const r = new Vector2d(a.x, a.y);
        r.subtract(b);
        return r; 
    }

    static createFromPoint(p) {
        return new Vector2d(p.x, p.y);
    }
    
    static createFromPoints(p1, p2) {
        return new Vector2d(p2.x - p1.x, p2.y - p1.y);
    }

    static createFromLerp(a, b, t) {
        const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1;
        return new Vector2d(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
    }
    
    toJSON() {
        return {
            x:      this.x,
            y:      this.y,
            length: this.length,
            angle:  this.angleTo(new Vector2d(0,1))
        };
    }

    copy() {
        return new Vector2d(this._x, this._y);
    }

    set x(value) {
        if (value === undefined || isNaN(value)) {
            console.trace();
            throw 'value is invalid.';
        }
        this._x = value;
    }

    get x() {
        return this._x;
    }

    set y(value) {
        if (value === undefined || isNaN(value)) {
            console.trace();
            throw 'value is invalid.';
        }
        this._y = value;
    }

    get y() {
        return this._y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    midPoint() {
        return new Point(this._x / 2, this._y / 2);    
    }

    // Return a point along the vector. i must be a value between zero and one,
    // with zero being equivalent to the start of the vector and one equivalent
    // to the end of the vector.
    pointAt(i) {
        return new Point(this._x * i, this._y * i);
    }

    dot(b) {
        return this._x * b.x + this._y * b.y;
    }

    // Project this vector onto the vector 'b'  and return a new Vector2d
    // containing the result.
    projectOnto(b) {
        const r = b.copy().normalise();
        return r.multiply(this.dot(r));
    }

    zero() {
        this.x = 0;
        this.y = 0;
        return this;
    }

    normalise() {
        if (this.length == 0) return this;
        this.divide(this.length);
        return this;
    }
    
    normalisedCopy() {
        const v = this.copy();
        if (v.length == 0) return v;
        v.divide(v.length);
        return v;
    }

    add(b) {
        this.x += b.x;
        this.y += b.y;
        return this;
    }

    subtract(b) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }

    multiply(scalar) {
        this._x = this._x * scalar;
        this._y = this._y * scalar;
        return this;
    }

    divide(scalar) {
        this.x = this.x / scalar;
        this.y = this.y / scalar;
        return this;
    }
    
    rotateAbsRadians(thetaRadians) {
        const l = this.length;
        this.x = l * Math.cos(thetaRadians);
        this.y = l * Math.sin(thetaRadians);
        return this;
    }

    rotateRadians(thetaRadians) {
         const x = this._x;
         const y = this._y;
         this.x = x * Math.cos(thetaRadians) - y * Math.sin(thetaRadians);
         return this;
    }

    rotate(degrees) {
        this.rotateRadians(degrees * (Math.PI / 180));
        return this;
    }
    
    angleTo(b) {
        let angle = Math.atan2(b.y, b.x) - Math.atan2(this.y, this.x);
        if (angle > Math.PI) return angle - (2 * Math.PI);
        if (angle < -Math.PI) return angle + (2 * Math.PI);
        return angle;
    }

    angleBetween(b) {
        const lengthProduct = this.length * b.length;
        if (lengthProduct === 0) return 0;
        return Math.acos(this.dot(b) / lengthProduct);
    }

    angleTo(b) {
        const lengthProduct = this.length * b.length;
        if (lengthProduct === 0) return 0;
        return Math.acos(this.dot(b) / lengthProduct);
    }
}
