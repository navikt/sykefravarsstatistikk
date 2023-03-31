const { exchangeToken } = require('./tokenx');
const {
    appRunningLocally,
    appRunningOnDevGcp,
    appRunningOnDevGcpEkstern,
    appRunningOnProdGcp,
} = require('./environment');

const { Issuer } = require('openid-client');
const { createRemoteJWKSet, jwtVerify } = require('jose');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const acceptedAcrLevel = 'Level4';
const acceptedSigningAlgorithm = 'RS256';

let idportenIssuer;
let _remoteJWKSet;

async function initIdporten() {
    const { IDPORTEN_WELL_KNOWN_URL } = process.env;

    if (appRunningOnDevGcpEkstern() || appRunningLocally()) {
        // I dev-gcp-ekstern så returnerer vi mock uansett
        return;
    }
    idportenIssuer = await Issuer.discover(IDPORTEN_WELL_KNOWN_URL);
    _remoteJWKSet = createRemoteJWKSet(new URL(idportenIssuer.metadata.jwks_uri));
}

async function verifiserIdportenSubjectToken(token) {
    const { IDPORTEN_CLIENT_ID } = process.env;

    const { payload } = await jwtVerify(token, _remoteJWKSet, {
        algorithms: [acceptedSigningAlgorithm],
        issuer: idportenIssuer.metadata.issuer,
    });

    if (payload.acr !== acceptedAcrLevel) {
        throw new Error('Invalid ACR-level');
    }

    if (
        payload.client_id !== IDPORTEN_CLIENT_ID &&
        (appRunningOnDevGcp() || appRunningOnProdGcp())
    ) {
        throw new Error(
            'Ugyldig client_id (merk: client_id finnes for øyeblikket ikke på fakedings ' +
                'sine access tokens fra idporten)'
        );
    }
}

async function getMockTokenFromIdporten() {
    const { FAKEDINGS_URL_IDPORTEN } = process.env;

    return await (await fetch(FAKEDINGS_URL_IDPORTEN + '?acr=Level=4')).text();
}

async function exchangeIdportenToken(req, targetApp) {
    let subjectToken = req.headers.authorization?.split(' ')[1];

    if (!subjectToken) {
        if (appRunningLocally()) {
            subjectToken = await getMockTokenFromIdporten();
        } else {
            // Brukeren er ikke autorisert
            return;
        }
    }
    await verifiserIdportenSubjectToken(subjectToken);

    return await exchangeToken(subjectToken, targetApp);
}

module.exports = {
    initIdporten,
    exchangeIdportenToken,
};
