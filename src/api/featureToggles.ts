import { useEffect, useState } from 'react';
import { RestRessurs, RestStatus } from './api-utils';
import { hentRestFeatureToggles } from './api';

export type FeatureToggles = {
    [feature: string]: boolean;
};

export type RestFeatureToggles = RestRessurs<FeatureToggles>;

export const useRestFeatureToggles = (): RestFeatureToggles => {
    const [featureToggles, setFeatureToggles] = useState<RestFeatureToggles>({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        const hentFeatureTogglesOgSettState = async () => {
            setFeatureToggles(await hentRestFeatureToggles('feature1', 'arbeidsgiver.test'));
        };
        hentFeatureTogglesOgSettState();
    }, []);

    return featureToggles;
};
