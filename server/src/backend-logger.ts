import pino from 'pino';
import { log_events_counter } from './prometheus.js';

export const logger = pino({
    customLevels: {
        //http-proxy-middleware 2.x requires the logger to have a default .log function
        log: 35,
    },
    hooks: {
        logMethod(inputArgs, method, level) {
            log_events_counter.inc({ level: pino.levels.labels[level] });

            return method.apply(this, inputArgs);
        },
    },
    timestamp: false,
    formatters: {
        level: (label) => {
            return { level: label };
        },
    },
});
