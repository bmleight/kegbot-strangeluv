// const ReactGA = require('react-ga');

const internals = {
    status: 'initializing',
    isRunning: false
};

module.exports = (store) => {

    // initialize face detection

    // listen to store to turn on/off
    store.subscribe(() => internals.listen(store));
};

internals.listen = (store) => {

    const face = store.getState().face;

    if (face.isRunning !== internals.isRunning) {

        if (face.isRunning) {
            // turn on face recognition
        }
        else {
            // turn off face recognition
        }

        internals.isRunning = face.isRunning;
    }
};
