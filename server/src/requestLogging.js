const morgan = require('morgan')

const requestLoggingMiddleware = morgan(
    (tokens, req, res) => {
        return JSON.stringify({
            level: "info",
            message: writeRequestLogMessage(tokens, req, res),
        });
    },
    {skip: internalRequests}
);

function writeRequestLogMessage(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        "(" + tokens.res(req, res, "content-length") + ")",
        "- " + tokens["response-time"](req, res) + "ms",
    ].join(" ");
}

function internalRequests(req) {
    return (
        req.originalUrl?.includes("/internal/") || req.originalUrl?.includes("/media/")
    );
}

module.exports = requestLoggingMiddleware
