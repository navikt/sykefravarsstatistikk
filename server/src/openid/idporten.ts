import { BaseClient, Issuer } from 'openid-client';
import { createRemoteJWKSet, FlattenedJWSInput, JWSHeaderParameters, jwtVerify } from 'jose';
import { GetKeyFunction } from 'jose/dist/types/types';

const acceptedAcrLevel = 'Level4';
const acceptedSigningAlgorithm = 'RS256';

let idportenClient: BaseClient;
let _remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;

export async function initIdporten() {
    const idportenIssuer = await Issuer.discover(process.env.IDPORTEN_WELL_KNOWN_URL!);
    if (process.env.NODE_ENV === 'production') {
        idportenClient = new idportenIssuer.Client(
            {
                client_id: process.env.IDPORTEN_CLIENT_ID!,
                token_endpoint_auth_method: 'private_key_jwt',
                token_endpoint_auth_signing_alg: acceptedSigningAlgorithm,
                redirect_uris: [process.env.IDPORTEN_REDIRECT_URI!],
            },
            {
                keys: [JSON.parse(process.env.IDPORTEN_CLIENT_JWK!)],
            }
        );
    }

    _remoteJWKSet = createRemoteJWKSet(new URL(idportenIssuer.metadata.jwks_uri as string));
}

export async function verifiserAccessToken(token: string) {
    const { payload } = await jwtVerify(token, _remoteJWKSet, {
        algorithms: [acceptedSigningAlgorithm],
        issuer: idportenClient.metadata.issuer as string,
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
