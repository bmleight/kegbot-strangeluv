const { connect } = require('react-redux');
const Camera = require('components/Camera');
const FaceActions = require('kegbot-middle/actions/face');

module.exports = connect(
    (state) => ({
        isFaceDetectionRunning: state.face.isRunning
    }),
    {
        faceDetect: FaceActions.faceDetect
    }
)(Camera);
