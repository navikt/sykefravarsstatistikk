import { BASE_PATH } from '../server/konstanter';
import {
    defaultSammenligning,
    getRestSammenligningStatus,
    RestSammenligning,
    RestSammenligningStatus,
} from './sammenligning';
import { RestTapteDagsverk } from './tapteDagsverk';
import { getRestStatus, RestStatus } from './api-utils';
import { RestFeatureToggles } from './featureToggles';

const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;
const tapteDagsverkPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/tapteDagsverk`;
const featureTogglesPath = (features: string[]) =>
    `${BASE_PATH}/api/feature?` + features.map(featureNavn => `feature=${featureNavn}`).join('&');

export const hentRestSammenligning = async (orgnr: string): Promise<RestSammenligning> => {
    const response = await fetch(sammenligningPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });

    const restSammenligningStatus = getRestSammenligningStatus(response.status);

    if (restSammenligningStatus === RestSammenligningStatus.Suksess) {
        let json = await response.json();
        return {
            status: restSammenligningStatus,
            sammenligning: json,
        };
    } else {
        return {
            status: restSammenligningStatus,
            sammenligning: defaultSammenligning,
        };
    }
};

export const hentRestTapteDagsverk = async (orgnr: string): Promise<RestTapteDagsverk> => {
    const response = await fetch(tapteDagsverkPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });

    const restStatus = getRestStatus(response.status);
    if (restStatus === RestStatus.Suksess) {
        return {
            status: RestStatus.Suksess,
            data: await response.json(),
        };
    }
    return {
        status: restStatus,
    };
};

export const hentRestFeatureToggles = async (
    ...features: string[]
): Promise<RestFeatureToggles> => {
    const response = await fetch(featureTogglesPath(features), {
        method: 'GET',
        credentials: 'include',
    });

    const restStatus = getRestStatus(response.status);

    if (restStatus === RestStatus.Suksess) {
        return {
            status: RestStatus.Suksess,
            data: await response.json(),
        };
    }
    return {
        status: RestStatus.Suksess,
        data: {}
    };
};
