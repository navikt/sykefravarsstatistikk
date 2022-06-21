import React, { FunctionComponent, useEffect, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
import { scrollToBanner } from '../../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../../api/kvartalsvis-sykefraværshistorikk-api';
import { Kalkulatorvariant } from '../kalkulator-utils';
import { sendKnappEvent, sendSidevisningEvent } from '../../amplitude/events';
import { KalkulatorMedDagsverk } from './KalkulatorMedDagsverk';
import { KalkulatorMedProsent } from './KalkulatorMedProsent';
import { ToggleKnappPure } from 'nav-frontend-toggle';
import {
    IaTjenesteKilde,
    useSendIaTjenesteMetrikkMottattEvent,
} from '../../metrikker/iatjenester';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const Kalkulator: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const [kalkulatorvariant, setKalkulatorvariant] = useState<Kalkulatorvariant>(
        Kalkulatorvariant.Prosent
    );
    const [sendKalkulatorMetrikker, setSendKalkulatorMetrikker] = useState<boolean>(false);

    const sendIaTjensterKalkulatorMetrikker = useSendIaTjenesteMetrikkMottattEvent(
        IaTjenesteKilde.KALKULATOR,
        sendKalkulatorMetrikker
    );

    useEffect(() => {
        return sendIaTjensterKalkulatorMetrikker;
    }, [sendIaTjensterKalkulatorMetrikker, sendKalkulatorMetrikker]);

    useEffect(() => {
        sendSidevisningEvent();
        scrollToBanner();
    }, []);

    return (
        <div className="kalkulator__wrapper">
            <div className="kalkulator">
                <div>
                    <div className="kalkulator__tittel-wrapper">
                        <div>
                            <Systemtittel tag="h1" className="kalkulator__tittel">
                                Hvor mye koster sykefraværet?
                            </Systemtittel>
                            <Normaltekst className="kalkulator__ingress">
                                Her kan du beregne hvor mye sykefraværet koster og hvor mye du kan
                                spare. Lønnskostnader og sykepengerefusjon er ikke med i
                                regnestykket og kommer i tillegg til kostnad per dag.
                            </Normaltekst>
                        </div>
                        <div className="kalkulator__dagsverk-eller-prosent-toggle">
                            <ToggleKnappPure
                                pressed={kalkulatorvariant === Kalkulatorvariant.Prosent}
                                onClick={() => {
                                    setKalkulatorvariant(Kalkulatorvariant.Prosent);
                                    sendKnappEvent('Prosent');
                                    setSendKalkulatorMetrikker(true);
                                }}
                            >
                                Prosent
                            </ToggleKnappPure>
                            <ToggleKnappPure
                                pressed={kalkulatorvariant === Kalkulatorvariant.Dagsverk}
                                onClick={() => {
                                    setKalkulatorvariant(Kalkulatorvariant.Dagsverk);
                                    sendKnappEvent('Dagsverk');
                                    setSendKalkulatorMetrikker(true);
                                }}
                            >
                                Dagsverk
                            </ToggleKnappPure>
                        </div>
                    </div>
                    <Normaltekst className="kalkulator__input-overskrift">
                        Fyll inn og juster tallene så de passer for deg
                    </Normaltekst>
                    {kalkulatorvariant === Kalkulatorvariant.Dagsverk ? (
                        <KalkulatorMedDagsverk
                            restSykefraværshistorikk={restSykefraværshistorikk}
                        />
                    ) : (
                        <KalkulatorMedProsent restSykefraværshistorikk={restSykefraværshistorikk} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Kalkulator;
