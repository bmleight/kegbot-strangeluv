const { connect } = require('react-redux');
const Push = require('react-router-redux').push;
const FaceActions = require('kegbot-middle/actions/face');
const Header = require('components/Header');

module.exports = connect(
    (state) => ({
        face: state.face.face,
        isFaceDetectionRunning: state.face.isRunning
    }),
    {
        toggleFaceDetection: FaceActions.toggleFaceDetection
    }
)(Header);
