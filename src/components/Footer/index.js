const React = require('react');
const { Tabs, Tab } = require('material-ui/Tabs');
const Styles = require('./styles.scss');

class Footer extends React.Component {

    static propTypes = {
        navigate: React.PropTypes.func.isRequired
    }

    constructor(props, context) {

        super(props, context);

        // this.renderRatings = this._renderRatings.bind(this);
        // this.toggleRateBeerDialog = this._toggleRateBeerDialog.bind(this);
        // this.selectRating = this._selectRating.bind(this);
        this.handleActive = this._handleActive.bind(this);
    }

    _handleActive(tab) {

        const route = tab.props['data-route'];
        console.log(route);
        console.log(this);
        console.log(this.props);
        this.props.navigate(route);
    }

    render() {

        return (
            <Tabs className={Styles.footer}>
                <Tab label='ON TAP' data-route='/' onActive={this.handleActive} />
                <Tab label='Camera' data-route='/camera' onActive={this.handleActive} />
            </Tabs>
        );
    }
}

module.exports = Footer;
