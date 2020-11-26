import React, { FunctionComponent, useEffect, useState } from 'react';
import './Kalkulator.less';
import Kostnad from './../Kostnad/Kostnad';
import { RestStatus } from '../../api/api-utils';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { RestSykefraværshistorikk } from '../../api/kvartalsvisSykefraværshistorikk';
import {
    Kalkulatorvariant,
    getAntallTapteDagsverkSiste4Kvartaler,
    getKostnadForAntallDagsverk,
} from './../kalkulator-utils';
import { useSendEvent } from '../../amplitude/amplitude';
import { Kalkulatorrad } from './Kalkulatorrad/Kalkulatorrad';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorMedDagsverk: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const { restSykefraværshistorikk } = props;
    const [nåværendeTapteDagsverk, setNåværendeTapteDagsverk] = useState<number | undefined>();
    const [ønsketTapteDagsverk, setØnsketTapteDagsverk] = useState<number | undefined>();

    const [erDataMaskert, setErDataMaskert] = useState<boolean | undefined>();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    useEffect(() => {
        if (restSykefraværshistorikk.status === RestStatus.IkkeLastet) {
            setNåværendeTapteDagsverk(undefined);
            setØnsketTapteDagsverk(undefined);
        }
    }, [restSykefraværshistorikk]);

    const harEndretTapteDagsverk = nåværendeTapteDagsverk !== undefined;

    useEffect(() => {
        if (restSykefraværshistorikk.status === RestStatus.Suksess && !harEndretTapteDagsverk) {
            const tapteDagsverkSiste4Kvartaler = getAntallTapteDagsverkSiste4Kvartaler(
                restSykefraværshistorikk.data
            );
            if (tapteDagsverkSiste4Kvartaler === 'erMaskertEllerHarIkkeNokData') {
                setNåværendeTapteDagsverk(0);
                setErDataMaskert(true);
            } else {
                setNåværendeTapteDagsverk(tapteDagsverkSiste4Kvartaler);
                setErDataMaskert(false);
            }
        }
    }, [restSykefraværshistorikk, harEndretTapteDagsverk, setErDataMaskert]);

    const antallTapteDagsverkHjelpetekst = erDataMaskert
        ? 'Et dagsverk er arbeid som utføres på en dag. ' +
          'Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år.'
        : 'NAV har legemeldt fravær tilgjengelig i sitt datagrunnlag. Vi ser på de siste 12 månedene ' +
          'og beregner hvor mange dagsverk som er tapt. Et dagsverk er arbeid som utføres på en dag.';

    const validerTapteDagsverk = (tapteDagsverk: number): boolean => {
        return !(tapteDagsverk < 0);
    };

    const validerOgSettNåværendeTapteDagsverk = (tapteDagsverk: number) => {
        try {
            setNåværendeTapteDagsverk(Number(tapteDagsverk.toFixed(0)));
        } catch (e) {
            setNåværendeTapteDagsverk(0);
        }
    };
    const validerOgSettØnsketTapteDagsverk = (tapteDagsverk: number) => {
        if (!validerTapteDagsverk(tapteDagsverk)) {
            return;
        }
        setØnsketTapteDagsverk(Number(tapteDagsverk.toFixed(0)));
    };

    return (
        <>
            <div>
                <Kalkulatorrad
                    onChange={(event) => {
                        sendEvent('kalkulator dagsverk kostnad', 'endret');
                        setKostnadDagsverk(parseInt(event.target.value));
                    }}
                    value={kostnadDagsverk}
                    label="Kostnad per dag per ansatt i kroner"
                    placeholder="kr"
                    name="kostnad-per-dagsverk"
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
                <Kalkulatorrad
                    onChange={(event) => {
                        sendEvent('kalkulator dagsverk nåværende', 'endret');
                        validerOgSettNåværendeTapteDagsverk(parseFloat(event.target.value));
                    }}
                    value={nåværendeTapteDagsverk}
                    label="Antall tapte dagsverk siste 12 måneder"
                    visSpinner={restSykefraværshistorikk.status === RestStatus.IkkeLastet}
                    name="nåværende-tapte-dagsverk"
                    hjelpetekst={antallTapteDagsverkHjelpetekst}
                />
                <Kalkulatorrad
                    onChange={(event) => {
                        sendEvent('kalkulator dagsverk mål', 'endret');
                        validerOgSettØnsketTapteDagsverk(parseFloat(event.target.value));
                    }}
                    value={ønsketTapteDagsverk}
                    label="Mål for sykefraværet i antall tapte dagsverk over 12 måneder"
                    name="ønsket-tapte-dagsverk"
                    hjelpetekst="Skriv inn mål for sykefraværet i antall tapte dagsverk i en periode på 12 måneder, for å beregne hvor mye du kan spare."
                />
            </div>
            <Kostnad
                nåværendeKostnad={getKostnadForAntallDagsverk(
                    kostnadDagsverk,
                    nåværendeTapteDagsverk
                )}
                ønsketKostnad={getKostnadForAntallDagsverk(kostnadDagsverk, ønsketTapteDagsverk)}
                ønsketRedusert={ønsketTapteDagsverk as number}
                antallTapteDagsverkEllerProsent={Kalkulatorvariant.Dagsverk}
            />
        </>
    );
};
