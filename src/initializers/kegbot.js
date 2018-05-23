const Kegbot = require('utils/kegbot');

module.exports = (store) => {

    store.subscribe(() => Kegbot.listen(store));
};
