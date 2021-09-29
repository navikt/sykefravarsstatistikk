import React, { FunctionComponent, useEffect, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
import { scrollToBanner } from '../../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../../api/kvartalsvisSykefraværshistorikk';
import { Kalkulatorvariant } from '../kalkulator-utils';
import { useSendEvent, useSendSidevisningEvent, useTidsbrukEvent } from '../../amplitude/events';
import { KalkulatorMedDagsverk } from './KalkulatorMedDagsverk';
import { KalkulatorMedProsent } from './KalkulatorMedProsent';
import { ToggleKnappPure } from 'nav-frontend-toggle';
import { useOrgnr } from '../../utils/orgnr-hook';
import { useSendIaTjenesteMetrikkMottattVedSidevisningEvent } from '../../metrikker/iatjenester';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const Kalkulator: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const [kalkulatorvariant, setKalkulatorvariant] = useState<Kalkulatorvariant>(
        Kalkulatorvariant.Prosent,
    );
    const orgnr = useOrgnr();
    const sendEvent = useSendEvent();

    // kalkulator2 fordi det opprinnelige eventnavnet er merget med en annen event i Amplitude
    useTidsbrukEvent('kalkulator2', 5, 30, 60, 120);
    useSendSidevisningEvent('kalkulator', orgnr);
    useSendIaTjenesteMetrikkMottattVedSidevisningEvent();

    useEffect(() => {
        scrollToBanner();
    }, []);

    return (
        <div className="kalkulator-ny">
            <div className="kalkulator__wrapper">
                <div className="kalkulator">
                    <div>
                        <div className="kalkulator__tittel-wrapper">
                            <div>
                                <Systemtittel tag="h1" className="kalkulator__tittel">
                                    Hvor mye koster sykefraværet?
                                </Systemtittel>
                                <Normaltekst className="kalkulator__ingress">
                                    Her kan du beregne hvor mye sykefraværet koster og hvor mye du
                                    kan spare. Lønnskostnader og sykepengerefusjon er ikke med i
                                    regnestykket og kommer i tillegg til kostnad per dag.
                                </Normaltekst>
                            </div>
                            <div className="kalkulator__dagsverk-eller-prosent-toggle">
                                <ToggleKnappPure
                                    pressed={kalkulatorvariant === Kalkulatorvariant.Prosent}
                                    onClick={() => {
                                        sendEvent('kalkulator toggle prosent', 'klikk');
                                        setKalkulatorvariant(Kalkulatorvariant.Prosent);
                                    }}
                                >
                                    Prosent
                                </ToggleKnappPure>
                                <ToggleKnappPure
                                    pressed={kalkulatorvariant === Kalkulatorvariant.Dagsverk}
                                    onClick={() => {
                                        sendEvent('kalkulator toggle dagsverk', 'klikk');
                                        setKalkulatorvariant(Kalkulatorvariant.Dagsverk);
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
                            <KalkulatorMedProsent
                                restSykefraværshistorikk={restSykefraværshistorikk}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Kalkulator;
