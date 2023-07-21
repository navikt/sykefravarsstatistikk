import { Registry } from 'prom-client';
import express, { Request, RequestHandler, Response } from 'express';

function isAlive(request: Request, response: Response) {
    response.send('Application is UP');
}

function isReady(request: Request, response: Response) {
    response.send('Application is READY');
}

function metrics(registry: Registry): RequestHandler {
    return (request: Request, response: Response) => {
        response.set('Content-Type', registry.contentType);
        response.send(registry.metrics());
    };
}

export function internalController(registry: Registry) {
    const router = express.Router({ caseSensitive: false });

    router.get('/isAlive', isAlive);
    router.get('/isReady', isReady);
    router.get('/metrics', metrics(registry));

    return router;
}
