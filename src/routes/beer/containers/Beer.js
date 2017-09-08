const Connect = require('react-redux').connect;
const BeerAct = require('actions/beer');
const BeerView = require('../components/BeerView');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        beers: state.beers && state.beers.all,
        // isLoading: state.beers.isLoading,
        // errorMessage: state.beers.error && 'We had an error finding beer.'
    }),
    {
        getBeers: BeerAct.loadBeer
    }
);

// Hook them up to the counter
module.exports = internals.connect(BeerView);
