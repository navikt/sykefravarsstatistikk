import React, { FunctionComponent, useEffect, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './KalkulatorNy.less';
import { Radio } from 'nav-frontend-skjema';
import { scrollToBanner } from '../../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import { AntallTapteDagsverkEllerProsent } from '../kalkulator-utils';
import { useSendEvent } from '../../amplitude/amplitude';
import { KalkulatorMedDagsverkNy } from './KalkulatorMedDagsverkNy';
import { KalkulatorMedProsentNy } from './KalkulatorMedProsentNy';
import { ToggleGruppePure, ToggleKnappPure } from 'nav-frontend-toggle';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const KalkulatorNy: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const [antallTapteDagsverkEllerProsent, setAntalltapteDagsverkEllerProsent] = useState<
        AntallTapteDagsverkEllerProsent
    >(AntallTapteDagsverkEllerProsent.Sykefraværsprosent);

    const sendEvent = useSendEvent();

    useEffect(() => {
        console.log('scroller');
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
                                    Så mye koster sykefraværet
                                </Systemtittel>
                                <Normaltekst className="kalkulator__ingress">
                                    Se hva sykefraværet koster, og hvor mye virksomheten deres kan
                                    spare.
                                </Normaltekst>
                            </div>
                            <div className="kalkulator__dagsverk-eller-prosent-toggle">
                                <ToggleKnappPure
                                    pressed={
                                        antallTapteDagsverkEllerProsent ===
                                        AntallTapteDagsverkEllerProsent.Sykefraværsprosent
                                    }
                                    onClick={() =>
                                        setAntalltapteDagsverkEllerProsent(
                                            AntallTapteDagsverkEllerProsent.Sykefraværsprosent
                                        )
                                    }
                                >
                                    Bruk prosent
                                </ToggleKnappPure>
                                <ToggleKnappPure
                                    pressed={
                                        antallTapteDagsverkEllerProsent ===
                                        AntallTapteDagsverkEllerProsent.AntallTapteDagsverk
                                    }
                                    onClick={() =>
                                        setAntalltapteDagsverkEllerProsent(
                                            AntallTapteDagsverkEllerProsent.AntallTapteDagsverk
                                        )
                                    }
                                >
                                    Bruk dagsverk
                                </ToggleKnappPure>
                            </div>
                        </div>
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
