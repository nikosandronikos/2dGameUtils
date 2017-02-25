export class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(data) {
        const node = {
            data: data,
            prev: this.tail === null ? null : this.tail,
            next: null,
            list: this
        }

        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length ++;
        return node;
    }

    insertAfter(node, data) {
         const newNode = {
            data: data,
            prev: node,
            next: node.next === null ? null : node.next,
            list: this
        }

        node.next = newNode;

        if (this.tail === node) this.tail = newNode;
        this.length ++;
        return newNode;
    }

    insertBefore(node, data) {
        const newNode = {
            data: data,
            prev: node.prev === null ? null : node.prev,
            next: node,
            list: this
        }
        if (node.prev) node.prev.next = newNode;
        node.prev = newNode;
        if (node === this.head) this.head = newNode;
        this.length ++;
        return newNode;
    }

    remove(node) {
        if (node.list === null) return;
        if (node.prev === null) {
            this.head = node.next;
            if (node.next) node.next.prev = null;
        } else {
            node.prev.next = node.next;
        }
        if (node.next === null) {
            this.tail = node.prev;
            if (node.prev) node.prev.next = null;
        } else {
            node.next.prev = node.prev;
        }
        node.list = null;
        this.length --;
        return node;
    }

    static nodeToString(node) {
        return `${node.data}. prev: ${node.prev  ? node.prev.data : 'null'}, `
                + `next: ${node.next ? node.next.data : 'null'}`;
    }

    toString() {
        let str = "";
        let node = this.head;
        while (node) {
            str += `$${LinkedList.nodeToString(node)}\n`;
            node = node.next;
        }
        if (this.tail) {
            str += `Tail: ${LinkedList.nodeToString(this.tail)}\n`;
        } else {
            str += `Head: ${this.head}, Tail: ${this.tail}\n`;
        }
        str += `Length: ${this.length}\n`;
        return str;
    }

    *[Symbol.iterator]() {
        let node = this.head;
        while (node) {
            yield node;
            node = node.next
        }
    }
}

