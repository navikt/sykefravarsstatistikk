import { z, ZodEffects, ZodOptional, ZodString } from 'zod';
import { logger } from './backend-logger.js';

export const MILJØ = {
    PROD: 'prod-gcp',
    DEV: 'dev-gcp',
    DEV_EKSTERN: 'dev-gcp-ekstern',
    LOCAL: 'local',
} as const;

export type MILJØ = (typeof MILJØ)[keyof typeof MILJØ];
const isMiljø = (value: string): value is MILJØ => {
    return (Object.values(MILJØ) as string[]).includes(value);
};

function getCurrentEnvironment() {
    const { MILJO = 'local' } = process.env;
    return MILJO;
}

function errorMap(issue: z.ZodIssueOptionalMessage, ctx: z.ErrorMapCtx): { message: string } {
    return { message: `Kunne ikke parse miljøvariabler. [${ctx.defaultError}]` };
}

export function getFrontendEnvs() {
    try {
        const miljø = z
            .object({
                MILJO: z.string().refine(isMiljø),
            })
            .parse(process.env, { errorMap: errorMap });

        let shape: {
            GRAFANA_AGENT_COLLECTOR_URL: ZodString | ZodOptional<ZodString>;
            MIN_SIDE_ARBEIDSGIVER_URL: ZodString;
            MILJO: ZodEffects<ZodString>;
        } = {
            MILJO: z.string().refine(isMiljø),
            MIN_SIDE_ARBEIDSGIVER_URL: z.string().url(),
            GRAFANA_AGENT_COLLECTOR_URL: z.string().url(),
        };

        if (miljø.MILJO === MILJØ.DEV_EKSTERN) {
            shape = {
                MILJO: z.string().refine(isMiljø),
                MIN_SIDE_ARBEIDSGIVER_URL: z.string().url(),
                GRAFANA_AGENT_COLLECTOR_URL: z.string().url().optional(),
            };
        }

        return z.object(shape).parse(process.env, { errorMap: errorMap });
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            return {
                MILJO: MILJØ.LOCAL,
                MIN_SIDE_ARBEIDSGIVER_URL:
                    'https://arbeidsgiver.ekstern.dev.nav.no/min-side-arbeidsgiver',
                GRAFANA_AGENT_COLLECTOR_URL: 'https://telemetry.ekstern.dev.nav.no/collect',
            };
        }
        logger.error('Failed to parse frontend envs', err);
        throw err;
    }
}

export function appRunningLocally() {
    return getCurrentEnvironment() === 'local';
}

export function appRunningOnDevGcpEkstern() {
    return getCurrentEnvironment() === 'dev-gcp-ekstern';
}

export function appRunningOnDevGcp() {
    return getCurrentEnvironment() === 'dev-gcp';
}

export function appRunningOnProdGcp() {
    return getCurrentEnvironment() === 'prod-gcp';
}
