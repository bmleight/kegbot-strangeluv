exports.run = (store) => {

    const initializers = [
        require('./kegbot')
    ];

    initializers.forEach((init) => init(store));
};
