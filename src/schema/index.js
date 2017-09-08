const Normalizr = require('normalizr');

exports.brewery = new Normalizr.Schema('breweries');
exports.beer = new Normalizr.Schema('beers');

// A brewery...
exports.brewery.define({
    // has beers
    beers: Normalizr.arrayOf(exports.beer)
});

// A beer...
exports.beer.define({
    // has a brewery
    brewery: exports.brewery
});
