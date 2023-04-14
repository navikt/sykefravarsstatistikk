import { Request, Response, NextFunction } from 'express';
import { logger } from './backend-logger.js';

const NANOSECONDS_PER_MILLISECOND = BigInt(1e6);

function logRequest(req: Request, start: bigint) {
    const end = process.hrtime.bigint();

    const method = req.method;
    const path = `${req.baseUrl ? req.baseUrl : ''}${req.path ? req.path : ''}`;
    const statusCode = req.statusCode;
    const contentLength = `(${req.headers['content-length']})`;
    const responseTime = `- ${(end - start) / NANOSECONDS_PER_MILLISECOND}ms`;

    const message = [method, path, statusCode, contentLength, responseTime].join(' ');

    logger.info(message);
}
export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        if (!internalRequests(req)) {
            const start = process.hrtime.bigint();
            res.on('close', () => logRequest(req, start));
        }
    } catch (e) {
        logger.error('Feil har oppstått ved logging av request i middleware');
    } finally {
        next();
    }
}

function internalRequests(req: Request) {
    return req.originalUrl.includes('/internal/') || req.originalUrl.includes('/media/');
}
