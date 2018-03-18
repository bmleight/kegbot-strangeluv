const React = require('react');
const Styles = require('./styles.scss');

class Camera extends React.Component {

    static propTypes = {
        faceDetect: React.PropTypes.func.isRequired,
        isFaceDetectionRunning: React.PropTypes.bool.isRequired
    }

    constructor(props, context) {

        super(props, context);

        this.onFaceDetect = this._onFaceDetect.bind(this);

        this.tracker = new tracking.ObjectTracker('face');
        this.tracker.setInitialScale(4);
        this.tracker.setStepSize(2);
        this.tracker.setEdgesDensity(0.1);
        this.tracker.on('track', this.onFaceDetect);
    }

    _onFaceDetect(event) {

        // TODO only draw when the video feed is being displayed
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        event.data.forEach(function(rect) {

            this.props.faceDetect(rect);
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.isFaceDetectionRunning !== this.props.isFaceDetectionRunning) {

            if (nextProps.isFaceDetectionRunning) {
                if (!this.trackerTask) {
                    this.startTracking();
                }
                else {
                    this.restartTracking();

                }
            }
            else {
                this.stopTracking();

            }
        }
    }

    componentDidMount() {

        if (this.props.isFaceDetectionRunning) {
            this.startTracking();
        }
    }

    startTracking() {

        this.trackerTask = tracking.track('#video', this.tracker, { camera: true });
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = '#a64ceb';
    }

    stopTrackng() {

        this.trackerTask.stop();
    }

    restartTracking() {

        this.trackerTask.run();
    }

    render() {

        return (
            <div style={{visibility:'hidden'}}>
                <video id="video" width="640" height="480" preload autoPlay loop muted></video>
                <canvas id="canvas" width="640" height="480"></canvas>
            </div>
        );
    }
}

module.exports = Camera;
