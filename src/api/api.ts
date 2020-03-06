import { BASE_PATH } from '../server/konstanter';
import { getRestStatus, RestStatus } from './api-utils';
import { RestFeatureToggles } from './featureToggles';
import { RestSykefraværshistorikk } from './sykefraværshistorikk';

const sykefraværshistorikkPath = (orgnr: string) =>
    `${BASE_PATH}/api/${orgnr}/sykefravarshistorikk`;
const featureTogglesPath = (features: string[]) =>
    `${BASE_PATH}/api/feature?` + features.map(featureNavn => `feature=${featureNavn}`).join('&');

export const hentRestSykefraværshistorikk = async (
    orgnr: string
): Promise<RestSykefraværshistorikk> => {
    const response = await fetch(sykefraværshistorikkPath(orgnr), {
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
    if (features.length === 0) {
        return {
            status: RestStatus.Suksess,
            data: {},
        };
    }

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
        data: {},
    };
};
