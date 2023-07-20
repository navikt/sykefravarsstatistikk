import pino from 'pino';

export const backendLogger = pino({
    enabled: process.env['NODE_ENV'] !== 'test',
    timestamp: false,
    formatters: {
        level: (label) => {
            return { level: label };
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        log: (object: any) => {
            if (object.err) {
                // backendlogger has an Error-instance, frontendlogger has already serialized it
                const err =
                    object.err instanceof Error ? pino.stdSerializers.err(object.err) : object.err;
                object.stack_trace = err.stack;
                object.type = err.type;
                object.message = err.message;
                delete object.err;
            }

            return object;
        },
    },
});
