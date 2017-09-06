console.log('PRELOAD SW');

self.addEventListener('message', function(event) {
    console.log('MESSAGE meeeeeeeeeeeeeeeeeeee', event);
    self.dispatchEvent(
        new PushEvent('push', {
            data: event.data
        })
    )
});

function deserializeUrlParams(queryString) {
    return new Map(queryString.split('&').map(function(keyValuePair) {
        const splits = keyValuePair.split('=');
        const key = decodeURIComponent(splits[0]);
        let value = decodeURIComponent(splits[1]);
        if (value.indexOf(',') >= 0) {
            value = value.split(',');
        }

        return [key, value];
    }));
}

const params = deserializeUrlParams(location.search.substring(1));
self.importScripts(params.get('worker'));