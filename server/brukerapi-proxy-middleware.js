const expressHttpProxy = require('express-http-proxy');
const { Issuer, errors } = require('openid-client');

const {
    NAIS_CLUSTER_NAME = 'local',
    TOKEN_X_WELL_KNOWN_URL,
    TOKEN_X_CLIENT_ID,
    TOKEN_X_PRIVATE_JWK,
} = process.env;

const createNotifikasjonBrukerApiProxyMiddleware = () => {
    const audience = `${NAIS_CLUSTER_NAME}:fager:notifikasjon-bruker-api`;
    return expressHttpProxy('http://notifikasjon-bruker-api.fager.svc.cluster.local', {
        proxyReqPathResolver: () => '/api/graphql',
        proxyReqOptDecorator: async (options, req) => {
            const tokenXClient = await createTokenXClient();
            let subject_token = req.headers.authorization?.split(' ')[1];
            const { access_token } = await exchangeToken(tokenXClient, { subject_token, audience });

            options.headers.Authorization = `Bearer ${access_token}`;
            return options;
        },
        proxyErrorHandler: (err, res, next) => {
            if (err instanceof errors.OPError) {
                //logger.info(`token exchange feilet ${err.message}`, err);
                res.status(401).send();
            } else {
                next(err);
            }
        },
    });
};

const createTokenXClient = async () => {
    const issuer = await Issuer.discover(TOKEN_X_WELL_KNOWN_URL);
    return new issuer.Client(
        {
            client_id: TOKEN_X_CLIENT_ID,
            token_endpoint_auth_method: 'private_key_jwt',
        },
        { keys: [JSON.parse(TOKEN_X_PRIVATE_JWK)] }
    );
};

const exchangeToken = async (tokenxClient, { subject_token, audience }) => {
    return await tokenxClient.grant(
        {
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            audience,
            subject_token,
        },
        {
            clientAssertionPayload: {
                nbf: Math.floor(Date.now() / 1000),
                // TokenX only allows a single audience
                aud: [tokenxClient?.issuer.metadata.token_endpoint],
            },
        }
    );
};

module.exports = { createNotifikasjonBrukerApiProxyMiddleware };
