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
    AntallTapteDagsverkEllerProsent,
    getAntallMuligeDagsverkSiste4Kvartaler,
    getAntallTapteDagsverkSiste4Kvartaler,
    getSykefraværsprosentSiste4Kvartaler,
    Maskering,
} from './kalkulator-utils';
import amplitude from '../utils/amplitude';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const Kalkulator: FunctionComponent<Props> = props => {
    const { restSykefraværshistorikk } = props;
    const [nåværendeTapteDagsverk, setNåværendeTapteDagsverk] = useState<number | undefined>();
    const [ønsketTapteDagsverk, setØnsketTapteDagsverk] = useState<number | undefined>();
    const [muligeDagsverk, setMuligeDagsverk] = useState<number | undefined>();
    const [sykefraværsprosent, setSykefraværsprosent] = useState<number | undefined>();
    const [ønsketSykefraværsprosent, setØnsketSykefraværsprosent] = useState<number | undefined>();
    const [antallTapteDagsverkEllerProsent, setAntalltapteDagsverkEllerProsent] = useState<
        AntallTapteDagsverkEllerProsent
    >();
    const [skalViseDefaultTapteDagsverk, setSkalViseDefaultTapteDagsverk] = useState<
        boolean | undefined
    >();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    //const totalKostnad = nåværendeTapteDagsverk && kostnadDagsverk ? nåværendeTapteDagsverk * kostnadDagsverk : 0;

    const getTotalKostnad = () => {
        console.log(nåværendeTapteDagsverk);
        if (
            kostnadDagsverk &&
            sykefraværsprosent &&
            muligeDagsverk &&
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            return ((sykefraværsprosent * muligeDagsverk) / 100) * kostnadDagsverk;
        } else if (nåværendeTapteDagsverk && kostnadDagsverk) {
            return nåværendeTapteDagsverk * kostnadDagsverk;
        } else {
            return 0;
        } /*if (!nåværendeTapteDagsverk || !kostnadDagsverk || !sykefraværsprosent || !muligeDagsverk) {
            return 0;
        } else if (
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            return ((sykefraværsprosent * muligeDagsverk) / 100) * kostnadDagsverk;
        } else {
            return nåværendeTapteDagsverk * kostnadDagsverk;
        }*/
    };
    const getØnsketKostnad = () => {
        if (
            kostnadDagsverk &&
            ønsketSykefraværsprosent &&
            muligeDagsverk &&
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            return ((ønsketSykefraværsprosent * muligeDagsverk) / 100) * kostnadDagsverk;
        } else if (
            ønsketTapteDagsverk &&
            kostnadDagsverk &&
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
        ) {
            return ønsketTapteDagsverk * kostnadDagsverk;
        } else {
            return 0;
        }
    };
    const harEndretTapteDagsverk = nåværendeTapteDagsverk !== undefined;
    const harEndretSykefraværsprosent = sykefraværsprosent !== undefined;

    const labelsNåværendeTapteDagsverkEllerProsent =
        antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
            ? 'Nåværende sykefravær (%)'
            : 'Nåværende antall tapte dagsverk siste 12 mnd';
    const labelsØnsketTapteDagsverkEllerProsent =
        antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
            ? 'Ønsket sykefravær (%)'
            : 'Ønsket antall tapte dagsverk siste 12 mnd';

    const setVerdiAntallTapteDagsverkEllerProsent = (verdi: number) => {
        if (
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            setSykefraværsprosent(verdi);
        } else {
            setNåværendeTapteDagsverk(verdi);
        }
        //console.log(getSykefraværsprosentSiste4Kvartaler(restSykefraværshistorikk.data));
    };
    useEffect(() => {
        if (restSykefraværshistorikk.status === RestStatus.IkkeLastet) {
            setNåværendeTapteDagsverk(undefined);
            setMuligeDagsverk(undefined);
            setSykefraværsprosent(undefined);
        }
    }, [restSykefraværshistorikk]);

    useEffect(() => {
        console.log('harendrettapte ' + harEndretTapteDagsverk);
        console.log('harendretsyfoprosent ' + harEndretSykefraværsprosent);
        if (
            restSykefraværshistorikk.status === RestStatus.Suksess &&
            (!harEndretTapteDagsverk || !harEndretSykefraværsprosent)
        ) {
            switch (antallTapteDagsverkEllerProsent) {
                case (AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK, undefined): {
                    console.log(
                        'inne antalltapte i useEffect , harEndret=' + harEndretTapteDagsverk
                    );
                    const tapteDagsverkSiste4Kvartaler = getAntallTapteDagsverkSiste4Kvartaler(
                        restSykefraværshistorikk.data
                    );
                    if (tapteDagsverkSiste4Kvartaler === 'erMaskertEllerHarIkkeNokData') {
                        setNåværendeTapteDagsverk(undefined);
                        setSkalViseDefaultTapteDagsverk(false);
                    } else {
                        setNåværendeTapteDagsverk(tapteDagsverkSiste4Kvartaler);
                        setSkalViseDefaultTapteDagsverk(true);
                    }
                }
                case AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT: {
                    const muligeDagsverkSiste4Kvartaler = getAntallMuligeDagsverkSiste4Kvartaler(
                        restSykefraværshistorikk.data
                    );
                    const prosentTapteDagsverkSiste4Kvartaler = getSykefraværsprosentSiste4Kvartaler(
                        restSykefraværshistorikk.data
                    );
                    if (
                        prosentTapteDagsverkSiste4Kvartaler ===
                            Maskering.ERMASKERTELLERHARIKKENOEDATA ||
                        muligeDagsverkSiste4Kvartaler === Maskering.ERMASKERTELLERHARIKKENOEDATA
                    ) {
                        setSykefraværsprosent(undefined);
                        setSkalViseDefaultTapteDagsverk(false);
                    } else {
                        setSykefraværsprosent(prosentTapteDagsverkSiste4Kvartaler);
                        console.log('syfoprosent: ' + sykefraværsprosent);
                        setMuligeDagsverk(muligeDagsverkSiste4Kvartaler);
                        setSkalViseDefaultTapteDagsverk(true);
                    }
                }
            }
            //console.log(getSykefraværsprosentSiste4Kvartaler(restSykefraværshistorikk.data));
        }
    }, [restSykefraværshistorikk, harEndretTapteDagsverk, antallTapteDagsverkEllerProsent]);

    useEffect(() => {
        scrollToBanner();
    }, []);

    const tapteDagsverkSiste12Mnd = restSykefraværshistorikk.status === RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk &&
        antallTapteDagsverkEllerProsent !== AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT && (
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
                <div className="kalkulator__radiogrouplabel">Beregn kostnad basert på</div>
                <Radio
                    label="Tapte dagsverk"
                    name="antallTapteDagsverk"
                    defaultChecked={true}
                    onChange={() => {
                        setAntalltapteDagsverkEllerProsent(
                            AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
                        );
                        console.log(antallTapteDagsverkEllerProsent);
                    }}
                />
                <Radio
                    label="Sykefraværsprosent"
                    name="antallTapteDagsverk"
                    onChange={() => {
                        setAntalltapteDagsverkEllerProsent(
                            AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                        );
                        console.log(antallTapteDagsverkEllerProsent);
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
                        label={<Element>Kostnad pr. dags pr. ansatt (kr)</Element>}
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
                    <Hjelpetekst>
                        Hvor mye taper virksomheten på at noen er sykemeldt en dag? I 2011 beregnet
                        SINTEF og NHO at hver uke med sykefravær koster en arbeidsgiver i snitt 13
                        000 kr. Det vil si 2600 kr per dag.{' '}
                        <EksternLenke href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                            Les mer om hva som påvirker kostnader ved sykefravær.
                        </EksternLenke>
                    </Hjelpetekst>
                    <Normaltekst>Gjennomsnittlig kostnad per dagsverk: 2600&nbsp;kr</Normaltekst>
                    {/*<LesMerPanel
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
                    </LesMerPanel>*/}

                    <Input
                        label={<Element>{labelsNåværendeTapteDagsverkEllerProsent}</Element>}
                        onChange={event =>
                            setVerdiAntallTapteDagsverkEllerProsent(parseInt(event.target.value))
                        }
                        onClick={() => {
                            amplitude.logEvent(
                                '#sykefravarsstatistikk-kalkulator dagsverk input-klikk'
                            );
                        }}
                        value={
                            antallTapteDagsverkEllerProsent ===
                            AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                ? sykefraværsprosent
                                : nåværendeTapteDagsverk || ''
                        }
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                        className="kalkulator__input"
                    />
                    <Input
                        label={<Element>{labelsØnsketTapteDagsverkEllerProsent}</Element>}
                        onChange={event =>
                            setVerdiAntallTapteDagsverkEllerProsent(parseInt(event.target.value))
                        }
                        onClick={() => {
                            amplitude.logEvent(
                                '#sykefravarsstatistikk-kalkulator dagsverk input-klikk'
                            );
                        }}
                        value={
                            antallTapteDagsverkEllerProsent ===
                            AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                ? sykefraværsprosent
                                : nåværendeTapteDagsverk || ''
                        }
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                        className="kalkulator__input"
                    />
                    {tapteDagsverkSpinner}
                    {tapteDagsverkSiste12Mnd}
                </div>
                <Kostnad nåværendeKostnad={getTotalKostnad()} ønsketKostnad={getØnsketKostnad()} />
            </div>
        </div>
    );
};

export default Kalkulator;
