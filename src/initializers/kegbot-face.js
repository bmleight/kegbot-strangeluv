// const WebClient = require('../utils/web-client');

const internals = {
    store: null
};

module.exports = (store) => {

    internals.store = store;

    const ws = new WebSocket("ws://192.168.1.165:9001/");

    console.log(ws);
    ws.onmessage = internals.onWebSocketMessage;
    // return store.subscribe(() => internals.maintainAuthToken(store));
};

internals.onWebSocketMessage = (event) => {
    console.log(event.data);
};
