import { fetchMedFeilhåndtering, LasterInn, RestStatus, Suksess } from './api-utils';
import { BASE_PATH } from '../konstanter';

export type FeatureToggles = {
    [feature: string]: boolean;
};

export type RestFeatureToggles = LasterInn | Suksess<FeatureToggles>;

const featureTogglesPath = (features: string[]) =>
    `${BASE_PATH}/api/feature?` + features.map((featureNavn) => `feature=${featureNavn}`).join('&');

export const hentRestFeatureToggles = async (
    ...features: string[]
): Promise<RestFeatureToggles> => {
    if (features.length === 0) {
        return {
            status: RestStatus.Suksess,
            data: {},
        };
    }

    const response = await fetchMedFeilhåndtering<FeatureToggles>(featureTogglesPath(features), {
        method: 'GET',
        credentials: 'include',
    });

    if (response.status === RestStatus.Suksess) {
        return response;
    } else {
        return {
            status: RestStatus.Suksess,
            data: {},
        };
    }
};