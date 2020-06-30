import React, { FunctionComponent, useEffect, useState } from 'react';
import './KalkulatorGammel.less';
import Kostnad from './../Kostnad/Kostnad';
import { RestStatus } from '../../api/api-utils';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { scrollToBanner } from '../../utils/scrollUtils';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    AntallTapteDagsverkEllerProsent,
    getAntallTapteDagsverkSiste4Kvartaler,
    getKostnadForAntallDagsverk,
} from '../kalkulator-utils';
import { useSendEvent } from '../../amplitude/amplitude';
import { KalkulatorradGammel } from './KalkulatorradGammel';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorMedDagsverkGammel: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const { restSykefraværshistorikk } = props;
    const [nåværendeTapteDagsverk, setNåværendeTapteDagsverk] = useState<number | undefined>();
    const [ønsketTapteDagsverk, setØnsketTapteDagsverk] = useState<number | undefined>();

    const [erDataMaskert, setErDataMaskert] = useState<boolean | undefined>();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    useEffect(() => {
        scrollToBanner();
    }, []);

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
                setØnsketTapteDagsverk(0);
                setErDataMaskert(true);
            } else {
                setNåværendeTapteDagsverk(tapteDagsverkSiste4Kvartaler);
                setØnsketTapteDagsverk(Math.round(tapteDagsverkSiste4Kvartaler * 0.5));
                setErDataMaskert(false);
            }
        }
    }, [restSykefraværshistorikk, harEndretTapteDagsverk, setErDataMaskert]);

    const nåværendeTapteDagsverkLabel = erDataMaskert
        ? 'Antall tapte dagsverk i løpet av 12 måneder'
        : 'Nåværende antall tapte dagsverk siste 12 måneder';

    const ønsketTapteDagsverkLabel = erDataMaskert
        ? 'Ønsket antall tapte dagsverk i løpet av 12 måneder'
        : 'Ønsket antall tapte dagsverk i en 12 måneders periode';

    const antallTapteDagsverkHjelpetekst = erDataMaskert
        ? 'Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år'
        : 'Et dagsverk er arbeid som utføres på en dag. Antall tapte dagsverk bergenes ut fra det ' +
          'legemeldte sykefraværet de siste 12 månedene og er tilgjengelig i NAVs datagrunnlag.';

    const ønsketTapteDagsverkHjelpetekst = erDataMaskert
        ? 'Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år'
        : 'Et dagsverk er arbeid som utføres på en dag. Antall ønsket tapte dagsverk selv velge for det ønskede ' +
          'legemeldte sykefraværet de siste 12 månedene for å beregne hvor mye du kan spare.';

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

    const sendEventOmEndretInput = () => {
        sendEvent('kalkulator input dagsverk', 'endret');
    };

    return (
        <>
            <div>
                <KalkulatorradGammel
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
                <KalkulatorradGammel
                    onChange={(event) =>
                        validerOgSettNåværendeTapteDagsverk(parseFloat(event.target.value))
                    }
                    onClick={sendEventOmEndretInput}
                    value={nåværendeTapteDagsverk}
                    label={nåværendeTapteDagsverkLabel}
                    visSpinner={restSykefraværshistorikk.status === RestStatus.IkkeLastet}
                    hjelpetekst={antallTapteDagsverkHjelpetekst}
                />
                <KalkulatorradGammel
                    onChange={(event) =>
                        validerOgSettØnsketTapteDagsverk(parseFloat(event.target.value))
                    }
                    onClick={sendEventOmEndretInput}
                    value={ønsketTapteDagsverk}
                    label={ønsketTapteDagsverkLabel}
                    hjelpetekst={ønsketTapteDagsverkHjelpetekst}
                />
            </div>
            <Kostnad
                nåværendeKostnad={getKostnadForAntallDagsverk(
                    kostnadDagsverk,
                    nåværendeTapteDagsverk
                )}
                ønsketKostnad={getKostnadForAntallDagsverk(kostnadDagsverk, ønsketTapteDagsverk)}
                ønsketRedusert={ønsketTapteDagsverk as number}
                antallTapteDagsverkEllerProsent={
                    AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
                }
            />
        </>
    );
};
