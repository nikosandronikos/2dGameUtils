// Logs to a connected socket.
// If not connected, then the logging operation must be a no-op.

function openWebSocket(addr) {
    return new Promise(
        function (resolve, reject) {
            const ws = new WebSocket(addr);
            ws.onopen = evt => {
                resolve(ws);
            };
            ws.onerror = evt => {
                reject(`Failed to open ${addr}`);
            };
        }
    );
}

export const Log = {
    buffer: [],
    _buffer: function(...messages) {
        for (let m of messages)
            this.buffer.push(m);
    },
    _flushBuffer: function() {
        for (let buffered of this.buffer) {
            this._send(buffered);
        }
        this.buffer = [];
    },

    // Future version - when await is well supported.
    // init and initNotAsync may seem equivalent, but note that because init
    // is an async function, it returns a Promise. Otherwise, they can be
    // used interchangabely.
    /*
    init: async function(addr) {
        // Buffer messages until socket connection is established.
        this.write = this._buffer;

        console.log(`connecting to ${addr}`);
        try {
            // await allows this async function to sleep here until the promise
            // is resolved.
            this.ws = await openWebSocket(addr);
        } catch(e) {
            console.log(`Error: ${e}`);
            this.buffer = [];
            this._setNoopFunctions();
            return false;
        }

        // Because of the JavaScript concurrency model, we can be sure that
        // no messages will be added to the buffer while we are flushing
        // and setting up the new write function. In fully concurrent
        // languages, we would need to ensure this was thread safe.
        // https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop
        this._flushBuffer();

        this.write = this._send;
        this.close = this._closeOpenSocket;
        return true;
    },
    */

    // Version without async/await.
    // Useful in browsers that don't support await.
    initNotAsync: function(addr) {
        this.write = this._buffer;

        console.log(`connecting to ${addr}`);
        openWebSocket(addr)
        .then( ws => {
            this.ws = ws;
            this._flushBuffer();
            this.write = this._send;
            this.close = this._closeOpenSocket;
        })
        .catch( err => {
            console.log(`Error: ${err}`);
            this.buffer = [];
            this._setNoopFunctions();
            return false;
        });

        return true;
    },
    _send: function(...messages) {
        for (const m of messages) {
            if (typeof m == 'object') {
                this.ws.send(`${typeof m}:${m.toString()}`);
            } else if (typeof m == 'string') {
                this.ws.send(m);
            }
        }
    },
    _closeOpenSocket: function() {
        this.ws.close();
        this._setNoopFunctions();
    },
    _setNoopFunctions: function() {
        this.write = new Function();
        this.close = new Function();
    }
}
Log._setNoopFunctions();

