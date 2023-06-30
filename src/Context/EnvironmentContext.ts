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
};
export const getEnvironmentContext = (): Data => {
    if (typeof document === 'undefined') {
        logger.error(predefinerteFeilmeldinger.finnerIkkeMiljøvariabler);
        return fallbackData;
    }

    const dataElement = document.getElementById('data');

    if (dataElement === null || !isHtmlScriptElement(dataElement)) {
        logger.error(predefinerteFeilmeldinger.finnerIkkeMiljøvariabler);
        return fallbackData;
    }

    try {
        return Data.parse(JSON.parse(dataElement.text));
    } catch (e) {
        logger.error(predefinerteFeilmeldinger.finnerIkkeMiljøvariabler);
        return fallbackData;
    }
};

export const EnvironmentContext = createContext(getEnvironmentContext());
