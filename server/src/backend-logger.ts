import * as z from 'zod';
import pino from 'pino';
import { log_events_counter } from './prometheus.js';

type NonEmptyArray<T> = [T, ...T[]];
export type Levels = {
    readonly [level in pino.Level]: { readonly label: level; readonly value: number };
};
export const levels: Levels = {
    trace: { label: 'trace', value: 10 },
    debug: { label: 'debug', value: 20 },
    info: { label: 'info', value: 30 },
    warn: { label: 'warn', value: 40 },
    error: { label: 'error', value: 50 },
    fatal: { label: 'fatal', value: 60 },
} as const;

// Liste over feilmeldinger backend har tilgang til å sende.
const predefinerteFeilmeldinger = {
    feilVedHentingAvAltinnOrganisasjoner: 'Feil ved kall til Altinn for henting av organisasjoner',
    feilVedNettverkskall: 'Det er oppstått en feil ved nettverkskall',
} as const;

const tekniskeLoggFeil = {
    manglendeEllerMalformetMelding: 'Prøver å logge en malformet eller manglende loggmelding',
    ikkePredefinertMelding: 'Prøver å logge en ikke predefinert loggmelding',
} as const;

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

export const loggingHandler = (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    if (req.body === undefined) {
        res.status(400).json({ error: '400 Bad Request' });
        return;
    }

    const { level, ts, messages } = req.body;

    if (!isLevel(level)) {
        const validLevels = Object.values(levels).map((e) => `${JSON.stringify(e)}`);

        res.status(400).json({
            error: `Invalid "level" ${JSON.stringify(
                level
            )}, endpoint expects "level" to be one of [ ${validLevels} ]`,
        });
        return;
    }

    if (!isTimestamp(ts)) {
        res.status(400).json({ error: `Invalid timestamp ${ts}` });
        return;
    }

    const message = getMessage(messages);

    const label = Object.values(tekniskeLoggFeil as Record<string, string>).includes(message)
        ? levels.error.label
        : level.label;
    if (!isValidLoggingLabel(label)) {
        res.status(400).json({ error: `Invalid label ${label}` });
        return;
    }

    logger
        .child({
            x_timestamp: ts,
            x_isFrontend: true,
            x_userAgent: req.headers['user-agent'],
            x_request_id: req.headers['x-request-id'] ?? 'not-set',
        })
        [label](message);

    res.status(200).json({ ok: `ok` });
};

function getMessage(message): string {
    if (!isNonEmptyStringArray(message)) {
        return tekniskeLoggFeil.manglendeEllerMalformetMelding;
    }
    if (
        isNonEmptyStringArray(message) &&
        Object.values(predefinerteFeilmeldinger as Record<string, string>).includes(message[0])
    ) {
        return message[0];
    }
    return tekniskeLoggFeil.ikkePredefinertMelding;
}

function isValidLoggingLabel(label): label is pino.Level {
    return typeof label === 'string' && Object.hasOwn(levels, label);
}

function isNonEmptyStringArray(message): message is NonEmptyArray<string> {
    try {
        z.string().array().min(1).parse(message);
        return true;
    } catch (e) {
        return false;
    }
}

function isTimestamp(timestamp): timestamp is number {
    return typeof timestamp === 'number';
}

function isLevel(level): level is Levels[pino.Level] {
    return (
        z
            .object({
                label: z.string(),
                value: z.number(),
            })
            .safeParse(level).success && isValidLoggingLabel(level.label)
    );
}
