console.log('SERVICe WORKER');

self.addEventListener('push', function (event) {
    let notificationTitle = 'Hello';
    const notificationOptions = {
        body: 'Thanks for sending this push msg.',
        tag: 'simple-push-demo-notification',
        renotify: true,
        data: {
            url: 'https://developers.google.com/web/fundamentals/getting-started/push-notifications/',
        },
    };

    if (event.data) {
        const dataText = event.data.text();
        notificationTitle = 'Received Payload';
        notificationOptions.body = `Push data: '${dataText}'`;
    }

    console.log('Received push', notificationTitle, notificationOptions, event);
    event.waitUntil(
        Promise.all([
            self.registration.showNotification(notificationTitle, notificationOptions)
        ])
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    let clickResponsePromise = Promise.resolve();
    if (event.notification.data && event.notification.data.url) {
        clickResponsePromise = clients.openWindow(event.notification.data.url);
    }

    event.waitUntil(
        Promise.all([
            clickResponsePromise,
            self.analytics.trackEvent('notification-click'),
        ])
    );
});

self.addEventListener('notificationclose', function (event) {
    event.waitUntil(
        Promise.all([
            self.analytics.trackEvent('notification-close'),
        ])
    );
});

addEventListener('fetch', event => {
    console.log(event)
});