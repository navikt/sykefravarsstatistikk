import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { RestStatus } from '../../api/api-utils';
import { ABTestVersjon, getABTestVersjon } from './ab-test-utils';
import { RestFeatureToggles } from '../../api/feature-toggles-api';
import Lasteside from '../../Lasteside/Lasteside';

interface Props {
    feature: string;
    restFeatureToggles: RestFeatureToggles;
    versjonA: ReactElement;
    versjonB: ReactElement;
}

const sendTriggerTilHotjar = (versjon: ABTestVersjon) => {
    if (versjon === ABTestVersjon.Fallback) return;
    const hotjar = (window as any).hj;
    hotjar && hotjar('trigger', 'ab-test-' + versjon);
};

// TODO: Vi tror ikke dette er i bruk lenger. Finn ut om det bare kan fjernes.
export const ABTest: FunctionComponent<Props> = ({
    feature,
    versjonA,
    versjonB,
    restFeatureToggles,
}) => {
    useEffect(() => {
        if (restFeatureToggles.status === RestStatus.Suksess) {
            const versjon = getABTestVersjon(restFeatureToggles.data[feature]);
            sendTriggerTilHotjar(versjon);
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
