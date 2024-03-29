import express, { Request, Response } from 'express';
import { BASE_PATH } from '../common.js';

function redirectToWonderwall(request: Request, response: Response) {
    const wonderwallLoginEndpoint = `${BASE_PATH}/oauth2/login?redirect=${
        request.query.redirect as string
    }`;
    response.redirect(wonderwallLoginEndpoint);
}

export function redirectTilLoginController() {
    const router = express.Router({ caseSensitive: false });

    router.get('/', redirectToWonderwall);

    return router;
}
