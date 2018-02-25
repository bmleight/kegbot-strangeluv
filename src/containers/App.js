const React = require('react');
const Router = require('react-router').Router;
const Provider = require('react-redux').Provider;
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
// const MuiTheme = require('../styles/themeStyles');
// const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

module.exports = class App extends React.Component {

    static propTypes = {
        history: React.PropTypes.object.isRequired,
        routes: React.PropTypes.object.isRequired,
        routerKey: React.PropTypes.number,
        store: React.PropTypes.object.isRequired
    }

    render() {

        const { history, routes, routerKey, store } = this.props;

        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div style={{ height: '100%' }}>
                        <Router history={history} children={routes} key={routerKey} />
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }

};
