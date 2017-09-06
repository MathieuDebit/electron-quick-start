const PubNub = require('pubnub');

function init() {
    const pubnub = new PubNub({
        subscribeKey : 'sub-c-6a8a1b7a-9321-11e7-8816-ca7de4c8b978'
    });

    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                console.log('StatusEvent PNConnectedCategory');
            }
        },
        message: function(message) {
            console.log("New Message");
            navigator.serviceWorker.controller.postMessage(message);
        },
        presence: function(presenceEvent) {
            console.log("presenceEvent", presenceEvent);
        }
    });
    pubnub.subscribe({
        channels: ['test_channel'],
    });

    console.log("Subscribing..");
};

init();

window.endpoint = null;
window.registrationId = null;

var done = false;

const register = navigator.serviceWorker.register.bind(navigator.serviceWorker);
const ready = navigator.serviceWorker.ready;

function overrideSubscribe(registration) {
    // const native = registration.pushManager.subscribe.bind(registration.pushManager);
    registration.pushManager.subscribe = function(options) {
        console.log('Overriding subscribe');
        return Promise.resolve({ endpoint: 'http://192.168.0.94:3001/swag/test_channel' });
    };
    return registration;
}

navigator.serviceWorker.register = (worker, options) => {
    return register(`./preload-sw.js?worker=${encodeURIComponent(worker)}`, options);
    //return register(worker, options);
    /*return register(worker, options).then(registration => {
        console.log('Overriding register');
        if (done) return overrideSubscribe(registration);
        done = true;
        return overrideSubscribe(registration);
    })*/
}

navigator.serviceWorker.ready = new Promise((resolve, reject) => {
    ready.then(registration => {
        console.log('Overriding ready');
        if (done) return resolve(overrideSubscribe(registration));
        done = true;
        resolve(overrideSubscribe(registration));
    })
})

this.onpush = function (event) {
    console.log(event.data);
    // From here we can write the data to IndexedDB, send it to any open
    // windows, display a notification, etc.
};