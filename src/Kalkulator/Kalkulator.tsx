import React, { FunctionComponent, useEffect, useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Kalkulator.less';
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
    getTotalKostnad,
    getØnsketKostnad,
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
    const [nåværendeSykefraværsprosent, setNåværendeSykefraværsprosent] = useState<
        number | undefined
    >();
    const [ønsketSykefraværsprosent, setØnsketSykefraværsprosent] = useState<number | undefined>();
    const [antallTapteDagsverkEllerProsent, setAntalltapteDagsverkEllerProsent] = useState<
        AntallTapteDagsverkEllerProsent
    >();
    const [skalViseDefaultTapteDagsverk, setSkalViseDefaultTapteDagsverk] = useState<
        boolean | undefined
    >();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    const harEndretTapteDagsverk = nåværendeTapteDagsverk !== undefined;
    const harEndretSykefraværsprosent = nåværendeSykefraværsprosent !== undefined;

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
            setNåværendeSykefraværsprosent(verdi);
        } else {
            setNåværendeTapteDagsverk(verdi);
        }
    };
    const setØnsketVerdiAntallTapteDagsverkEllerProsent = (verdi: number) => {
        if (
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            setØnsketSykefraværsprosent(verdi);
        } else {
            setØnsketTapteDagsverk(verdi);
        }
    };
    useEffect(() => {
        if (restSykefraværshistorikk.status === RestStatus.IkkeLastet) {
            setNåværendeTapteDagsverk(undefined);
            setØnsketTapteDagsverk(undefined);
            setMuligeDagsverk(undefined);
            setNåværendeSykefraværsprosent(undefined);
        }
    }, [restSykefraværshistorikk]);

    useEffect(() => {
        if (
            restSykefraværshistorikk.status === RestStatus.Suksess &&
            (!harEndretTapteDagsverk || !harEndretSykefraværsprosent)
        ) {
            if (
                antallTapteDagsverkEllerProsent ===
                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
            ) {
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
                    setNåværendeSykefraværsprosent(undefined);
                    setSkalViseDefaultTapteDagsverk(false);
                } else {
                    setNåværendeSykefraværsprosent(prosentTapteDagsverkSiste4Kvartaler);
                    setØnsketSykefraværsprosent(prosentTapteDagsverkSiste4Kvartaler * 0.5);
                    setMuligeDagsverk(muligeDagsverkSiste4Kvartaler);
                    setSkalViseDefaultTapteDagsverk(true);
                }
            } else {
                const tapteDagsverkSiste4Kvartaler = getAntallTapteDagsverkSiste4Kvartaler(
                    restSykefraværshistorikk.data
                );
                if (tapteDagsverkSiste4Kvartaler === 'erMaskertEllerHarIkkeNokData') {
                    setNåværendeTapteDagsverk(undefined);
                    setSkalViseDefaultTapteDagsverk(false);
                } else {
                    setNåværendeTapteDagsverk(tapteDagsverkSiste4Kvartaler);
                    setØnsketTapteDagsverk(tapteDagsverkSiste4Kvartaler * 0.5);
                    setSkalViseDefaultTapteDagsverk(true);
                }
            }
        }
    }, [
        restSykefraværshistorikk,
        harEndretTapteDagsverk,
        antallTapteDagsverkEllerProsent,
        harEndretSykefraværsprosent,
    ]);

    useEffect(() => {
        scrollToBanner();
    }, []);

    const nåværendeTapteDagsverkSiste12Mnd = restSykefraværshistorikk.status ===
        RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk &&
        antallTapteDagsverkEllerProsent !== AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT && (
            <>
                <Hjelpetekst>
                    Et dagsverk er arbeid som utføres på en dag. Antall tapte dagsverk bergenes ut
                    fra det legemeldte sykefraværet de siste 12 månedene og er tilgjengelig i NAVs
                    datagrunnlag.
                </Hjelpetekst>
            </>
        );
    const ønsketTapteDagsverkSiste12Mnd = restSykefraværshistorikk.status === RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk &&
        antallTapteDagsverkEllerProsent !== AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT && (
            <>
                <Hjelpetekst>
                    Et dagsverk er arbeid som utføres på en dag. Antall ønsket tapte dagsverk selv
                    velge for det ønskede legemeldte sykefraværet de siste 12 månedene for å beregne
                    hvor mye du kan spare.
                </Hjelpetekst>
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
                    <div className="kalkulator__rad">
                        <Element className="kalkulator__label_fast_størrelse">
                            Kostnad pr. dags pr. ansatt (kr)
                        </Element>
                        <Input
                            label={''}
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
                            Hvor mye taper virksomheten på at noen er sykemeldt en dag? I 2011
                            beregnet SINTEF og NHO at hver uke med sykefravær koster en arbeidsgiver
                            i snitt 13 000 kr. Det vil si 2600 kr per dag.{' '}
                            <EksternLenke href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                                Les mer om hva som påvirker kostnader ved sykefravær.
                            </EksternLenke>
                        </Hjelpetekst>
                    </div>

                    <div className="kalkulator__rad">
                        <Element className="kalkulator__label_fast_størrelse">
                            {labelsNåværendeTapteDagsverkEllerProsent}
                        </Element>
                        <Input
                            label={''}
                            onChange={event =>
                                setVerdiAntallTapteDagsverkEllerProsent(
                                    parseFloat(event.target.value)
                                )
                            }
                            onClick={() => {
                                amplitude.logEvent(
                                    '#sykefravarsstatistikk-kalkulator dagsverk input-klikk'
                                );
                            }}
                            value={
                                antallTapteDagsverkEllerProsent ===
                                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                    ? nåværendeSykefraværsprosent
                                    : nåværendeTapteDagsverk || ''
                            }
                            bredde={'XS'}
                            maxLength={15}
                            type="number"
                            className="kalkulator__input"
                        />{' '}
                        {tapteDagsverkSpinner}
                        {nåværendeTapteDagsverkSiste12Mnd}
                    </div>
                    <div className="kalkulator__rad">
                        <Element className="kalkulator__label_fast_størrelse">
                            {labelsØnsketTapteDagsverkEllerProsent}
                        </Element>
                        <Input
                            label={''}
                            onChange={event =>
                                setØnsketVerdiAntallTapteDagsverkEllerProsent(
                                    parseFloat(event.target.value)
                                )
                            }
                            onClick={() => {
                                amplitude.logEvent(
                                    '#sykefravarsstatistikk-kalkulator dagsverk input-klikk'
                                );
                            }}
                            value={
                                antallTapteDagsverkEllerProsent ===
                                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                    ? ønsketSykefraværsprosent
                                    : ønsketTapteDagsverk || ''
                            }
                            bredde={'XS'}
                            maxLength={15}
                            type="number"
                            className="kalkulator__input"
                        />
                        {ønsketTapteDagsverkSiste12Mnd}
                    </div>
                </div>
                <Kostnad
                    nåværendeKostnad={getTotalKostnad(
                        kostnadDagsverk,
                        nåværendeSykefraværsprosent,
                        muligeDagsverk,
                        nåværendeTapteDagsverk,
                        antallTapteDagsverkEllerProsent
                    )}
                    ønsketKostnad={getØnsketKostnad(
                        kostnadDagsverk,
                        ønsketSykefraværsprosent,
                        muligeDagsverk,
                        ønsketTapteDagsverk,
                        antallTapteDagsverkEllerProsent
                    )}
                    ønsketRedusert={
                        antallTapteDagsverkEllerProsent ===
                        AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                            ? (ønsketSykefraværsprosent as number)
                            : (ønsketTapteDagsverk as number)
                    }
                />
            </div>
        </div>
    );
};

export default Kalkulator;
