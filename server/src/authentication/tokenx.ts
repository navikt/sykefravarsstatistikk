import { Issuer, Client, TokenSet } from "openid-client";
import { IncomingMessage } from 'http';
import { verifiserIdportenSubjectToken } from './idporten.js';
import { logger } from '../backend-logger.js';

let tokenxClient: Client;

export async function initTokenXClient() {
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

async function getTokenXToken(token: string, audience: string): Promise<TokenSet | null> {
    return await tokenxClient
        ?.grant(
            {
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience: audience,
                subject_token: token,
            },
            {
                clientAssertionPayload: {
                    nbf: Math.floor(Date.now() / 1000),
                    // TokenX only allows a single audience
                    aud: [tokenxClient?.issuer.metadata.token_endpoint],
                },
            }
        )
        .catch((err: any) => {
            logger.error('Noe gikk galt med token exchange', err);
            return null
        });
}

export async function exchangeToken(request: IncomingMessage, audience: string) {
    let accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        // Brukeren er ikke autorisert
        return;
    }
    await verifiserIdportenSubjectToken(accessToken);

    return await getTokenXToken(accessToken, audience);
}
