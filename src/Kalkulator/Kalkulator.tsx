import React, { FunctionComponent, useEffect, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
import { Radio } from 'nav-frontend-skjema';
import { scrollToBanner } from '../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { AntallTapteDagsverkEllerProsent } from './kalkulator-utils';
import { useSendEvent } from '../amplitude/amplitude';
import { KalkulatorMedDagsverk } from './KalkulatorMedDagsverk';
import { KalkulatorMedProsent } from './KalkulatorMedProsent';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const Kalkulator: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const [antallTapteDagsverkEllerProsent, setAntalltapteDagsverkEllerProsent] = useState<
        AntallTapteDagsverkEllerProsent
    >(AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK);

    const sendEvent = useSendEvent();

    useEffect(() => {
        scrollToBanner();
    }, []);

    return (
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
                                AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
                            }
                            onChange={() => {
                                setAntalltapteDagsverkEllerProsent(
                                    AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
                                );
                                sendEvent('kalkulator radio basertpadagsverk', 'klikk');
                            }}
                        />
                        <Radio
                            label="Sykefraværsprosent"
                            name="antallTapteDagsverk"
                            checked={
                                antallTapteDagsverkEllerProsent ===
                                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                            }
                            onChange={() => {
                                setAntalltapteDagsverkEllerProsent(
                                    AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                );
                                sendEvent('kalkulator radio basertpaprosent', 'klikk');
                            }}
                        />
                    </div>
                    {antallTapteDagsverkEllerProsent ===
                    AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK ? (
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
