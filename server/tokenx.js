const { getMockTokenFromIdporten } = require('./idporten');

const { Issuer, TokenSet } = require('openid-client');
const { verifiserAccessToken } = require('./idporten');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
let tokenxClient;

async function initTokenX() {
    if (process.env.NODE_ENV === 'production') {
        const tokenxIssuer = await Issuer.discover(process.env.TOKEN_X_WELL_KNOWN_URL);
        tokenxClient = new tokenxIssuer.Client(
            {
                client_id: process.env.TOKEN_X_CLIENT_ID,
                token_endpoint_auth_method: 'private_key_jwt',
            },
            {
                keys: [JSON.parse(process.env.TOKEN_X_PRIVATE_JWK)],
            }
        );
    }
}

async function getMockTokenXToken() {
    const tokenXToken = await (
        await fetch(
            process.env.FAKEDINGS_URL_TOKENX +
                `?aud=${process.env.TOKENX_AUDIENCE}&acr=Level4&pid=01065500791`
        )
    ).text();
    return new TokenSet({
        access_token: tokenXToken,
    });
}

async function getTokenXToken(token, additionalClaims) {
    let tokenSet = await tokenxClient?.grant(
        {
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            audience: process.env.TOKENX_AUDIENCE,
            subject_token: token,
        },
        additionalClaims
    );
    if (!tokenSet) {
        // Dette skjer kun i lokalt miljø - siden tokenxClient kun blir initialisert i production env
        tokenSet = await getMockTokenXToken();
    }
    return tokenSet;
}

async function exchangeToken(req) {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        if (process.env.NODE_ENV !== 'production') {
            token = await getMockTokenFromIdporten();
        } else {
            // Brukeren er ikke autorisert
            return;
        }
    }
    await verifiserAccessToken(token);
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
            // TokenX only allows a single audience
            aud: [tokenxClient?.metadata.token_endpoint],
        },
    };

    return await getTokenXToken(token, additionalClaims);
}

module.exports = {
    initTokenX,
    exchangeToken,
};
