import pino from 'pino';

export const backendLogger = (defaultConfig = {}): pino.Logger =>
    pino({
        enabled: process.env['NODE_ENV'] !== 'test',
        ...defaultConfig,
        timestamp: false,
        formatters: {
            level: (label) => {
                return { level: label };
            },
            log: (object: any) => {
                if (object.err) {
                    // backendlogger has an Error-instance, frontendlogger has already serialized it
                    const err =
                        object.err instanceof Error
                            ? pino.stdSerializers.err(object.err)
                            : object.err;
                    object.stack_trace = err.stack;
                    object.type = err.type;
                    object.message = err.message;
                    delete object.err;
                }

                return object;
            },
        },
    });
