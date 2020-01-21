import React, { FunctionComponent, useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
import LesMerPanel from '../Forside/Legemeldtsykefraværpanel/HvordanBeregnesTallene/LesMerPanel/LesMerPanel';
import { Input } from 'nav-frontend-skjema';
import Brødsmulesti from '../Brødsmulesti/Brødsmulesti';

const Kalkulator: FunctionComponent = () => {
    const [tapteDagsverk, setTapteDagsverk] = useState<number | undefined>(0);
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2500);

    const setStateHvisValueErTall = (
        event: React.ChangeEvent<HTMLInputElement>,
        setState: (tall: number | undefined) => void
    ) => {
        const value = event.target.value;
        if (parseInt(value) > 0) {
            setState(parseInt(value));
        } else if (value === '') {
            setState(undefined);
        }
    };

    return (
        <div className="kalkulator__wrapper">
            <Brødsmulesti />
            <div className="kalkulator">
                <Systemtittel className="kalkulator__tittel">Kostnadskalkulator</Systemtittel>
                <Normaltekst>
                    En catchy ingress dersom det er behov for det. En catchy ingress dersom det er
                    behov for det. Den bør helst ikke være så lang.
                </Normaltekst>
                <LesMerPanel åpneLabel="Slik beregnes tallene" lukkLabel="Lukk">
                    <Normaltekst>
                        En catchy ingress dersom det er behov for det. En catchy ingress dersom det
                        er behov for det. Den bør helst ikke være så lang.
                    </Normaltekst>
                </LesMerPanel>

                <Normaltekst>Deres tapte dagsverk siste 12 mnd: 1230</Normaltekst>

                <Input
                    label={<Element>Kostnad per dagsverk</Element>}
                    onChange={event => setStateHvisValueErTall(event, setKostnadDagsverk)}
                    value={kostnadDagsverk || ''}
                    bredde={'L'}
                />
                <Input
                    label={<Element>Antall tapte dagsverk</Element>}
                    onChange={event => setStateHvisValueErTall(event, setTapteDagsverk)}
                    value={tapteDagsverk || ''}
                    bredde={'L'}
                />
                <Normaltekst>
                    Din kostnad er:{' '}
                    {tapteDagsverk && kostnadDagsverk ? tapteDagsverk * kostnadDagsverk : ''}
                </Normaltekst>
            </div>
        </div>
    );
};
export default Kalkulator;
