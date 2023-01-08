const getCspValue = require('./content-security-policy');
const { appRunningLocally } = require('./environment');

const contentHeaders = (req, res, next) => {
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-Xss-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Referrer-Policy', 'no-referrer');
    res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    res.header('Content-Security-Policy', getCspValue());
    res.header('X-WebKit-CSP', getCspValue());
    res.header('X-Content-Security-Policy', getCspValue());

    if (appRunningLocally()) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.header('Access-Control-Allow-Methods', 'GET, POST');
    }
    next();
};

module.exports = contentHeaders;
