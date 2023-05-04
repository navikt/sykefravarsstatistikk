import { Issuer } from 'openid-client';
import { IncomingMessage } from "http";
import { verifiserAccessToken } from "./idporten";

let tokenxClient: any;

export async function initTokenXClient() {
    const tokenxIssuer = await Issuer.discover(
      process.env.TOKEN_X_WELL_KNOWN_URL!
    );
    tokenxClient = new tokenxIssuer.Client(
      {
          client_id: process.env.TOKEN_X_CLIENT_ID!,
          token_endpoint_auth_method: "private_key_jwt",
      },
      {
          keys: [JSON.parse(process.env.TOKEN_X_PRIVATE_JWK!)],
      }
    );
}

async function getTokenXToken(
  token: any,
  additionalClaims: any,
  audience: string
) {
    return await tokenxClient
      ?.grant(
        {
            grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
            client_assertion_type:
              "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
            audience: audience,
            subject_token: token,
        },
        additionalClaims
      )
      .catch((err: any) => {
          console.error(
            `Noe gikk galt med token exchange mot TokenX.
            Feilmelding fra openid-client: (${err}).
            HTTP Status fra TokenX: (${err.response.statusCode} ${err.response.statusMessage})
            Body fra TokenX:`,
            err.response.body
          );
      });
}

export async function exchangeToken(
  request: IncomingMessage,
  audience: string
) {
    let token = request.headers.authorization?.split(" ")[1];

    if (!token) {
        // Brukeren er ikke autorisert
        return;
    }
    await verifiserAccessToken(token);
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
            // TokenX only allows a single audience
            aud: [tokenxClient?.issuer.metadata.token_endpoint],
        },
    };

    return await getTokenXToken(token, additionalClaims, audience);
}
