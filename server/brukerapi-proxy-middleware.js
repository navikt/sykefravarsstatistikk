const expressHttpProxy = require('express-http-proxy');
const { errors } = require('openid-client');
const { exchangeToken } = require('./tokenx');

const {
    NOTIFIKASJON_BRUKER_API_AUDIENCE,
} = process.env;

const createNotifikasjonBrukerApiProxyMiddleware = ({ log }) => {
    return expressHttpProxy('http://notifikasjon-bruker-api.fager.svc.cluster.local', {
        proxyReqPathResolver: () => '/api/graphql',
        proxyReqOptDecorator: async (options, req) => {
            let subjectToken = req.headers.authorization?.split(' ')[1];
            log.info("Lengde på subject token: ", subjectToken.length)
            const accessToken  = await exchangeToken(
                subjectToken,
                NOTIFIKASJON_BRUKER_API_AUDIENCE
            );

            options.headers.Authorization = `Bearer ${accessToken}`;
            return options;
        },
        proxyErrorHandler: (err, res, next) => {
            if (err instanceof errors.OPError) {
                log.info(`token exchange feilet ${err.message}`, err);
                res.status(401).send();
            } else {
                next(err);
            }
        },
    });
};

module.exports = { createNotifikasjonBrukerApiProxyMiddleware };
