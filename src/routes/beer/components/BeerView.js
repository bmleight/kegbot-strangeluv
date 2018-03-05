const React = require('react');
const Styles = require('./styles.scss');
const RaisedButton = require('material-ui/RaisedButton').default;
const FlatButton = require('material-ui/FlatButton').default;
const Dialog = require('material-ui/Dialog').default;
const { RadioButton, RadioButtonGroup } = require('material-ui/RadioButton');

const internals = {};

internals.calculateAvgRating = (ratings) => {

    const totalRatings = ratings.reduce((total, num) => {

        return total + num;
    }, 0);

    return (totalRatings / ratings.length).toFixed(2);
};

class BeerView extends React.Component {

    static propTypes = {
        beers: React.PropTypes.object,
        getBeers: React.PropTypes.func.isRequired,
        isLoading: React.PropTypes.bool,
        errorMessage: React.PropTypes.string,
        rateBeer: React.PropTypes.func.isRequired
    }

    state = {
        rateBeerDialogOpen: false,
        selectedRating: null
    };


    constructor(props, context) {

        super(props, context);

        this.renderRatings = this._renderRatings.bind(this);
        this.toggleRateBeerDialog = this._toggleRateBeerDialog.bind(this);
        this.selectRating = this._selectRating.bind(this);
        this.submitRating = this._submitRating.bind(this);
    }

    componentWillMount() {

        if (!this.props.beers) {
            this.props.getBeers();
        }
    }

    _renderRatings() {

        const { beers } = this.props;

        const beer = beers[1];
        const { ratings } = beer;

        if (ratings.length === 0) {
            return (
                <div>No ratings yet. Be the first to give a review!</div>
            );
        }

        const avgRating = internals.calculateAvgRating(ratings);

        return (
            <div>This beer has a {avgRating} rating on {ratings.length} ratings. Please add yours!</div>
        );
    }

    _toggleRateBeerDialog() {

        this.setState({ rateBeerDialogOpen: !this.state.rateBeerDialogOpen });
    }

    _selectRating(ev, value) {

        this.setState({ selectedRating: value });
    }

    _submitRating() {

        const { beers } = this.props;

        if (!this.state.selectedRating) {
            console.log('please select a rating!');
            return;
        }

        const beer = beers[1];

        this.props.rateBeer(beer.id, this.state.selectedRating);
        this.setState({ rateBeerDialogOpen: false, selectedRating: null });
    }

    render() {

        const { beers, isLoading, errorMessage } = this.props;

        const beer = beers[1];

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

        const rateBeerActions = [
            <FlatButton
                label='Cancel'
                primary
                onClick={this.toggleRateBeerDialog}
            />,
            <FlatButton
                label='Submit'
                primary
                keyboardFocused
                onClick={this.submitRating}
            />
        ];

        return (
            <div>
                <div className={Styles.wrapper}>
                    <div className={Styles.half}>
                        <img className={Styles.beerImage} src={beer.image} />
                    </div>
                    <div className={Styles.half}>
                        <h1>{beer.name}</h1>
                        <div>Clone of {beer.cloneBeer.brewery.name}&rsquo;s {beer.cloneBeer.name}</div>
                        <div>Brewed by {beer.cloneBeer.brewer.name}</div>
                        <div>{beer.style}</div>
                        <div>{beer.abv}%</div>
                        <div>{beer.ibus} ibus</div>
                    </div>
                </div>
                <br />
                <br />
                <div>{beer.description}</div>
                <br />
                <div>
                    <h2>Ratings:</h2>
                    <div>{this.renderRatings()}</div>
                    <br />
                    <RaisedButton label='Rate' primary onClick={this.toggleRateBeerDialog} />
                </div>
                <Dialog
                    title={`Rate ${beer.name}`}
                    actions={rateBeerActions}
                    modal={false}
                    open={this.state.rateBeerDialogOpen}
                    onRequestClose={this.toggleRateBeerDialog}
                    dialogSubmit={this.submitRating}
                >
                    <RadioButtonGroup name='beer_rating' onChange={this.selectRating}>
                        <RadioButton
                            value='1'
                            label='1 - Gross'
                        />
                        <RadioButton
                            value='2'
                            label='2'
                        />
                        <RadioButton
                            value='3'
                            label='3 - OK'
                        />
                        <RadioButton
                            value='4'
                            label='4'
                        />
                        <RadioButton
                            value='5'
                            label='5 - MMMMM'
                        />
                    </RadioButtonGroup>
                </Dialog>
            </div>
        );
    }
}

module.exports = BeerView;
