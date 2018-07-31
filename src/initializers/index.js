exports.run = (store) => {

    const initializers = [
        // require('./kegbot'),
        require('./kegbot-face')
    ];

    initializers.forEach((init) => init(store));
};
