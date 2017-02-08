import {assert} from '../assert';

export class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {return this._x;}
    get y() {return this._y;}

    set x(v) {
        assert(!isNaN(v), 'Attempt to set x to NaN.');
        this._x = v;
    }

    set y(v) {
        assert(!isNaN(v), 'Attempt to set y to NaN.');
        this._y = v;
    }

    distanceTo(p2) {
        const x = p2.x - this._x;
        const y = p2.y - this._y;
        return Math.sqrt(x * x + y * y);
    }

    // Translate by something that has co-ordinates (e.g. another point, or
    // a vector.
    translate(coord) {
        this._x += coord.x;
        this._y += coord.y;
        return this;
    }

    copy() {
        return new Point(this._x, this._y);
    }
}
