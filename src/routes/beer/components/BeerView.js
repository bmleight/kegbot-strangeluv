const React = require('react');

class BeerView extends React.Component {

    static propTypes = {
        beers: React.PropTypes.array,
        getBeers: React.PropTypes.func.isRequired,
        isLoading: React.PropTypes.bool,
        errorMessage: React.PropTypes.string
    }

    componentWillMount() {

        this.props.getBeers();
    }

    render() {

        const { beers, isLoading, errorMessage } = this.props;

        return (
            <div>
                <p>Here is what is on tap!</p>

                {isLoading && <div>loading...</div>}

                {errorMessage && <div>{errorMessage}</div>}

                <ul>
                    {beers.map((beer) =>

                        <li key={beer.id}>{beer.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}

module.exports = BeerView;
