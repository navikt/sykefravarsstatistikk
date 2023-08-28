import { z } from 'zod';
import { createContext } from 'react';
import { MILJØ } from '../konstanter';

const notEmptyTemplateString = z
    .string()
    .refine((value) => !value.startsWith('{{') || !value.endsWith('}}'));
const optionalTemplateString = z.optional(
    z.string().refine((value) => !value.startsWith('{{') || !value.endsWith('}}'))
);

const Data = z.object({
    MILJØ: notEmptyTemplateString.refine((value) => isMiljø(value)),
    MIN_SIDE_ARBEIDSGIVER_URL: notEmptyTemplateString,
    GRAFANA_AGENT_COLLECTOR_URL: notEmptyTemplateString,
    PROD_URL: optionalTemplateString,
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
    PROD_URL: 'https://arbeidsgiver.nav.no/sykefravarsstatistikk',
};
export const getEnvironmentContext = (): Data => {
    if (typeof document === 'undefined') {
        console.error(
            `Finner ikke URL i miljøvariabler - klienten vil mangle korrekte lenker: document er undefined`
        );
        return fallbackData;
    }

    const dataElement = document.getElementById('data');

    if (dataElement === null || !isHtmlScriptElement(dataElement)) {
        console.error(
            `Finner ikke URL i miljøvariabler - klienten vil mangle korrekte lenker: data element er null eller ikke et scriptelement`
        );
        return fallbackData;
    }

    try {
        return Data.parse(JSON.parse(dataElement.text));
    } catch (e) {
        console.error(
            `Finner ikke URL i miljøvariabler - klienten vil mangle korrekte lenker: ${JSON.stringify(
                e
            )}`
        );
        return fallbackData;
    }
};

export const EnvironmentContext = createContext(getEnvironmentContext());
