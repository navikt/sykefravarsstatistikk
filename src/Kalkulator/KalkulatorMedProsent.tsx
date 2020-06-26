import React, { FunctionComponent, useEffect, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './Kalkulator.less';
import { Input } from 'nav-frontend-skjema';
import Kostnad from './Kostnad/Kostnad';
import { RestStatus } from '../api/api-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import EksternLenke from '../felleskomponenter/EksternLenke/EksternLenke';
import { scrollToBanner } from '../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import {
    AntallTapteDagsverkEllerProsent,
    getAntallMuligeDagsverkSiste4Kvartaler,
    getKostnadForSykefraværsprosent,
    getSykefraværsprosentSiste4Kvartaler,
    Maskering,
} from './kalkulator-utils';
import { useSendEvent } from '../amplitude/amplitude';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorMedProsent: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const { restSykefraværshistorikk } = props;
    const [muligeDagsverk, setMuligeDagsverk] = useState<number | undefined>();
    const [nåværendeSykefraværsprosent, setNåværendeSykefraværsprosent] = useState<
        number | undefined
    >();
    const [ønsketSykefraværsprosent, setØnsketSykefraværsprosent] = useState<number | undefined>();

    const [skalViseDefaultTapteDagsverk, setSkalViseDefaultTapteDagsverk] = useState<
        boolean | undefined
    >();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    const harEndretSykefraværsprosent = nåværendeSykefraværsprosent !== undefined;

    const validerOgSettNåværendeSykefraværsprosent = (verdi: number) => {
        if (!validerSykefraværsprosent(verdi)) {
            return;
        }
        try {
            setNåværendeSykefraværsprosent(Number(verdi.toFixed(1)));
        } catch (e) {
            setNåværendeSykefraværsprosent(0);
        }
    };
    const validerOgSettØnsketSykefraværsprosent = (verdi: number) => {
        if (!validerSykefraværsprosent(verdi)) {
            return;
        }
        setØnsketSykefraværsprosent(Number(verdi.toFixed(1)));
    };
    const validerSykefraværsprosent = (prosent: number): boolean => {
        return !(prosent < 0 || prosent > 100);
    };
    const validerTapteDagsverk = (tapteDagsverk: number): boolean => {
        return !(tapteDagsverk < 0);
    };


    const sendEventOmEndretInput = () => {
        sendEvent('kalkulator input prosent', 'endret');
    };

    function setVerdiMuligeDagsverk(verdi: number) {
        if (!skalViseDefaultTapteDagsverk && validerTapteDagsverk(verdi)) {
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
            setMuligeDagsverk(undefined);
            setNåværendeSykefraværsprosent(undefined);
        }
    }, [restSykefraværshistorikk]);

    useEffect(() => {
        if (
            restSykefraværshistorikk.status === RestStatus.Suksess &&
            !harEndretSykefraværsprosent
        ) {
            const muligeDagsverkSiste4Kvartaler = getAntallMuligeDagsverkSiste4Kvartaler(
                restSykefraværshistorikk.data
            );
            const prosentTapteDagsverkSiste4Kvartaler = getSykefraværsprosentSiste4Kvartaler(
                restSykefraværshistorikk.data
            );
            if (
                prosentTapteDagsverkSiste4Kvartaler === Maskering.ERMASKERTELLERHARIKKENOEDATA ||
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
        }
    }, [restSykefraværshistorikk, harEndretSykefraværsprosent, skalViseDefaultTapteDagsverk]);

    useEffect(() => {
        scrollToBanner();
    }, []);

    const nåværendeTapteDagsverkSiste12Mnd = restSykefraværshistorikk.status ===
        RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk && (
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Sykefraværsprosenten regnes ut fra antall tapte dagsverk delt på antall mulige
                    dagsverk. Mulige dagsverk de siste 12 månedene er hentet fra det dere har meldt
                    inn i A-ordningen.
                </Normaltekst>
            </Hjelpetekst>
        );
    const ønsketTapteDagsverkSiste12Mnd = restSykefraværshistorikk.status === RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk && (
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Ønsket sykefraværsprosent regnes ut fra ønsket antall tapte dagsverk delt på
                    antall mulige dagsverk dere har hatt de siste 12 månedene. Denne informasjonen
                    hentes fra det dere har meldt inn i A-ordningen.
                </Normaltekst>
            </Hjelpetekst>
        );

    const tapteDagsverkSpinner = restSykefraværshistorikk.status === RestStatus.IkkeLastet && (
        <NavFrontendSpinner className="kalkulator__spinner" transparent={true} />
    );

    return (
        <>
            <div>
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
                            beregnet SINTEF og NHO at hver uke med sykefravær koster en arbeidsgiver
                            i snitt 13 000 kr. Det vil si 2600 kr per dag.{' '}
                            <EksternLenke href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                                Les mer om hva som påvirker kostnader ved sykefravær.
                            </EksternLenke>
                        </Normaltekst>
                    </Hjelpetekst>
                </div>
                {!skalViseDefaultTapteDagsverk && antallMuligeDagsverkForMaskerteBedrifeter}
                <div className="kalkulator__rad">
                    <Element className="kalkulator__label_fast_størrelse">
                        Nåværende sykefravær i prosent
                    </Element>
                    <Input
                        label={''}
                        onChange={(event) =>
                            validerOgSettNåværendeSykefraværsprosent(parseFloat(event.target.value))
                        }
                        onClick={sendEventOmEndretInput}
                        value={nåværendeSykefraværsprosent}
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                        placeholder={'0'}
                        step={0.1}
                        className="kalkulator__input"
                    />
                    {tapteDagsverkSpinner}
                    {nåværendeTapteDagsverkSiste12Mnd}
                </div>
                <div className="kalkulator__rad">
                    <Element className="kalkulator__label_fast_størrelse">
                        Ønsket sykefravær i prosent
                    </Element>
                    <Input
                        label={''}
                        onChange={(event) =>
                            validerOgSettØnsketSykefraværsprosent(
                                parseFloat(event.target.value)
                            )
                        }
                        onClick={sendEventOmEndretInput}
                        value={ønsketSykefraværsprosent}
                        placeholder={'0'}
                        step={0.1}
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                        className="kalkulator__input"
                    />
                    {ønsketTapteDagsverkSiste12Mnd}
                </div>
            </div>
            <Kostnad
                nåværendeKostnad={getKostnadForSykefraværsprosent(
                    kostnadDagsverk,
                    nåværendeSykefraværsprosent,
                    muligeDagsverk
                )}
                ønsketKostnad={getKostnadForSykefraværsprosent(
                    kostnadDagsverk,
                    ønsketSykefraværsprosent,
                    muligeDagsverk
                )}
                ønsketRedusert={ønsketSykefraværsprosent as number}
                antallTapteDagsverkEllerProsent={AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT}
            />
        </>
    );
};
