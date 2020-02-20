import { useEffect, useState } from 'react';
import { LasterInn, RestStatus, Suksess } from './api-utils';
import { hentRestFeatureToggles } from './api';

export type FeatureToggles = {
    [feature: string]: boolean;
};

export type RestFeatureToggles = LasterInn | Suksess<FeatureToggles>;

export const useRestFeatureToggles = (...features: string[]): RestFeatureToggles => {
    const [featureToggles, setFeatureToggles] = useState<RestFeatureToggles>({
        status: RestStatus.LasterInn,
    });

    useEffect(() => {
        const hentFeatureTogglesOgSettState = async () => {
            setFeatureToggles(await hentRestFeatureToggles(features));
        };
        hentFeatureTogglesOgSettState();
    }, [features]);

    return featureToggles;
};
