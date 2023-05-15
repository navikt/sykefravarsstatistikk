import express, { Request, Response } from 'express';
import { BASE_PATH } from '../common.js';

function redirectTilLogin(request: Request, response: Response) {
    const wonderwallLoginEndpoint = `${BASE_PATH}/oauth2/login?redirect=${
        request.query.redirect as string
    }`;
    response.redirect(wonderwallLoginEndpoint);
}

export default function setup() {
    const router = express.Router({ caseSensitive: false });

    router.get('/', redirectTilLogin);

    return router;
}
