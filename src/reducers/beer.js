const BeerTypes = require('kegbot-middle/action-types/beer');

const internals =  {
    initial: () => ({
        isLoading: false,
        error: null,
        all: []
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
            return Object.assign({}, state, {
                isLoading: false,
                error: null,
                all: action.payload
            });

        case BeerTypes.BEERS_LOAD_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload
            });
    }

    return state;
};
