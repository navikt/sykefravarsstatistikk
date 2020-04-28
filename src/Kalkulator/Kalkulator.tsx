import React, { FunctionComponent, useEffect, useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
import LesMerPanel from '../felleskomponenter/LesMerPanel/LesMerPanel';
import { Input, Radio } from 'nav-frontend-skjema';
import Kostnad from './Kostnad/Kostnad';
import { RestStatus } from '../api/api-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import EksternLenke from '../felleskomponenter/EksternLenke/EksternLenke';
import { scrollToBanner } from '../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import {
    getAntallTapteDagsverkSiste4Kvartaler,
    //  getSykefraværsprosentSiste4Kvartaler,
    AntallTapteDagsverkEllerProsent,
    //getAntallMuligeDagsverSiste4Kvartaler,
} from './kalkulator-utils';
import amplitude from '../utils/amplitude';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const Kalkulator: FunctionComponent<Props> = props => {
    const { restSykefraværshistorikk } = props;
    const [tapteDagsverk, setTapteDagsverk] = useState<number | undefined>();
    const [sykefraværsprosent, setSykefraværsprosent] = useState<number | undefined>();
    const [antallTapteDagsverkEllerProsent, setAntalltapteDagsverkEllerProsent] = useState<
        string
    >();
    const [skalViseDefaultTapteDagsverk, setSkalViseDefaultTapteDagsverk] = useState<
        boolean | undefined
    >();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    const totalKostnad = tapteDagsverk && kostnadDagsverk ? tapteDagsverk * kostnadDagsverk : 0;

    const getTotalKoistnad = () => {
        if (!tapteDagsverk || !kostnadDagsverk || !sykefraværsprosent) {
            return 0;
        } else if (
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            return sykefraværsprosent * 1 * kostnadDagsverk;
        } else {
            return tapteDagsverk * kostnadDagsverk;
        }
    };
    const harEndretTapteDagsverk = tapteDagsverk !== undefined;

    const labelsTapteDagsverkEllerProsent =
        antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
            ? AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
            : AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK;
    const setAntallTapteDagsverkEllerProsent = (value: number) => {};
    useEffect(() => {
        if (restSykefraværshistorikk.status === RestStatus.IkkeLastet) {
            setTapteDagsverk(undefined);
        }
    }, [restSykefraværshistorikk]);

    useEffect(() => {
        if (restSykefraværshistorikk.status === RestStatus.Suksess && !harEndretTapteDagsverk) {
            const tapteDagsverkSiste4Kvartaler = getAntallTapteDagsverkSiste4Kvartaler(
                restSykefraværshistorikk.data
            );
            if (tapteDagsverkSiste4Kvartaler === 'erMaskertEllerHarIkkeNokData') {
                setTapteDagsverk(undefined);
                setSkalViseDefaultTapteDagsverk(false);
            } else {
                setTapteDagsverk(tapteDagsverkSiste4Kvartaler);
                setSkalViseDefaultTapteDagsverk(true);
            }
            //console.log(getSykefraværsprosentSiste4Kvartaler(restSykefraværshistorikk.data));
        }
    }, [restSykefraværshistorikk, harEndretTapteDagsverk, antallTapteDagsverkEllerProsent]);

    useEffect(() => {
        scrollToBanner();
    }, []);

    const tapteDagsverkSiste12Mnd = restSykefraværshistorikk.status === RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk && (
            <>
                <Normaltekst>
                    Deres tapte dagsverk siste 12 mnd:{' '}
                    {getAntallTapteDagsverkSiste4Kvartaler(restSykefraværshistorikk.data)}
                </Normaltekst>
                <LesMerPanel
                    åpneLabel="Hvor kommer dette tallet fra?"
                    lukkLabel="Lukk"
                    className="kalkulator__lesmer-tapte-dagsverk"
                    onÅpne={() => {
                        amplitude.logEvent(
                            '#sykefravarsstatistikk-kalkulator dagsverk lesmer-klikk'
                        );
                    }}
                >
                    <Normaltekst>
                        Et dagsverk er arbeid som utføres på en dag. Antall tapte dagsverk bergenes
                        ut fra det legemeldte sykefraværet de siste 12 månedene og er tilgjengelig i
                        NAVs datagrunnlag.
                    </Normaltekst>
                </LesMerPanel>
            </>
        );

    const radioProsentEllerAntall = (
        <>
            <div>
                <div>Beregn kostnad basert på</div>
                <Radio
                    label="Tapte dagsverk"
                    name="antallTapteDagsverk"
                    defaultChecked={true}
                    onChange={() => {
                        setAntalltapteDagsverkEllerProsent(
                            AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
                        );
                    }}
                />
                <Radio
                    label="Sykefraværsprosent"
                    name="antallTapteDagsverk"
                    onChange={() => {
                        setAntalltapteDagsverkEllerProsent(
                            AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                        );
                    }}
                />
            </div>
        </>
    );
    const tapteDagsverkSpinner = restSykefraværshistorikk.status === RestStatus.IkkeLastet && (
        <NavFrontendSpinner className="kalkulator__spinner" transparent={true} />
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
                    {radioProsentEllerAntall}
                    <Input
                        label={<Element>Kostnad per dagsverk (kr)</Element>}
                        onChange={event => setKostnadDagsverk(parseInt(event.target.value))}
                        onClick={() => {
                            amplitude.logEvent(
                                '#sykefravarsstatistikk-kalkulator kostnad input-klikk'
                            );
                        }}
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
                        onÅpne={() => {
                            amplitude.logEvent(
                                '#sykefravarsstatistikk-kalkulator kostnad lesmer-klikk'
                            );
                        }}
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
                        label={<Element>{labelsTapteDagsverkEllerProsent}</Element>}
                        onChange={event => setTapteDagsverk(parseInt(event.target.value))}
                        onClick={() => {
                            amplitude.logEvent(
                                '#sykefravarsstatistikk-kalkulator dagsverk input-klikk'
                            );
                        }}
                        value={tapteDagsverk || ''}
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                        className="kalkulator__input"
                    />
                    {tapteDagsverkSpinner}
                    {tapteDagsverkSiste12Mnd}
                </div>
                <Kostnad kostnad={totalKostnad} />
            </div>
        </div>
    );
};

export default Kalkulator;
