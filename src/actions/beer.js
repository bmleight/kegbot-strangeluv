const Normalizr = require('normalizr');
const Denormalizr = require('denormalizr');
const WebClient = require('../utils/web-client');
const Schema = require('../schema');
const BeerTypes = require('../action-types/beer');

const internals = {};
const actions = exports;

exports.beersLoadBegin = () => {

    return {
        type: BeerTypes.BEERS_LOAD_BEGIN
    };
};

exports.beersLoadSuccess = (beers) => {

    beers = internals.idKeyed(beers);
console.log('beers load success');
console.log(beers);
    return {
        type: BeerTypes.BEERS_LOAD_SECCESS,
        payload: { records: { entities: { beers } } }
    };
};

exports.beersLoadError = (error) => {

    return {
        type: BeerTypes.BEERS_LOAD_ERROR,
        payload: { error },
        error: true
    };
};

exports.loadBeer = () => {

    return (dispatch) => {

        dispatch(actions.beersLoadBegin());

        const getBeers = WebClient.get('/beers');

        getBeers
        .then(({ data }) => {
            console.log('got data');
            console.log(data);
            dispatch(actions.beersLoadSuccess(data));
        })
        .catch((error) => {

            dispatch(actions.beersLoadError(error));
        });

        return getBeers;
    };
};

internals.idKeyed = (records) => {

    return records.reduce((idKeyed, record) => {

        idKeyed[record.id] = record;
        return idKeyed;
    }, {});
};
