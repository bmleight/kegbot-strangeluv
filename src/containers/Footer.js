const { connect } = require('react-redux');
const Push = require('react-router-redux').push;
const Footer = require('components/Footer');

module.exports = connect(
    null,
    {
        navigate: (route) => {

            return (dispatch) => {

                dispatch(Push(route));
            };
        }
    }
)(Footer);
