import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { RestStatus } from '../../api/api-utils';
import { ABTestVersjon, getABTestVersjon, sendABTestEvent } from './ab-test-utils';
import { RestFeatureToggles } from '../../api/featureToggles';
import Lasteside from '../../Lasteside/Lasteside';

interface Props {
    feature: string;
    restFeatureToggles: RestFeatureToggles;
    versjonA: ReactElement;
    versjonB: ReactElement;
}

export const ABTest: FunctionComponent<Props> = ({
    feature,
    versjonA,
    versjonB,
    restFeatureToggles,
}) => {
    useEffect(() => {
        if (restFeatureToggles.status === RestStatus.Suksess) {
            sendABTestEvent(feature, getABTestVersjon(restFeatureToggles.data[feature]));
        }
    }, [restFeatureToggles, feature]);

    if (restFeatureToggles.status !== RestStatus.Suksess) {
        return <Lasteside />;
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
