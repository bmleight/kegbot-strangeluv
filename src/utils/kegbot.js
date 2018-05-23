const FaceActions = require('kegbot-middle/actions/face');
const InteractionActions = require('kegbot-middle/actions/interaction');

const states = {
    IDLE: 1,
    ANSWER_WAIT: 2,
    JOKE_DELIVER: 3,
};

const internals = {
    state: states.IDLE,
    interactionTimestamp: 0,
    interactionWaitingPeriod: 30000, // 30 seconds
    currentInteraction: null,
    store: null,
    jokeIndex: null,
    voice: null,
    speaking: false,
    getRandomInt: (max) => Math.floor(Math.random() * Math.floor(max)),
    speak: (text) => {

        const message = internals.getMessage();
        internals.speaking = true;
        message.text = text;
        window.speechSynthesis.speak(message);
    },
    getMessage: () => {

        if (internals.message) {
            return internals.message;
        }

        const voices = window.speechSynthesis.getVoices();

        internals.message = new SpeechSynthesisUtterance();
        internals.message.voice = voices[5]; // Note: some voices don't support altering params
        internals.message.voiceURI = 'native';
        internals.message.volume = 1; // 0 to 1
        internals.message.rate = 1; // 0.1 to 10
        internals.message.pitch = 1; //0 to 2
        internals.message.lang = 'en-US';

        internals.message.onend = function(e) {

            internals.speaking = false;

            const interaction = internals.interactions[internals.currentInteraction];

            if (interaction.type === 'joke') {

                internals.jokeIndex++;

                if (interaction.lines.length > internals.jokeIndex) {
                    internals.speak(interaction.lines[internals.jokeIndex]);
                }
                else {
                    internals.store.dispatch(InteractionActions.clear());
                    internals.state = states.IDLE;
                }

            }
        };

        return internals.message;
    },
    interactions: [
        {
            name: 'Do you want a beer',
            type: 'question',
            text: 'Do you want a beer?',
            answers: [
                {
                    text: 'Yes',
                    response: 'pour away'
                },
                {
                    text: 'No',
                    response: 'why are you talking to me then'
                }
            ]
        },
        {
            name: 'Four CEOs of beer companies walk into a bar',
            type: 'joke',
            text: 'Four CEOs of beer companies walk into a bar',
            lines: [
                'The CEO of Budweiser orders a Bud light',
                'The CEO of Miller orders a Miller Lite',
                'The CEO of Coors orders a Coors Light',
                'The CEO of Guinness orders a Coke',
                'The three CEOS then ask him, why arent you ordering a Guinness',
                'He replies if you guys arent drinking beer than neither will I'
            ]
        },
        {
            name: 'do you want a treat Star',
            type: 'question',
            text: 'do you want a treat Star',
            answers: [
                {
                    text: 'Yes',
                    response: 'of course you do warrior princess!'
                },
                {
                    text: 'No',
                    response: 'what?!?!?!'
                }
            ]
        }
    ]
};

internals.listen = (store) => {

    internals.store = store;

    const faceState = store.getState().face;
    const interactionState = store.getState().interaction;

    switch (internals.state) {
        case states.IDLE:

            if (faceState.timestamp > (internals.interactionTimestamp + internals.interactionWaitingPeriod)) {

                internals.interactionTimestamp = faceState.timestamp;
                // internals.currentInteraction = 1;
                internals.currentInteraction = internals.getRandomInt(internals.interactions.length);

                internals.startInteraction(store);

                // store.dispatch(FaceActions.toggleFaceDetection());

                // console.log('time to start an interaction!');
                // console.log(internals.interactions.length);
                // console.log(internals.currentInteraction);

                const interaction = internals.interactions[internals.currentInteraction];
            }
            break;

        case states.ANSWER_WAIT:

            const { answerId } = interactionState;

            if (answerId !== null) {

                const interaction = internals.interactions[internals.currentInteraction];
                const answer = interaction.answers[answerId];

                // console.log(answerId);
                // console.log(interaction);
                // console.log(answer);

                internals.speak(answer.response);
                store.dispatch(InteractionActions.clear());
                // store.dispatch(FaceActions.toggleFaceDetection());
                internals.state = states.IDLE;
            }

        case states.JOKE_DELIVER:

            // console.log('hey, its time to tell a joke');
    }
};

internals.startInteraction = (store) => {

    const interaction = internals.interactions[internals.currentInteraction];

    switch (interaction.type) {

        case 'question':

            internals.state = states.ANSWER_WAIT;
            internals.speak(interaction.text);
            break;

        case 'joke':

            internals.state = states.JOKE_DELIVER;
            internals.jokeIndex = -1;
            internals.speak(interaction.text);
            break;

    }

    store.dispatch(InteractionActions.start(interaction));
}

module.exports = {
    listen: internals.listen
};
