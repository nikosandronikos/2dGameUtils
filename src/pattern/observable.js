/*
Has issues with Babel.
See https://github.com/nikosandronikos/2dGameUtils/issues/1
Workaround follows:

export const ObservableMixin = superclass => class extends superclass {
    constructor() {
        super(...arguments);
        this.observers = {};

    }

    addObserver(event, fn, useThis, ctxt) {
        const boundFn = ctxt === undefined ? fn.bind(useThis) : fn.bind(useThis, ctxt);
        if (this.observers.hasOwnProperty(event)) {
            this.observers[event].append(boundFn);
            return;
        }
        this.observers[event] = [boundFn];
    }

    notifyObservers(event, ...args) {
        if (!this.observers.hasOwnProperty(event))
            return;

        for (let observer of this.observers[event]) {
            observer(...args);
        }
    }
}
*/

// Workaround version
// To be used with ./mixin.js/mixin()
export const ObservableMixin = {
    addObserver: function(event, fn, useThis, ctxt) {
        if (this.observers === undefined) this.observers = {};
        const boundFn = ctxt === undefined ? fn.bind(useThis) : fn.bind(useThis, ctxt);
        if (this.observers.hasOwnProperty(event)) {
            this.observers[event].push(boundFn);
            return;
        }
        this.observers[event] = [boundFn];
    },
    removeObservers: function() {
        this.observers = {};
    },
    notifyObservers: function(event, ...args) {
        if (this.observers === undefined || !this.observers.hasOwnProperty(event))
            return;

        for (let observer of this.observers[event]) {
            observer(...args);
        }
    }
}

/**************************************************************************
    How to use:

    class Player extends ObservableMixin(Object) {
        constructor(maxHP) {
            super();
            this.hp = maxHP;
        }

        dmg(value) {
            const oldHP = this.hp;
            this.hp -= value;
            if (this.hp <= 0) {
                this.notifyObserver('death', oldHP, this.hp);
                return;
            }
            this.notifyObserver('damage', oldHP, this.hp);
        }
    }

    class A {
        constructor() {
            this.players = [new Player(100), new Player(60)];
            this.players[0].addObserver('death', this.playerDied, this, 0);
            this.players[0].addObserver('damage', this.playerDamaged, this, 0);
            this.players[1].addObserver('death', this.playerDied, this, 1);
            this.players[1].addObserver('damage', this.playerDamaged, this, 1);
        }

        playerDied(playerIndex, oldValue, newValue) {
            console.log(`player ${playerIndex} took ${oldValue - newValue} damage and died.`);
            this.players.splice(playerIndex, 1);
        }

        playerDamaged(playerIndex, oldValue, newValue) {
            console.log(`player ${playerIndex} took ${oldValue - newValue} damage.`);
        }
    }

    const a = new A();

    while (a.players.length > 0) {
        for (player of a.players) {
            player.dmg(10);
        }
    }
**************************************************************************/
