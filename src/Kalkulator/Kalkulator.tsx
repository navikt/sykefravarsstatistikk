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
import { useSendEvent } from '../amplitude/amplitude';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const Kalkulator: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
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
            ? 'Nåværende sykefravær i prosent'
            : skalViseDefaultTapteDagsverk
            ? 'Nåværende antall tapte dagsverk siste 12 måneder'
            : 'Antall tapte dagsverk i løpet av 12 måneder';
    const labelsØnsketTapteDagsverkEllerProsent =
        antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
            ? 'Ønsket sykefravær i prosent'
            : skalViseDefaultTapteDagsverk
            ? 'Ønsket antall tapte dagsverk i en 12 måneders periode'
            : 'Ønsket antall tapte dagsverk i løpet av 12 måneder';

    const setVerdiAntallTapteDagsverkEllerProsent = (verdi: number) => {
        if (
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            if (!erVerdiAkseptabeltProsent(verdi)) {
                return;
            }

            try {
                setNåværendeSykefraværsprosent(Number(verdi.toFixed(1)));
            } catch (e) {
                setNåværendeSykefraværsprosent(0);
            }
        } else {
            try {
                setNåværendeTapteDagsverk(Number(verdi.toFixed(0)));
            } catch (e) {
                setNåværendeTapteDagsverk(0);
            }
        }
    };
    const setØnsketVerdiAntallTapteDagsverkEllerProsent = (verdi: number) => {
        if (!erVerdiAkseptabelt(verdi)) {
            return;
        }

        if (
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            if (!erVerdiAkseptabeltProsent(verdi)) {
                return;
            }

            setØnsketSykefraværsprosent(Number(verdi.toFixed(1)));
        } else {
            setØnsketTapteDagsverk(Number(verdi.toFixed(0)));
        }
    };
    const erVerdiAkseptabeltProsent = (verdi: number): boolean => {
        return !(verdi < 0 || verdi > 100);
    };
    const erVerdiAkseptabelt = (verdi: number): boolean => {
        return !(verdi < 0);
    };

    const sendEventOmEndretInput = () => {
        if (
            antallTapteDagsverkEllerProsent === AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
        ) {
            sendEvent('kalkulator input prosent', 'endret');
        } else {
            sendEvent('kalkulator input dagsverk', 'endret');
        }
    };

    function setVerdiMuligeDagsverk(verdi: number) {
        if (!skalViseDefaultTapteDagsverk && erVerdiAkseptabelt(verdi)) {
            setMuligeDagsverk(verdi);
        }
    }

    const antallMuligeDagsverkForMaskerteBedrifeter = (
        <div className="kalkulator__rad">
            <Element className="kalkulator__label_fast_størrelse">
                Antall mulige dagsverk per år
            </Element>
            <Input
                label={''}
                onChange={(event) => setVerdiMuligeDagsverk(parseFloat(event.target.value))}
                onClick={sendEventOmEndretInput}
                value={muligeDagsverk}
                bredde={'XS'}
                maxLength={15}
                type="number"
                placeholder={'0'}
                step="1"
                className="kalkulator__input"
            />
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år
                </Normaltekst>
            </Hjelpetekst>
        </div>
    );
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
                    setNåværendeSykefraværsprosent(0);
                    setØnsketSykefraværsprosent(0);
                    setSkalViseDefaultTapteDagsverk(false);
                } else {
                    setNåværendeSykefraværsprosent(
                        Math.round(prosentTapteDagsverkSiste4Kvartaler * 10) / 10
                    );
                    setØnsketSykefraværsprosent(
                        Math.round(prosentTapteDagsverkSiste4Kvartaler * 5) / 10
                    );
                    setMuligeDagsverk(muligeDagsverkSiste4Kvartaler);
                    setSkalViseDefaultTapteDagsverk(true);
                }
            } else {
                const tapteDagsverkSiste4Kvartaler = getAntallTapteDagsverkSiste4Kvartaler(
                    restSykefraværshistorikk.data
                );
                if (tapteDagsverkSiste4Kvartaler === 'erMaskertEllerHarIkkeNokData') {
                    setNåværendeTapteDagsverk(0);
                    setØnsketTapteDagsverk(0);
                    setSkalViseDefaultTapteDagsverk(false);
                } else {
                    setNåværendeTapteDagsverk(tapteDagsverkSiste4Kvartaler);
                    setØnsketTapteDagsverk(Math.round(tapteDagsverkSiste4Kvartaler * 0.5));
                    setSkalViseDefaultTapteDagsverk(true);
                }
            }
        }
    }, [
        restSykefraværshistorikk,
        harEndretTapteDagsverk,
        antallTapteDagsverkEllerProsent,
        harEndretSykefraværsprosent,
        skalViseDefaultTapteDagsverk,
    ]);

    useEffect(() => {
        scrollToBanner();
    }, []);

    const nåværendeTapteDagsverkSiste12Mnd =
        restSykefraværshistorikk.status === RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk &&
        antallTapteDagsverkEllerProsent !== AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT ? (
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Et dagsverk er arbeid som utføres på en dag. Antall tapte dagsverk bergenes ut
                    fra det legemeldte sykefraværet de siste 12 månedene og er tilgjengelig i NAVs
                    datagrunnlag.
                </Normaltekst>
            </Hjelpetekst>
        ) : skalViseDefaultTapteDagsverk ? (
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Sykefraværsprosenten regnes ut fra antall tapte dagsverk delt på antall mulige
                    dagsverk. Mulige dagsverk de siste 12 månedene er hentet fra det dere har meldt
                    inn i A-ordningen.
                </Normaltekst>
            </Hjelpetekst>
        ) : (
            antallTapteDagsverkEllerProsent !==
                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT && (
                <Hjelpetekst>
                    <Normaltekst className="kalkulator__hjelpetekst-innhold">
                        Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år
                    </Normaltekst>
                </Hjelpetekst>
            )
        );
    const ønsketTapteDagsverkSiste12Mnd =
        restSykefraværshistorikk.status === RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk &&
        antallTapteDagsverkEllerProsent !== AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT ? (
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Et dagsverk er arbeid som utføres på en dag. Antall ønsket tapte dagsverk selv
                    velge for det ønskede legemeldte sykefraværet de siste 12 månedene for å beregne
                    hvor mye du kan spare.
                </Normaltekst>
            </Hjelpetekst>
        ) : skalViseDefaultTapteDagsverk ? (
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Ønsket sykefraværsprosent regnes ut fra ønsket antall tapte dagsverk delt på
                    antall mulige dagsverk dere har hatt de siste 12 månedene. Denne informasjonen
                    hentes fra det dere har meldt inn i A-ordningen.
                </Normaltekst>
            </Hjelpetekst>
        ) : (
            antallTapteDagsverkEllerProsent !==
                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT && (
                <Hjelpetekst>
                    <Normaltekst className="kalkulator__hjelpetekst-innhold">
                        Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år
                    </Normaltekst>
                </Hjelpetekst>
            )
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
                        sendEvent('kalkulator radio basertpadagsverk', 'klikk');
                    }}
                />
                <Radio
                    label="Sykefraværsprosent"
                    name="antallTapteDagsverk"
                    onChange={() => {
                        setAntalltapteDagsverkEllerProsent(
                            AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                        );
                        sendEvent('kalkulator radio basertpaprosent', 'klikk');
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
                            Kostnad per dag per ansatt i kroner
                        </Element>
                        <Input
                            label={''}
                            onChange={(event) => setKostnadDagsverk(parseInt(event.target.value))}
                            onClick={sendEventOmEndretInput}
                            value={kostnadDagsverk || ''}
                            bredde={'XS'}
                            maxLength={15}
                            type="number"
                            className="kalkulator__input"
                            placeholder="kr"
                        />
                        <Hjelpetekst>
                            <Normaltekst className="kalkulator__hjelpetekst-innhold">
                                Hvor mye taper virksomheten på at noen er sykemeldt en dag? I 2011
                                beregnet SINTEF og NHO at hver uke med sykefravær koster en
                                arbeidsgiver i snitt 13 000 kr. Det vil si 2600 kr per dag.{' '}
                                <EksternLenke href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                                    Les mer om hva som påvirker kostnader ved sykefravær.
                                </EksternLenke>
                            </Normaltekst>
                        </Hjelpetekst>
                    </div>
                    {!skalViseDefaultTapteDagsverk &&
                        antallTapteDagsverkEllerProsent ===
                            AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT &&
                        antallMuligeDagsverkForMaskerteBedrifeter}
                    <div className="kalkulator__rad">
                        <Element className="kalkulator__label_fast_størrelse">
                            {labelsNåværendeTapteDagsverkEllerProsent}
                        </Element>
                        <Input
                            label={''}
                            onChange={(event) =>
                                setVerdiAntallTapteDagsverkEllerProsent(
                                    parseFloat(event.target.value)
                                )
                            }
                            onClick={sendEventOmEndretInput}
                            value={
                                antallTapteDagsverkEllerProsent ===
                                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                    ? nåværendeSykefraværsprosent
                                    : nåværendeTapteDagsverk
                            }
                            bredde={'XS'}
                            maxLength={15}
                            type="number"
                            placeholder={'0'}
                            step={
                                antallTapteDagsverkEllerProsent ===
                                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                    ? 0.1
                                    : 1
                            }
                            className="kalkulator__input"
                        />
                        {tapteDagsverkSpinner}
                        {nåværendeTapteDagsverkSiste12Mnd}
                    </div>
                    <div className="kalkulator__rad">
                        <Element className="kalkulator__label_fast_størrelse">
                            {labelsØnsketTapteDagsverkEllerProsent}
                        </Element>
                        <Input
                            label={''}
                            onChange={(event) =>
                                setØnsketVerdiAntallTapteDagsverkEllerProsent(
                                    parseFloat(event.target.value)
                                )
                            }
                            onClick={sendEventOmEndretInput}
                            value={
                                antallTapteDagsverkEllerProsent ===
                                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                    ? ønsketSykefraværsprosent
                                    : ønsketTapteDagsverk
                            }
                            placeholder={'0'}
                            step={
                                antallTapteDagsverkEllerProsent ===
                                AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                                    ? 0.1
                                    : 1
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
                    antallTapteDagsverkEllerProsent={antallTapteDagsverkEllerProsent}
                />
            </div>
        </div>
    );
};

export default Kalkulator;
