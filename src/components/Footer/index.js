const React = require('react');
const { Tabs, Tab } = require('material-ui/Tabs');
const Styles = require('./styles.scss');

class Footer extends React.Component {

    static propTypes = {
        navigate: React.PropTypes.func.isRequired
    }

    constructor(props, context) {

        super(props, context);

        this.handleActive = this._handleActive.bind(this);
    }

    _handleActive(tab) {

        const route = tab.props['data-route'];
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
