import React, { FunctionComponent, useContext } from 'react';
import Kalkulator from './Kalkulator';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { featureTogglesContext } from '../utils/FeatureTogglesContext';
import { RestStatus } from '../api/api-utils';
import { useSendEvent } from '../amplitude/amplitude';
import Lasteside from '../Lasteside/Lasteside';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorABTest: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const restFeatureToggles = useContext(featureTogglesContext);
    const sendEvent = useSendEvent();

    if (restFeatureToggles.status === RestStatus.Suksess) {
        const skalBrukeNyKalkulator = restFeatureToggles.data['arbeidsgiver.kalkulator-abtesting'];
        if (skalBrukeNyKalkulator) {
            sendEvent('kalkulator', 'lastet', { kalkulator: 'ny' });
            return <div>ny kalkulator</div>; // TODO Erstatt med ny kalkulator
        } else {
            sendEvent('kalkulator', 'lastet', { kalkulator: 'gammel' });
            return <Kalkulator restSykefraværshistorikk={restSykefraværshistorikk} />;
        }
    }
    if (restFeatureToggles.status === RestStatus.LasterInn) {
        return <Lasteside />;
    }
    return <Kalkulator restSykefraværshistorikk={restSykefraværshistorikk} />;
};
