import React, { FunctionComponent, ReactElement, useContext, useEffect } from 'react';
import { RestStatus } from '../api/api-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { ABTestVersjon, getABTestVersjon, sendABTestEvent } from './ab-test-utils';
import { featureTogglesContext } from '../utils/FeatureTogglesContext';

interface Props {
    feature: string;
    versjonA: ReactElement;
    versjonB: ReactElement;
}

export const ABTest: FunctionComponent<Props> = ({ feature, versjonA, versjonB }) => {
    const restFeatureToggles = useContext(featureTogglesContext);

    useEffect(() => {
        if (restFeatureToggles.status === RestStatus.Suksess) {
            console.log(
                'abtest-event',
                feature,
                getABTestVersjon(restFeatureToggles.data[feature])
            );
            sendABTestEvent(feature, getABTestVersjon(restFeatureToggles.data[feature]));
        }
    }, [restFeatureToggles, feature]);

    if (restFeatureToggles.status !== RestStatus.Suksess) {
        return <NavFrontendSpinner />;
    }

    const versjonSomSkalBrukes = getABTestVersjon(restFeatureToggles.data[feature]);

    switch (versjonSomSkalBrukes) {
        case ABTestVersjon.VersjonA:
        case ABTestVersjon.Fallback:
            return versjonA;
        case ABTestVersjon.VersjonB:
            return versjonB;
    }
};
