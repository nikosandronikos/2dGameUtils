export class Rect {
    constructor(x1, y1, x2, y2) {
        if (x2 < x1) {
            const temp = x2;
            x2 = x1;
            x1 = temp;
        }

        if (y2 < y1) {
            const temp = y2;
            y2 = y1;
            y1 = temp;
        }

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    
    copy() {
        return new Rect(this.x1, this.y1, this.x2, this.y2);
    }

    get x() {return this.x1};
    get y() {return this.y1};
    get width() {return this.x2 - this.x1;}
    get height() {return this.y2 - this.y1;}

    setAs(otherRect) {
        this.x1 = otherRect.x1;
        this.y1 = otherRect.y1;
        this.x2 = otherRect.x2;
        this.y2 = otherRect.y2;
        return this;
    }
    
    expand(size) {
        this.expandX(size);
        this.expandY(size);
        return this;
    }

    expandX(size, sizeRight=undefined) {
        this.x1 -= size;
        this.x2 += (sizeRight === undefined ? size : sizeRight);
        return this;
    }

    expandY(size) {
        this.y1 -= size;
        this.y2 += size;
        return this;
    }
    
    contract(size, minWidth=0, minHeight=0) {
        this.contractX(size, minWidth);
        this.contractY(size, minHeight);
        return this;
    }

    contractX(size, minWidth=0) {
        let width = this.width;
        if (width - (size * 2) < minWidth) {
            const maxContract = Math.max(0, (width - minWidth) / 2);
            this.x1 += maxContract;
            this.x2 -= maxContract;
        } else {
            this.x1 += size;
            this.x2 -= size;
        }
        return this;
    }

    contractY(size, minHeight=0) {
        let height = this.height;
        if (height - (size * 2) < minHeight) {
            const maxContract = Math.max(0, (height - minHeight) / 2);
            this.y1 += maxContract;
            this.y2 -= maxContract;
        } else {
            this.y1 += size;
            this.y2 -= size;
        }
        return this;
    }

    pointIn(x, y) {
        return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
    }

    vertices(origin={x: 0, y: 0}) {
        return [
            new Point(this.x1 - origin.x, this.y1 - origin.y),
            new Point(this.x2 - origin.x, this.y1 - origin.y),
            new Point(this.x2 - origin.x, this.y2 - origin.y),
            new Point(this.x1 - origin.x, this.y2 - origin.y)
        ];
    }

    quarter() {
        const midX = this.width() / 2 + this.x1;
        const midY = this.height() / 2 + this.y1;
        return [
            new Rect(this.x1, this.y1, midX, midY),
            new Rect(midX, this.y1, this.x2, midY),
            new Rect(this.x1, midY, midX, this.y2),
            new Rect(midX, midY, this.x2, this.y2)
        ];
    }

    midPoint() {
        return {x: (this.width  / 2) + this.x1, y: (this.height / 2) + this.y1};
    }

    intersects(otherRect) {
        // No overlap if:
        // As right edge is to the left of Bs left edge
        // As left edge is to the right of Bs right edge
        // As bottom edge is above Bs top edge
        // As top edge is below Bs bottom edge
        if (this.x2 < otherRect.x1 || this.x1 > otherRect.x2 || this.y2 < otherRect.y1 || this.y1 > otherRect.y2)
            return false;
        return true;
    }
}
