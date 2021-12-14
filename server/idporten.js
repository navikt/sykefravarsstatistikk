const { Issuer } = require('openid-client');
const { createRemoteJWKSet, jwtVerify } = require('jose');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const acceptedAcrLevel = 'Level4';
const acceptedSigningAlgorithm = 'RS256';

let idportenIssuer;
let _remoteJWKSet;

async function initIdporten() {
    idportenIssuer = await Issuer.discover(process.env.IDPORTEN_WELL_KNOWN_URL);
    _remoteJWKSet = createRemoteJWKSet(new URL(idportenIssuer.metadata.jwks_uri));
}

async function verifiserAccessToken(token) {
    const { payload } = await jwtVerify(token, _remoteJWKSet, {
        algorithms: [acceptedSigningAlgorithm],
        issuer: idportenIssuer.metadata.issuer,
    });

    if (payload.acr !== acceptedAcrLevel) {
        throw new Error('Invalid ACR-level');
    }

    if (
        payload.client_id !== process.env.IDPORTEN_CLIENT_ID &&
        process.env.NODE_ENV === 'production' // client_id finnes for øyeblikket ikke på fakedings sine access tokens fra idporten
    ) {
        throw new Error('Invalid client id');
    }
}

module.exports = {
    verifiserAccessToken,
    initIdporten,
};

export async function getMockTokenFromIdporten() {
    return await (await fetch(process.env.FAKEDINGS_URL_IDPORTEN + '?acr=Level=4')).text();
}
