import { FunctionComponent, ReactElement, useEffect } from 'react';
import { RestFeatureToggles } from '../api/featureToggles';
import { RestStatus } from '../api/api-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { sendEventDirekte } from '../amplitude/amplitude';
import { ABTestVersjon, getABTestVersjon, sendABTestEvent } from './ab-test-utils';

interface Props {
    feature: string;
    restFeatureToggles: RestFeatureToggles;
    versjonA: ReactElement;
    versjonB: ReactElement;
}

export const ABTest: FunctionComponent<Props> = ({
    feature,
    restFeatureToggles,
    versjonA,
    versjonB,
}) => {
    useEffect(() => {
        if (restFeatureToggles.status === RestStatus.Suksess) {
            console.log(
                'abtest-event',
                feature,
                getABTestVersjon(restFeatureToggles.data[feature])
            );
            sendABTestEvent(feature, getABTestVersjon(restFeatureToggles.data[feature]));
        }
    }, [restFeatureToggles]);

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
