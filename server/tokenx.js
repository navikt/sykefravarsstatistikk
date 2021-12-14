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

// 1. Sjekke token fra session
// 2. Hvis tokenet finnes der, så send det direkte videre til apiet
// 3. Hvis tokenet ikke finnes der, sjekk om det finnes et idporten token i auth header fra wonderwall.
// 4. Hvis det IKKE finnes der heller, kast en exception
async function exchangeToken(req) {
    let token = req.headers.authorization?.split(' ')[1]; // TODO: Hent denne fra session cache
    if (!token) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Du er ikke autorisert!');
        }
        token = await (await fetch(process.env.FAKEDINGS_URL_IDPORTEN + '?acr=Level=4')).text();
    }
    await verifiserAccessToken(token);
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
            // TokenX only allows a single audience
            aud: [tokenxClient?.metadata.token_endpoint],
        },
    };

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
        const tokenXToken = await (
            await fetch(
                process.env.FAKEDINGS_URL_TOKENX +
                    `?aud=${process.env.TOKENX_AUDIENCE}&acr=Level4&pid=01065500791`
            )
        ).text();
        tokenSet = new TokenSet({
            access_token: tokenXToken,
        });
    }
    return tokenSet;
}

module.exports = {
    initTokenX,
    exchangeToken,
};
