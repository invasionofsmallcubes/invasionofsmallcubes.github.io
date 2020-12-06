function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'G-TX602JDKLH', {'anonymize_ip': true});
gtag('config', 'G-TX602JDKLH', {'allow_google_signals': false});
gtag('config', 'G-TX602JDKLH', {
    'user_id': guidGenerator()
});
gtag('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'denied'
});
