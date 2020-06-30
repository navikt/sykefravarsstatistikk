import React, { FunctionComponent, useEffect, useState } from 'react';
import './KalkulatorNy.less';
import Kostnad from './../Kostnad/Kostnad';
import { RestStatus } from '../../api/api-utils';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    AntallTapteDagsverkEllerProsent,
    getAntallMuligeDagsverkSiste4Kvartaler,
    getKostnadForSykefraværsprosent,
    getSykefraværsprosentSiste4Kvartaler,
    Maskering,
} from './../kalkulator-utils';
import { useSendEvent } from '../../amplitude/amplitude';
import { KalkulatorradNy } from './Kalkulatorrad/KalkulatorradNy';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorMedProsentNy: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const { restSykefraværshistorikk } = props;
    const [muligeDagsverk, setMuligeDagsverk] = useState<number | undefined>();
    const [nåværendeSykefraværsprosent, setNåværendeSykefraværsprosent] = useState<
        number | undefined
    >();
    const [ønsketSykefraværsprosent, setØnsketSykefraværsprosent] = useState<number | undefined>();

    const [erDataMaskert, setErDataMaskert] = useState<boolean | undefined>();
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

    const validerOgSettMuligeDagsverk = (muligeDagsverk: number) => {
        if (erDataMaskert && validerTapteDagsverk(muligeDagsverk)) {
            setMuligeDagsverk(muligeDagsverk);
        }
    };

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
                prosentTapteDagsverkSiste4Kvartaler === Maskering.ErMaskertEllerHarIkkeNokData ||
                muligeDagsverkSiste4Kvartaler === Maskering.ErMaskertEllerHarIkkeNokData
            ) {
                setNåværendeSykefraværsprosent(0);
                setErDataMaskert(true);
            } else {
                setNåværendeSykefraværsprosent(
                    Math.round(prosentTapteDagsverkSiste4Kvartaler * 10) / 10
                );
                setMuligeDagsverk(muligeDagsverkSiste4Kvartaler);
                setErDataMaskert(false);
            }
        }
    }, [restSykefraværshistorikk, harEndretSykefraværsprosent, setErDataMaskert]);

    const nåværendeTapteDagsverkSiste12MndHjelpetekst =
        restSykefraværshistorikk.status === RestStatus.Suksess && !erDataMaskert
            ? 'Sykefraværsprosenten regnes ut fra antall tapte dagsverk delt på antall mulige dagsverk. ' +
              'Mulige dagsverk de siste 12 månedene er hentet fra det dere har meldt inn i A-ordningen.'
            : undefined;

    const ønsketTapteDagsverkSiste12MndHjelpetekst =
        restSykefraværshistorikk.status === RestStatus.Suksess && !erDataMaskert
            ? 'Ønsket sykefraværsprosent regnes ut fra ønsket antall tapte dagsverk delt på antall mulige ' +
              'dagsverk dere har hatt de siste 12 månedene. Denne informasjonen hentes fra det dere har meldt inn i A-ordningen.'
            : undefined;

    return (
        <>
            <div>
                <KalkulatorradNy
                    onChange={(event) => setKostnadDagsverk(parseInt(event.target.value))}
                    onClick={sendEventOmEndretInput}
                    value={kostnadDagsverk}
                    label="Kostnad per dag per ansatt i kroner"
                    placeholder="kr"
                    hjelpetekst={
                        <>
                            Hvor mye taper virksomheten på at noen er sykemeldt en dag? I 2011
                            beregnet SINTEF og NHO at hver uke med sykefravær koster en arbeidsgiver
                            i snitt 13 000 kr. Det vil si 2600 kr per dag.{' '}
                            <EksternLenke href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                                Les mer om hva som påvirker kostnader ved sykefravær.
                            </EksternLenke>
                        </>
                    }
                />
                {erDataMaskert && (
                    <KalkulatorradNy
                        label="Antall mulige dagsverk per år"
                        onChange={(event) =>
                            validerOgSettMuligeDagsverk(parseFloat(event.target.value))
                        }
                        onClick={sendEventOmEndretInput}
                        value={muligeDagsverk}
                        hjelpetekst="Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år"
                    />
                )}
                <KalkulatorradNy
                    onChange={(event) =>
                        validerOgSettNåværendeSykefraværsprosent(parseFloat(event.target.value))
                    }
                    onClick={sendEventOmEndretInput}
                    value={nåværendeSykefraværsprosent}
                    label="Nåværende sykefravær i prosent"
                    step={0.1}
                    visSpinner={restSykefraværshistorikk.status === RestStatus.IkkeLastet}
                    hjelpetekst={nåværendeTapteDagsverkSiste12MndHjelpetekst}
                />
                <KalkulatorradNy
                    onChange={(event) =>
                        validerOgSettØnsketSykefraværsprosent(parseFloat(event.target.value))
                    }
                    onClick={sendEventOmEndretInput}
                    value={ønsketSykefraværsprosent}
                    label="Ønsket sykefravær i prosent"
                    step={0.1}
                    hjelpetekst={ønsketTapteDagsverkSiste12MndHjelpetekst}
                />
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
                antallTapteDagsverkEllerProsent={AntallTapteDagsverkEllerProsent.Sykefraværsprosent}
            />
        </>
    );
};
