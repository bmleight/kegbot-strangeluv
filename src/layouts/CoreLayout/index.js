const React = require('react');
const Header = require('containers/Header');
const Footer = require('containers/Footer');
const Camera = require('containers/Camera');
const Classes = require('./styles.scss');

// Pull global styles
require('../../styles/core.scss');

const CoreLayout = ({ children }) => (

    <div>
        <Header />
        <div className={Classes.mainContainer}>
            {children}
        </div>
        <Footer />
        <Camera />
    </div>

);

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
};

module.exports = CoreLayout;
