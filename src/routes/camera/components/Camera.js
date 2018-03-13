const React = require('react');
const Webcam = require('react-webcam');

const internals = {};

internals.messages = [
    'do you want a beer',
    'what are you looking at',
    'want to play a game',
    'hey Im kegbot',
    'could you pull my finger'
];

class Camera extends React.Component {

    constructor(props, context) {

        super(props, context);

        this.speak = this._speak.bind(this);
        this.speaking = false;

        this.tracker = new tracking.ObjectTracker('face');
        this.tracker.setInitialScale(4);
        this.tracker.setStepSize(2);
        this.tracker.setEdgesDensity(0.1);

        this.msg = new SpeechSynthesisUtterance();

        const voices = window.speechSynthesis.getVoices();
        // console.log(voices);

        this.msg.voice = voices[5]; // Note: some voices don't support altering params
        this.msg.voiceURI = 'native';
        this.msg.volume = 1; // 0 to 1
        this.msg.rate = 1; // 0.1 to 10
        this.msg.pitch = 1; //0 to 2
        this.msg.lang = 'en-US';

        const that = this;
        this.msg.onend = function(e) {
            // console.log('Finished in ' + event.elapsedTime + ' seconds.');
            that.speaking = false;
        };
    }

    componentDidMount() {

        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const that = this;

        tracking.track('#video', this.tracker, { camera: true });
        this.tracker.on('track', function(event) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            event.data.forEach(function(rect) {

                context.strokeStyle = '#a64ceb';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);

                // console.log('test');
                that.speak();
            });
        });
    }

    _speak() {

        // console.log(this.speaking);
        if (!this.speaking) {
            this.speaking = true;
            this.msg.text = internals.messages[Math.floor(Math.random() * internals.messages.length)];
            window.speechSynthesis.speak(this.msg);
        }
    }

    render() {

        return (
            <div>
                <video id="video" width="640" height="480" preload autoPlay loop muted></video>
                <canvas id="canvas" width="640" height="480"></canvas>
            </div>
        );
    }
}

module.exports = Camera;
