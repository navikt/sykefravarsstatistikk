import React, { FunctionComponent, useEffect, useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
import LesMerPanel from '../felleskomponenter/LesMerPanel/LesMerPanel';
import { Input } from 'nav-frontend-skjema';
import Kostnad from './Kostnad/Kostnad';
import { RestStatus } from '../api/api-utils';
import { RestTapteDagsverk } from '../api/tapteDagsverk';
import { summerTapteDagsverk } from './kalkulator-util';
import NavFrontendSpinner from 'nav-frontend-spinner';
import EksternLenke from '../felleskomponenter/EksternLenke/EksternLenke';
import { scrollToBanner } from '../utils/scrollUtils';

interface Props {
    defaultTapteDagsverk: RestTapteDagsverk;
    erMaskert?: boolean;
}

const Kalkulator: FunctionComponent<Props> = props => {
    const { defaultTapteDagsverk } = props;
    const [tapteDagsverk, setTapteDagsverk] = useState<number | undefined>();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    const totalKostnad = tapteDagsverk && kostnadDagsverk ? tapteDagsverk * kostnadDagsverk : 0;

    const harEndretTapteDagsverk = tapteDagsverk !== undefined;

    useEffect(() => {
        if (defaultTapteDagsverk.status === RestStatus.IkkeLastet) {
            setTapteDagsverk(undefined);
        }
    }, [defaultTapteDagsverk]);

    useEffect(() => {
        if (defaultTapteDagsverk.status === RestStatus.Suksess && !harEndretTapteDagsverk) {
            setTapteDagsverk(summerTapteDagsverk(defaultTapteDagsverk.data));
        }
    }, [defaultTapteDagsverk, harEndretTapteDagsverk]);

    useEffect(() => {
        scrollToBanner();
    }, []);

    const tapteDagsverkSiste12Mnd =
        defaultTapteDagsverk.status === RestStatus.Suksess ? (
            summerTapteDagsverk(defaultTapteDagsverk.data)
        ) : (
            <NavFrontendSpinner className="kalkulator__spinner" transparent={true}/>
        );

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
                    <Input
                        label={<Element>Kostnad per dagsverk (kr)</Element>}
                        onChange={event => setKostnadDagsverk(parseInt(event.target.value))}
                        value={kostnadDagsverk || ''}
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                        className="kalkulator__input"
                        placeholder="kr"
                    />
                    <Normaltekst>Gjennomsnittlig kostnad per dagsverk: 2600&nbsp;kr</Normaltekst>
                    <LesMerPanel
                        åpneLabel="Hvor kommer dette tallet fra?"
                        lukkLabel="Lukk"
                        className="kalkulator__lesmer-kostnad-dagsverk"
                    >
                        <Normaltekst>
                            Hvor mye taper virksomheten på at noen er sykemeldt en dag? I 2011
                            beregnet SINTEF og NHO at hver uke med sykefravær koster en arbeidsgiver
                            i snitt 13 000 kr. Det vil si 2600 kr per dag.{' '}
                            <EksternLenke href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                                Les mer om hva som påvirker kostnader ved sykefravær.
                            </EksternLenke>
                        </Normaltekst>
                    </LesMerPanel>
                    <Input
                        label={<Element>Antall tapte dagsverk</Element>}
                        onChange={event => setTapteDagsverk(parseInt(event.target.value))}
                        value={tapteDagsverk || ''}
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                        className="kalkulator__input"
                    />
                    <Normaltekst>
                        Deres tapte dagsverk siste 12 mnd: {tapteDagsverkSiste12Mnd}
                    </Normaltekst>
                    <LesMerPanel
                        åpneLabel="Hvor kommer dette tallet fra?"
                        lukkLabel="Lukk"
                        className="kalkulator__lesmer-tapte-dagsverk"
                    >
                        <Normaltekst>
                            Et dagsverk er arbeid som utføres på en dag. Antall tapte dagsverk
                            bergenes ut fra det legemeldte sykefraværet de siste 12 månedene og er
                            tilgjengelig i NAVs datagrunnlag.
                        </Normaltekst>
                    </LesMerPanel>
                </div>
                <Kostnad kostnad={totalKostnad}/>
            </div>
        </div>
    );
};

export default Kalkulator;
