import React, { FunctionComponent, useEffect, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './KalkulatorGammel.less';
import { Radio } from 'nav-frontend-skjema';
import { scrollToBanner } from '../../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import { Kalkulatorvariant } from '../kalkulator-utils';
import { useSendEvent } from '../../amplitude/amplitude';
import { KalkulatorMedDagsverkGammel } from './KalkulatorMedDagsverkGammel';
import { KalkulatorMedProsentGammel } from './KalkulatorMedProsentGammel';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const KalkulatorGammel: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const [antallTapteDagsverkEllerProsent, setAntalltapteDagsverkEllerProsent] = useState<
        Kalkulatorvariant
    >(Kalkulatorvariant.Dagsverk);

    const sendEvent = useSendEvent();

    useEffect(() => {
        scrollToBanner();
    }, []);

    return (
        <div className="kalkulator-gammel">
            <div className="kalkulator__wrapper">
                <div className="kalkulator">
                    <div>
                        <Systemtittel tag={'h2'} className="kalkulator__tittel">
                            Så mye koster sykefraværet
                        </Systemtittel>
                        <Normaltekst className="kalkulator__ingress">
                            Se hva sykefraværet koster, og hvor mye virksomheten deres kan spare.
                        </Normaltekst>
                        <div>
                            <Normaltekst className="kalkulator__radiogrouplabel">
                                Beregn kostnad basert på
                            </Normaltekst>
                            <Radio
                                label="Tapte dagsverk"
                                name="antallTapteDagsverk"
                                checked={
                                    antallTapteDagsverkEllerProsent ===
                                    Kalkulatorvariant.Dagsverk
                                }
                                onChange={() => {
                                    setAntalltapteDagsverkEllerProsent(
                                        Kalkulatorvariant.Dagsverk
                                    );
                                    sendEvent('kalkulator radio basertpadagsverk', 'klikk');
                                }}
                            />
                            <Radio
                                label="Sykefraværsprosent"
                                name="antallTapteDagsverk"
                                checked={
                                    antallTapteDagsverkEllerProsent ===
                                    Kalkulatorvariant.Prosent
                                }
                                onChange={() => {
                                    setAntalltapteDagsverkEllerProsent(
                                        Kalkulatorvariant.Prosent
                                    );
                                    sendEvent('kalkulator radio basertpaprosent', 'klikk');
                                }}
                            />
                        </div>
                        {antallTapteDagsverkEllerProsent ===
                        Kalkulatorvariant.Dagsverk ? (
                            <KalkulatorMedDagsverkGammel
                                restSykefraværshistorikk={restSykefraværshistorikk}
                            />
                        ) : (
                            <KalkulatorMedProsentGammel
                                restSykefraværshistorikk={restSykefraværshistorikk}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KalkulatorGammel;
