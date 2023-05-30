import pino from 'pino';
import { BASE_PATH } from '../konstanter';

export const frontendLogger = (): pino.Logger =>
    pino({
        enabled: process.env['NODE_ENV'] !== 'test',
        browser: {
            transmit: {
                send: async (_, logEvent) => {
                    try {
                        // If your app uses a basePath, you'll need to add it to the path here
                        await fetch(`${BASE_PATH}/internal/logger`, {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(logEvent),
                        });
                    } catch (e) {
                        console.warn(e);
                        console.warn('Unable to log to backend', logEvent);
                    }
                },
            },
        },
    });
