import { z } from 'zod';
import { createContext } from 'react';
import { MILJØ } from '../konstanter';
import { logger, predefinerteFeilmeldinger } from '../utils/logger';

const notEmptyTemplateString = z
    .string()
    .refine((value) => !value.startsWith('{{') || !value.endsWith('}}'));

const Data = z.object({
    MILJØ: notEmptyTemplateString.refine((value) => isMiljø(value)),
    MIN_SIDE_ARBEIDSGIVER_URL: notEmptyTemplateString,
    GRAFANA_AGENT_COLLECTOR_URL: notEmptyTemplateString,
});

type Data = z.infer<typeof Data>;
const isHtmlScriptElement = (element: HTMLElement): element is HTMLScriptElement => {
    return element.tagName === 'SCRIPT';
};

const isMiljø = (value: string): value is MILJØ => {
    return (Object.values(MILJØ) as string[]).includes(value);
};

const fallbackData: Data = {
    MILJØ: MILJØ.LOCAL,
    MIN_SIDE_ARBEIDSGIVER_URL: '',
    GRAFANA_AGENT_COLLECTOR_URL: '',
};
export const getEnvironmentContext = (): Data => {
    if (typeof document === 'undefined') {
        console.log('finner ikke document, document :>> ', document);
        logger.error(predefinerteFeilmeldinger.finnerIkkeMiljøvariabler);
        return fallbackData;
    }

    const dataElement = document.getElementById('data');

    console.log('dataElement :>> ', dataElement);

    if (dataElement === null || !isHtmlScriptElement(dataElement)) {
        console.log('finner ikke dataElement');
        logger.error(predefinerteFeilmeldinger.finnerIkkeMiljøvariabler);
        return fallbackData;
    }

    try {
        return Data.parse(JSON.parse(dataElement.text));
    } catch (e) {
        console.log('catch e :>> ', e);
        logger.error(predefinerteFeilmeldinger.finnerIkkeMiljøvariabler);
        return fallbackData;
    }
};

export const EnvironmentContext = createContext(getEnvironmentContext());
