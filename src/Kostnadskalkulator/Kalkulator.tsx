import React, { FunctionComponent } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
import LesMerPanel from '../Forside/Legemeldtsykefraværpanel/HvordanBeregnesTallene/LesMerPanel/LesMerPanel';
import { Input } from 'nav-frontend-skjema';

const Kalkulator: FunctionComponent = () => (
    <div className="kalkulator__wrapper">
        <div className="kalkulator">
            <Systemtittel className="kalkulator__tittel">Kostnadskalkulator</Systemtittel>
            <Normaltekst>
                En catchy ingress dersom det er behov for det. En catchy ingress dersom det er behov for det. Den bør
                helst ikke være så lang.
            </Normaltekst>
            <LesMerPanel åpneLabel="Slik beregnes tallene" lukkLabel="Lukk">
                <Normaltekst>
                    En catchy ingress dersom det er behov for det. En catchy ingress dersom det er behov for det. Den
                    bør helst ikke være så lang.
                </Normaltekst>
            </LesMerPanel>

            <Normaltekst>Deres tapte dagsverk siste 12 mnd: 1230</Normaltekst>
            <Input label={<Element>Antall tapte dagsverk</Element>}></Input>

            <Input label={<Element>Kostnad per dagsverk</Element>}></Input>

        </div>
    </div>
);
export default Kalkulator;
