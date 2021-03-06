// Just the modules necessary for initial render!
const CoreLayout = require('../layouts/CoreLayout');
const BeerRoute = require('./beer');
const CameraRoute = require('./camera');
// Create routes
module.exports = (store) => ({
    path: '/',
    component: CoreLayout,
    indexRoute: BeerRoute,
    childRoutes: [
        BeerRoute,
        CameraRoute
    ]
});
