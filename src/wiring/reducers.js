const Redux = require('redux');
const Wiring = require('./');
const Beer = require('kegbot-middle/reducers/beer');
const Face = require('kegbot-middle/reducers/face');

exports.makeRoot = (asyncReducers) => {

    return Redux.combineReducers({
        ...Wiring.reducers(), // Everything in reducers/
        ...asyncReducers,
        beer: Beer,
        face: Face
    });
};

exports.inject = (store, { key, reducer }) => {

    store.asyncReducers[key] = reducer;
    const root = exports.makeRoot(store.asyncReducers);
    store.replaceReducer(root);
};
