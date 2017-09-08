const React = require('react');

class BeerView extends React.Component {

    static propTypes = {
        beers: React.PropTypes.object,
        getBeers: React.PropTypes.func.isRequired
        // isLoading: React.PropTypes.bool,
        // errorMessage: React.PropTypes.string
    }

    componentWillMount() {

        this.props.getBeers();
    }

    render() {

        const { beers } = this.props;

        console.log(beers);

        return (
            <div>
                <h4>Welcome to Kegbot</h4>
                <p>Here is what is on tap!</p>
                <ul>
                    <li>Smoked Pumpkin Porter</li>
                    <li>Brett IPA</li>
                    <li>Farmhouse Smoked Pumpkin Porter</li>
                </ul>
                <p>Isn't that neat!!!</p>
            </div>
        );
    }
}

module.exports = BeerView;
