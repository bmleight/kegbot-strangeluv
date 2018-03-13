exports.run = (store) => {

    const initializers = [
        // require('./auth-token'),
        require('./face-detection')
    ];

    initializers.forEach((init) => init(store));
};
