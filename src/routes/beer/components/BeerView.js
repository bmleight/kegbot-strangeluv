const React = require('react');

class BeerView extends React.Component {

    static propTypes = {
        beers: React.PropTypes.array,
        getBeers: React.PropTypes.func.isRequired,
        isLoading: React.PropTypes.bool,
        errorMessage: React.PropTypes.string
    }

    componentWillMount() {

        if (!this.props.beers) {
            this.props.getBeers();
        }
    }

    render() {

        const { beers, isLoading, errorMessage } = this.props;

        const beer = beers && beers[0];

        if (typeof beer === 'undefined' || isLoading) {
            return (
                <div>loading</div>
            );
        }

        if (errorMessage) {
            return (
                <div>{errorMessage}</div>
            );
        }

        return (
            <div>
                <h1>{beer.name}</h1>
                <h2>{beer.brewery.name}</h2>
                <div>{beer.abv}%</div>
                <div>{beer.ibus} ibus</div>
                <div>{beer.description}</div>
            </div>
        );
    }
}

module.exports = BeerView;
