import { Issuer, TokenSet } from 'openid-client';
import fetch from 'node-fetch';
import { appRunningOnDevGcp, appRunningOnProdGcp } from './environment.js';
import { logger } from './backend-logger.js';

let tokenxClient;

export async function initTokenXClient() {
    const { TOKEN_X_CLIENT_ID, TOKEN_X_PRIVATE_JWK, TOKEN_X_WELL_KNOWN_URL } = process.env;

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
    const { FAKEDINGS_URL_TOKENX, SYKEFRAVARSSTATISTIKK_API_AUDIENCE } = process.env;
    //const { default: fetch } = await import('node-fetch')
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

export async function exchangeToken(subjectToken, targetApp) {
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
        logger.error(err, `Feil under token exchange.`);
        return Promise.reject(err);
    }
}
