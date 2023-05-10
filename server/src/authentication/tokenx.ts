import { Issuer, Client, TokenSet } from 'openid-client';
import { verifiserIdportenSubjectToken } from './idporten.js';
import { logger } from '../backend-logger.js';
import { RequestHandler, Request } from "express";

export function tokenExchangeMiddleware(audience: string): RequestHandler {
  return async (req, _res, next) => {
    await exchangeIdportenSubjectToken(req, audience);
    next();
  };
}

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

async function exchangeIdportenSubjectToken(
    request: Request,
    audience: string
): Promise<void> {
    let subjectToken = request.headers['authorization']?.split(' ')[1];

    if (!subjectToken) {
        return;
    }

    try {
        await verifiserIdportenSubjectToken(subjectToken);

        let tokenSet = await tokenExchange(subjectToken, audience);

        if (!tokenSet?.expired() && tokenSet?.access_token) {
            request.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
        }
    } catch (error) {
        // Handle the error appropriately, e.g., log it or return an error response
        error.error('Error during exchangeIdportenSubjectToken:', error);
    }
}

async function tokenExchange(token: string, audience: string): Promise<TokenSet | null> {
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
            return null;
        });
}
