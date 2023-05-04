import { z } from 'zod';
import getDecorator from './decorator.js';
import { logger } from "./backend-logger";

export const MILJØ = {
    PROD: 'prod-gcp',
    DEV: 'dev-gcp',
    DEV_EKSTERN: 'dev-gcp-ekstern',
    LOCAL: 'local',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type MILJØ = typeof MILJØ[keyof typeof MILJØ];
const isMiljø = (value: string): value is MILJØ => {
    return (Object.values(MILJØ) as string[]).includes(value);
};
function getCurrentEnvironment() {
    const { MILJO = 'local' } = process.env;
    return MILJO;
}

function getDekoratørUrl() {
    const { DEKORATOR_URL = 'https://www.nav.no/dekoratoren' } = process.env;
    return DEKORATOR_URL;
}
function errorMap(issue: z.ZodIssueOptionalMessage, ctx: z.ErrorMapCtx): { message: string } {
    return { message: `Kunne ikke parse miljøvariabler. [${ctx.defaultError}]` };
}
function getFrontendEnvs() {
    try {
        return z
            .object({
                MILJO: z.string().refine(isMiljø),
                MIN_SIDE_ARBEIDSGIVER_URL: z.string().url(),
            })
            .parse(process.env, { errorMap: errorMap });
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            return {
                MILJO: MILJØ.LOCAL,
                MIN_SIDE_ARBEIDSGIVER_URL:
                    'https://arbeidsgiver.ekstern.dev.nav.no/min-side-arbeidsgiver',
            };
        }
        logger.error("Failed to parse frontend envs", err);
        throw err;
    }
}

export function getKalkulatorRedirectUrl() {
    try {
        return z.string().url().parse(process.env.FOREBYGGE_FRAVAR_URL) + '/kalkulator';
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            return 'https://arbeidsgiver.ekstern.dev.nav.no/forebygge-fravar/kalkulator';
        }
        //Fail fast if not dev
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

export async function getTemplateValues() {
    const frontendEnvs = getFrontendEnvs();
    const decoratorParts = await getDecorator(getDekoratørUrl());
    return { ...frontendEnvs, ...decoratorParts };
}
