require('./renderer.js');

function subscribe() {
    navigator.serviceWorker.register('./serviceworker.js');
    return navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
            .then(function(subscription) {
                console.log('response', subscription)
                const endpoint = subscription.endpoint;
                if (endpoint.indexOf('https://android.googleapis.com/gcm/send') === 0) {
                    const endpointParts = endpoint.split('/');
                    window.registrationId = endpointParts[endpointParts.length - 1];
                    window.endpoint = 'https://fcm.googleapis.com/fcm/send';
                } else {
                    window.registrationId = null;
                    window.endpoint = endpoint;
                }
                console.log(endpoint, registrationId);
            })
            .catch(function(e) {
                if (Notification.permission === 'denied') {
                    // The user denied the notification permission which
                    // means we failed to subscribe and the user will need
                    // to manually change the notification permission to
                    // subscribe to push messages
                    console.warn('Permission for Notifications was denied');
                } else {
                    // A problem occurred with the subscription; common reasons
                    // include network errors, and lacking gcm_sender_id and/or
                    // gcm_user_visible_only in the manifest.
                    console.error('Unable to subscribe to push.', e);
                }
            });
    });
}

subscribe();