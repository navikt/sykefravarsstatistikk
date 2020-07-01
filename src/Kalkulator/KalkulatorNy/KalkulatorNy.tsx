import React, { FunctionComponent, useEffect, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './KalkulatorNy.less';
import { scrollToBanner } from '../../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import { AntallTapteDagsverkEllerProsent } from '../kalkulator-utils';
import { useSendEvent } from '../../amplitude/amplitude';
import { KalkulatorMedDagsverkNy } from './KalkulatorMedDagsverkNy';
import { KalkulatorMedProsentNy } from './KalkulatorMedProsentNy';
import { ToggleKnappPure } from 'nav-frontend-toggle';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const KalkulatorNy: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const [antallTapteDagsverkEllerProsent, setAntalltapteDagsverkEllerProsent] = useState<
        AntallTapteDagsverkEllerProsent
    >(AntallTapteDagsverkEllerProsent.Sykefraværsprosent);

    const sendEvent = useSendEvent();

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
                                <Systemtittel tag={'h2'} className="kalkulator__tittel">
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
                                    pressed={
                                        antallTapteDagsverkEllerProsent ===
                                        AntallTapteDagsverkEllerProsent.Sykefraværsprosent
                                    }
                                    onClick={() => {
                                        sendEvent('kalkulator toggle prosent', 'klikk');
                                        setAntalltapteDagsverkEllerProsent(
                                            AntallTapteDagsverkEllerProsent.Sykefraværsprosent
                                        );
                                    }}
                                >
                                    Prosent
                                </ToggleKnappPure>
                                <ToggleKnappPure
                                    pressed={
                                        antallTapteDagsverkEllerProsent ===
                                        AntallTapteDagsverkEllerProsent.AntallTapteDagsverk
                                    }
                                    onClick={() => {
                                        sendEvent('kalkulator toggle dagsverk', 'klikk');
                                        setAntalltapteDagsverkEllerProsent(
                                            AntallTapteDagsverkEllerProsent.AntallTapteDagsverk
                                        );
                                    }}
                                >
                                    Dagsverk
                                </ToggleKnappPure>
                            </div>
                        </div>
                        <Normaltekst className="kalkulator__input-overskrift">
                            Fyll inn og juster tallene så de passer for deg.
                        </Normaltekst>
                        {antallTapteDagsverkEllerProsent ===
                        AntallTapteDagsverkEllerProsent.AntallTapteDagsverk ? (
                            <KalkulatorMedDagsverkNy
                                restSykefraværshistorikk={restSykefraværshistorikk}
                            />
                        ) : (
                            <KalkulatorMedProsentNy
                                restSykefraværshistorikk={restSykefraværshistorikk}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KalkulatorNy;
