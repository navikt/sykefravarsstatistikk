const { appRunningOnDevGcp, appRunningOnProdGcp } = require('./environment');

const log = require('./logging');

const { Issuer, TokenSet } = require('openid-client');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
let tokenxClient;

const {
    TOKEN_X_CLIENT_ID,
    TOKEN_X_PRIVATE_JWK,
    TOKEN_X_WELL_KNOWN_URL,
    FAKEDINGS_URL_TOKENX,
    SYKEFRAVARSSTATISTIKK_API_AUDIENCE,
} = process.env;

async function initTokenXClient() {
    if (appRunningOnDevGcp() || appRunningOnProdGcp()) {
        const tokenxIssuer = await Issuer.discover(TOKEN_X_WELL_KNOWN_URL);
        tokenxClient = new tokenxIssuer.Client(
            {
                client_id: TOKEN_X_CLIENT_ID,
                token_endpoint_auth_method: 'private_key_jwt',
            },
            {
                keys: [JSON.parse(TOKEN_X_PRIVATE_JWK)],
            }
        );
    }
}

async function getFakeAccessToken() {
    const tokenXToken = await (
        await fetch(
            FAKEDINGS_URL_TOKENX +
                `?aud=${SYKEFRAVARSSTATISTIKK_API_AUDIENCE}&acr=Level4&pid=01065500791`
        )
    ).text();
    return new TokenSet({
        access_token: tokenXToken,
    });
}

function getClientAssertionClaims() {
    const now = Math.floor(Date.now() / 1000);
    const tokenEndpoint = [tokenxClient?.issuer.metadata.token_endpoint];
    return {
        clientAssertionPayload: {
            nbf: now,
            aud: tokenEndpoint,
        },
    };
}

async function exchangeToken(subjectToken, targetApp) {
    if (!(appRunningOnProdGcp() || appRunningOnDevGcp())) {
        return getFakeAccessToken();
    }
    try {
        return await tokenxClient.grant(
            {
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience: targetApp,
                subject_token: subjectToken,
            },
            getClientAssertionClaims()
        );
    } catch (err) {
        log.error(`Feil under token exchange: ${err}`);
        return Promise.reject(err);
    }
}

module.exports = {
    initTokenXClient,
    exchangeToken,
};
