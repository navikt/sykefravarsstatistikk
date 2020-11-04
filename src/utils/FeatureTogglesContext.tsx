import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestFeatureToggles } from '../api/featureToggles';
import { RestStatus } from '../api/api-utils';
import { hentRestFeatureToggles } from '../api/api';

export const featureTogglesContext = createContext<RestFeatureToggles>({
    status: RestStatus.LasterInn,
});

export const FeatureTogglesProvider: FunctionComponent = (props) => {
    const [featureToggles, setFeatureToggles] = useState<RestFeatureToggles>({
        status: RestStatus.LasterInn,
    });

    useEffect(() => {
        const hentFeatureTogglesOgSettState = async () => {
            setFeatureToggles(
                await hentRestFeatureToggles(
                    'sykefravarsstatistikk.ab-test.tips', // unleash: https://unleash.nais.io/#/features/strategies/sykefravarsstatistikk.ab-test.tips
                    'sykefravarsstatistikk.arbeidsmiljoportal', // unleash: https://unleash.nais.io/#/features/strategies/sykefravarsstatistikk.arbeidsmiljoportal
                    /* Send med features her */
                )
            );
        };

        hentFeatureTogglesOgSettState();
    }, []);
    const Provider = featureTogglesContext.Provider;
    return <Provider value={featureToggles}>{props.children}</Provider>;
};
