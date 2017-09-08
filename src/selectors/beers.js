const Reselect = require('reselect');

const internals = {
    all: (state) => state.beers.all,
};

// Actual, physical records that live in the API
exports.actual = Reselect.createSelector(
    [internals.all],
    (all) => {

        const allButNew = { ...all };
        delete allButNew.new;

        return allButNew;
    }
);

exports.paged = Reselect.createSelector(
    [internals.paged],
    (pagedProjects) => {

        const returnedProjects = { ...pagedProjects };

        return returnedProjects;
    }
);

exports.allPaged = Reselect.createSelector(
    [internals.allPaged],
    (allPagedProjects) => {

        const returnedProjects = { ...allPagedProjects };

        return returnedProjects;
    }
);

exports.current = Reselect.createSelector(
    [internals.current],
    (current) => {

        return current;
    }
);
