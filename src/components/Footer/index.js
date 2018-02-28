const React = require('react');
const { Tabs, Tab } = require('material-ui/Tabs');
const Styles = require('./styles.scss');

module.exports = () => (

    <Tabs className={Styles.footer}>
        <Tab label='ON TAP' />
    </Tabs>
);
