import React, { FunctionComponent, useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
import LesMerPanel from '../felleskomponenter/LesMerPanel/LesMerPanel';
import { Input } from 'nav-frontend-skjema';
import Brødsmulesti from '../Brødsmulesti/Brødsmulesti';
import Kostnad from './Kostnad/Kostnad';

interface Props {
    defaultTapteDagsverk: number;
}

const Kalkulator: FunctionComponent<Props> = props => {
    const [tapteDagsverk, setTapteDagsverk] = useState<number | undefined>(
        props.defaultTapteDagsverk
    );
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2500);

    const totalKostnad = tapteDagsverk && kostnadDagsverk ? tapteDagsverk * kostnadDagsverk : 0;

    return (
        <div className="kalkulator__wrapper">
            <Brødsmulesti />
            <div className="kalkulator">
                <div>
                    <Systemtittel tag={'h2'} className="kalkulator__tittel">
                        Så mye koster sykefraværet
                    </Systemtittel>
                    <Input
                        label={<Element>Kostnad per dagsverk</Element>}
                        onChange={event => setKostnadDagsverk(parseInt(event.target.value))}
                        value={kostnadDagsverk || ''}
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                    />
                    <Normaltekst>
                        Deres tapte dagsverk siste 12 mnd: {props.defaultTapteDagsverk}
                    </Normaltekst>
                    <LesMerPanel
                        åpneLabel="Les mer her"
                        lukkLabel="Lukk"
                        className="kalkulator__lesmer-kostnad-dagsverk"
                    >
                        <Normaltekst>
                            En catchy ingress dersom det er behov for det. En catchy ingress dersom
                            det er behov for det. Den bør helst ikke være så lang.
                        </Normaltekst>
                    </LesMerPanel>
                    <Input
                        label={<Element>Antall tapte dagsverk</Element>}
                        onChange={event => setTapteDagsverk(parseInt(event.target.value))}
                        value={tapteDagsverk || ''}
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                    />
                    <Normaltekst>Gjennomsnittlig kostnad per dagsverk: 2600&nbsp;kr</Normaltekst>
                    <LesMerPanel
                        åpneLabel="Les mer her"
                        lukkLabel="Lukk"
                        className="kalkulator__lesmer-tapte-dagsverk"
                    >
                        <Normaltekst>
                            En catchy ingress dersom det er behov for det. En catchy ingress dersom
                            det er behov for det. Den bør helst ikke være så lang.
                        </Normaltekst>
                    </LesMerPanel>
                </div>
                <Kostnad kostnad={totalKostnad} />
            </div>
        </div>
    );
};

export default Kalkulator;
