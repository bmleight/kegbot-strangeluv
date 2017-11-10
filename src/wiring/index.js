const Strangeluv = require('strangeluv-core');

const wiring = module.exports = new Strangeluv(require.context('../', true, /\.js$/));
// const wiringMiddle = module.exports = new Strangeluv(require.context('kegbot-middle', true, /\.js$/));

// console.log(wiring);
// console.log(wiringMiddle);

if (module.hot) {
    // Rebuild the sync reducers list
    module.hot.accept('./reducers.js', () => wiring.flushReducers());
}
