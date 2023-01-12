const { exchangeToken } = require('./tokenx');
const {
    appRunningLocally,
    appRunningOnDevGcp,
    appRunningOnLabsGcp,
    appRunningOnProdGcp,
} = require('./environment');

const { Issuer } = require('openid-client');
const { createRemoteJWKSet, jwtVerify } = require('jose');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const acceptedAcrLevel = 'Level4';
const acceptedSigningAlgorithm = 'RS256';

let idportenIssuer;
let _remoteJWKSet;

const {
    SYKEFRAVARSSTATISTIKK_API_AUDIENCE,
    IDPORTEN_WELL_KNOWN_URL,
    IDPORTEN_CLIENT_ID,
    FAKEDINGS_URL_IDPORTEN,
} = process.env;

async function initIdporten() {
    if (appRunningOnLabsGcp()) {
        // I labs så returnerer vi mock uansett
        return;
    }
    idportenIssuer = await Issuer.discover(IDPORTEN_WELL_KNOWN_URL);
    _remoteJWKSet = createRemoteJWKSet(new URL(idportenIssuer.metadata.jwks_uri));
}

async function verifiserIdportenSubjectToken(token) {
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
    exchangeIdportenToken
};
