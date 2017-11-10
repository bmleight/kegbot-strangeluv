const Redux = require('redux');
const Wiring = require('./');
const Beer = require('kegbot-middle/reducers/beer');

console.log(Beer);
console.log(Wiring.reducers());

exports.makeRoot = (asyncReducers) => {

    return Redux.combineReducers({
        ...Wiring.reducers(), // Everything in reducers/
        ...asyncReducers,
        beer: Beer
    });
};

exports.inject = (store, { key, reducer }) => {

    store.asyncReducers[key] = reducer;
    const root = exports.makeRoot(store.asyncReducers);
    store.replaceReducer(root);
};
