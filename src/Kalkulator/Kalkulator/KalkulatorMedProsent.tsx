import React, { FunctionComponent, useEffect, useState } from 'react';
import './Kalkulator.less';
import Kostnad from './../Kostnad/Kostnad';
import { RestStatus } from '../../api/api-utils';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    Kalkulatorvariant,
    getAntallMuligeDagsverkSiste4Kvartaler,
    getKostnadForSykefraværsprosent,
    getSykefraværsprosentSiste4Kvartaler,
    Maskering,
    rundAvTilEnDesimal,
} from './../kalkulator-utils';
import { useSendEvent } from '../../amplitude/amplitude';
import { Kalkulatorrad } from './Kalkulatorrad/Kalkulatorrad';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorMedProsent: FunctionComponent<Props> = ({ restSykefraværshistorikk }) => {
    const sendEvent = useSendEvent();
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
                    rundAvTilEnDesimal(prosentTapteDagsverkSiste4Kvartaler)
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
            ? 'Når vi beregner mål for sykefraværet benytter vi samme antall mulige dagsverk som når vi beregner nåværende sykefraværsprosent.'
            : undefined;

    return (
        <>
            <div>
                <Kalkulatorrad
                    onChange={(event) => {
                        sendEvent('kalkulator prosent kostnad', 'endret');
                        setKostnadDagsverk(parseInt(event.target.value));
                    }}
                    value={kostnadDagsverk}
                    label="Kostnad per dag per ansatt i kroner"
                    placeholder="kr"
                    name="kostnad-per-dagsverk-prosent"
                    hjelpetekst={
                        <>
                            SINTEF har beregnet at en dags sykefravær gjennomsnittlig koster 2600
                            kroner. Beløpet uttrykker produksjonstap og økte kostnader. Lønn og
                            refusjoner knyttet til sykefravær er ikke en del av beregnet kostnad.{' '}
                            <EksternLenke href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                                Les mer om hva som påvirker kostnader ved sykefravær.
                            </EksternLenke>
                        </>
                    }
                />
                {erDataMaskert && (
                    <Kalkulatorrad
                        label="Antall mulige dagsverk per år"
                        onChange={(event) => {
                            sendEvent('kalkulator prosent mulige dagsverk', 'endret');
                            validerOgSettMuligeDagsverk(parseFloat(event.target.value));
                        }}
                        value={muligeDagsverk}
                        name="mulige-dagsverk-prosent"
                        hjelpetekst="En ansatt som jobber full stilling i 12 måneder, utgjør 230 dagsverk."
                    />
                )}
                <Kalkulatorrad
                    onChange={(event) => {
                        sendEvent('kalkulator prosent nåværende', 'endret');
                        validerOgSettNåværendeSykefraværsprosent(parseFloat(event.target.value));
                    }}
                    value={nåværendeSykefraværsprosent}
                    label="Sykefravær i prosent de siste 12 månedene"
                    step={0.1}
                    visSpinner={restSykefraværshistorikk.status === RestStatus.IkkeLastet}
                    name="nåværende-prosent"
                    hjelpetekst={nåværendeTapteDagsverkSiste12MndHjelpetekst}
                />
                <Kalkulatorrad
                    onChange={(event) => {
                        sendEvent('kalkulator prosent mål', 'endret');
                        validerOgSettØnsketSykefraværsprosent(parseFloat(event.target.value));
                    }}
                    value={ønsketSykefraværsprosent}
                    label="Mål for sykefraværet i prosent"
                    step={0.1}
                    name="ønsket-prosent"
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
                antallTapteDagsverkEllerProsent={Kalkulatorvariant.Prosent}
            />
        </>
    );
};
