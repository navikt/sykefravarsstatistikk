import { BaseClient, Issuer } from 'openid-client';
import { Request } from 'express';

let tokenxClient: BaseClient;

export async function initTokenX() {
    const tokenxIssuer = await Issuer.discover(process.env.TOKEN_X_WELL_KNOWN_URL!);
    tokenxClient = new tokenxIssuer.Client(
        {
            client_id: process.env.TOKEN_X_CLIENT_ID!,
            token_endpoint_auth_method: 'private_key_jwt',
        },
        {
            keys: [JSON.parse(process.env.TOKEN_X_PRIVATE_JWK!)],
        }
    );
}

// 1. Sjekke token fra session
// 2. Hvis tokenet finnes der, så send det direkte videre til apiet
// 3. Hvis tokenet ikke finnes der, sjekk om det finnes et idporten token i auth header fra wonderwall.
// 4. Hvis det IKKE finnes der heller, kast en exception
export async function exchangeToken(req: Request) {
    const token = req.headers.authorization?.split(' ')[0]; // TODO: Hent denne fra session cache
    if (!token) {
        throw new Error('Du er ikke autorisert!');
    }
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
            // TokenX only allows a single audience
            aud: [tokenxClient.metadata.token_endpoint],
        },
    };

    return await tokenxClient.grant(
        {
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            audience: 'someaudience', // FIXME
            subject_token: token,
        },
        additionalClaims
    );
}
