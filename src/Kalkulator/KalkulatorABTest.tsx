import React, { FunctionComponent, useContext } from 'react';
import KalkulatorGammel from './KalkulatorGammel/KalkulatorGammel';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { featureTogglesContext } from '../utils/FeatureTogglesContext';
import { RestStatus } from '../api/api-utils';
import { useMålingAvTidsbruk, useSendEvent } from '../amplitude/amplitude';
import Lasteside from '../Lasteside/Lasteside';
import KalkulatorNy from './KalkulatorNy/KalkulatorNy';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorABTest: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const restFeatureToggles = useContext(featureTogglesContext);
    const sendEvent = useSendEvent();
    useMålingAvTidsbruk('kalkulator', 5, 30, 120);

    if (restFeatureToggles.status === RestStatus.Suksess) {
        const skalBrukeNyKalkulator = restFeatureToggles.data['arbeidsgiver.kalkulator-abtesting'];
        if (skalBrukeNyKalkulator) {
            sendEvent('kalkulator', 'vist', { kalkulatorversjon: 'ny' });
            return <KalkulatorNy restSykefraværshistorikk={restSykefraværshistorikk} />;
        } else {
            // TODO Denne sendes kanskje for ofte; må fikses når vi avslutter AB-testen
            sendEvent('kalkulator', 'vist', { kalkulatorversjon: 'gammel' });
            return <KalkulatorGammel restSykefraværshistorikk={restSykefraværshistorikk} />;
        }
    }
    if (restFeatureToggles.status === RestStatus.LasterInn) {
        return <Lasteside />;
    }
    return <KalkulatorGammel restSykefraværshistorikk={restSykefraværshistorikk} />;
};
