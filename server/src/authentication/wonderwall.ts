import { Express } from "express";
import { BASE_PATH } from "../../../src/konstanter";

export function applyWonderwallLoginRedirect(app: Express) {
  app.get(`${BASE_PATH}/redirect-til-login`, (request, response) => {
    const wonderwallLoginEndpoint = `${BASE_PATH}/oauth2/login?redirect=${
      request.query.redirect as string
    }`;
    response.redirect(wonderwallLoginEndpoint);
  });
}