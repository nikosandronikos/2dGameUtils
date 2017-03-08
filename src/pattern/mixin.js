// Mixin onto a class
export function mixin(base, mixin) {
    for (name of Object.getOwnPropertyNames(mixin)) {
        Object.defineProperty(
            base.prototype,
            name,
            Object.getOwnPropertyDescriptor(mixin, name)
        );
    }
}

// Mixin onto an object literal
export function mixinOnObj(base, mixin) {
    for (name of Object.getOwnPropertyNames(mixin)) {
        Object.defineProperty(
            base,
            name,
            Object.getOwnPropertyDescriptor(mixin, name)
        );
    }
}

