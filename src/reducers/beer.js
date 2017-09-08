const BeerTypes = require('../action-types/beer');

const internals =  {
    initial: () => ({
        isLoading: false,
        error: null,
        all: {}
    })
};

// Reducer
module.exports = (state, action) => {

    state = state || internals.initial();

    switch (action.type) {

        case BeerTypes.BEERS_LOAD_BEGIN:
            return Object.assign({}, state, {
                isLoading: true
            });

        case BeerTypes.BEERS_LOAD_SECCESS:
            const beers = action.payload;
            console.log(beers);
            return Object.assign({}, state, {
                isLoading: false,
                error: null,
                all: beers
            });

        case BeerTypes.BEERS_LOAD_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload
            });
    }

    return state;
};
