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
    getAntallTapteDagsverkSiste4Kvartaler,
    getTotalKostnad,
    getØnsketKostnad,
} from './kalkulator-utils';
import { useSendEvent } from '../amplitude/amplitude';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorMedDagsverk: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const { restSykefraværshistorikk } = props;
    const [nåværendeTapteDagsverk, setNåværendeTapteDagsverk] = useState<number | undefined>();
    const [ønsketTapteDagsverk, setØnsketTapteDagsverk] = useState<number | undefined>();
    const [muligeDagsverk, setMuligeDagsverk] = useState<number | undefined>();
    const [nåværendeSykefraværsprosent, setNåværendeSykefraværsprosent] = useState<
        number | undefined
    >();
    const [ønsketSykefraværsprosent, setØnsketSykefraværsprosent] = useState<number | undefined>();

    const [skalViseDefaultTapteDagsverk, setSkalViseDefaultTapteDagsverk] = useState<
        boolean | undefined
    >();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    const harEndretTapteDagsverk = nåværendeTapteDagsverk !== undefined;
    const harEndretSykefraværsprosent = nåværendeSykefraværsprosent !== undefined;

    const labelsNåværendeTapteDagsverkEllerProsent = skalViseDefaultTapteDagsverk
        ? 'Nåværende antall tapte dagsverk siste 12 måneder'
        : 'Antall tapte dagsverk i løpet av 12 måneder';
    const labelsØnsketTapteDagsverkEllerProsent = skalViseDefaultTapteDagsverk
        ? 'Ønsket antall tapte dagsverk i en 12 måneders periode'
        : 'Ønsket antall tapte dagsverk i løpet av 12 måneder';

    const setVerdiAntallTapteDagsverkEllerProsent = (verdi: number) => {
        try {
            setNåværendeTapteDagsverk(Number(verdi.toFixed(0)));
        } catch (e) {
            setNåværendeTapteDagsverk(0);
        }
    };
    const setØnsketVerdiAntallTapteDagsverkEllerProsent = (verdi: number) => {
        if (!erVerdiAkseptabelt(verdi)) {
            return;
        }

        setØnsketTapteDagsverk(Number(verdi.toFixed(0)));
    };

    const erVerdiAkseptabelt = (verdi: number): boolean => {
        return !(verdi < 0);
    };

    const sendEventOmEndretInput = () => {
        sendEvent('kalkulator input dagsverk', 'endret');
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
    }, [
        restSykefraværshistorikk,
        harEndretTapteDagsverk,
        harEndretSykefraværsprosent,
        skalViseDefaultTapteDagsverk,
    ]);

    useEffect(() => {
        scrollToBanner();
    }, []);

    const nåværendeTapteDagsverkSiste12Mnd = restSykefraværshistorikk.status ===
        RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk && (
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Et dagsverk er arbeid som utføres på en dag. Antall tapte dagsverk bergenes ut
                    fra det legemeldte sykefraværet de siste 12 månedene og er tilgjengelig i NAVs
                    datagrunnlag.
                </Normaltekst>
            </Hjelpetekst>
        );

    const ønsketTapteDagsverkSiste12Mnd = restSykefraværshistorikk.status === RestStatus.Suksess &&
        skalViseDefaultTapteDagsverk && (
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Et dagsverk er arbeid som utføres på en dag. Antall ønsket tapte dagsverk selv
                    velge for det ønskede legemeldte sykefraværet de siste 12 månedene for å beregne
                    hvor mye du kan spare.
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
                <div className="kalkulator__rad">
                    <Element className="kalkulator__label_fast_størrelse">
                        {labelsNåværendeTapteDagsverkEllerProsent}
                    </Element>
                    <Input
                        label={''}
                        onChange={(event) =>
                            setVerdiAntallTapteDagsverkEllerProsent(parseFloat(event.target.value))
                        }
                        onClick={sendEventOmEndretInput}
                        value={nåværendeTapteDagsverk}
                        bredde={'XS'}
                        maxLength={15}
                        type="number"
                        placeholder={'0'}
                        step={1}
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
                        value={ønsketTapteDagsverk}
                        placeholder={'0'}
                        step={1}
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
                    AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
                )}
                ønsketKostnad={getØnsketKostnad(
                    kostnadDagsverk,
                    ønsketSykefraværsprosent,
                    muligeDagsverk,
                    ønsketTapteDagsverk,
                    AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
                )}
                ønsketRedusert={ønsketTapteDagsverk as number}
                antallTapteDagsverkEllerProsent={
                    AntallTapteDagsverkEllerProsent.ANTALLTAPTEDAGSVERK
                }
            />
        </>
    );
};
