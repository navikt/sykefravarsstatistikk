import { Issuer } from 'openid-client';
import { createRemoteJWKSet, FlattenedJWSInput, JWSHeaderParameters, jwtVerify } from 'jose';
import { GetKeyFunction } from 'jose/dist/types/types';

const acceptedAcrLevel = 'Level4';
const acceptedSigningAlgorithm = 'RS256';

let idportenIssuer: Issuer;
let _remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;

export async function initIdporten() {
    idportenIssuer = await Issuer.discover(process.env.IDPORTEN_WELL_KNOWN_URL!);
    _remoteJWKSet = createRemoteJWKSet(new URL(idportenIssuer.metadata.jwks_uri!));
}

export async function verifiserIdportenSubjectToken(token: string | Uint8Array) {
    // @ts-ignore
    const { payload } = await jwtVerify(token, _remoteJWKSet, {
        algorithms: [acceptedSigningAlgorithm],
        issuer: idportenIssuer.metadata.issuer,
    });

    if (payload.client_id !== process.env.IDPORTEN_CLIENT_ID) {
        throw new Error('Invalid client ID in token');
    }

    if (payload.acr !== acceptedAcrLevel) {
        throw new Error('Invalid ACR-level');
    }
}
