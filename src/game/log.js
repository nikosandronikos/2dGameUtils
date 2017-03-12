export const Log = {
    // obj indicates which object the log functions need to be added to.
    init: function(addr) {
        const ws = new WebSocket(addr);
        ws.onopen = evt => {
            this.write = (message) => {
                if (typeof message === 'object') {
                    ws.send(`${typeof message}: ${message.toString()}`);
                }
            };
            this.write('starting');
            this.close = () => {
                ws.close();
                this.write = new Function();
                this.close = new Function();
            }
        };
    },

    // no-op until init succeeds
    write: new Function(),
    close: new Function()
}
