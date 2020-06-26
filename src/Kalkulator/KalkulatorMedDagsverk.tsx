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
    getKostnadForAntallDagsverk,
} from './kalkulator-utils';
import { useSendEvent } from '../amplitude/amplitude';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Kalkulatorrad } from './Kalkulatorrad';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

export const KalkulatorMedDagsverk: FunctionComponent<Props> = (props) => {
    const sendEvent = useSendEvent();
    const { restSykefraværshistorikk } = props;
    const [nåværendeTapteDagsverk, setNåværendeTapteDagsverk] = useState<number | undefined>();
    const [ønsketTapteDagsverk, setØnsketTapteDagsverk] = useState<number | undefined>();

    const [skalViseDefaultTapteDagsverk, setSkalViseDefaultTapteDagsverk] = useState<
        boolean | undefined
    >();
    const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(2600);

    useEffect(() => {
        scrollToBanner();
    }, []);

    const harEndretTapteDagsverk = nåværendeTapteDagsverk !== undefined;

    const nåværendeTapteDagsverkLabel = skalViseDefaultTapteDagsverk
        ? 'Nåværende antall tapte dagsverk siste 12 måneder'
        : 'Antall tapte dagsverk i løpet av 12 måneder';
    const ønsketTapteDagsverkLabel = skalViseDefaultTapteDagsverk
        ? 'Ønsket antall tapte dagsverk i en 12 måneders periode'
        : 'Ønsket antall tapte dagsverk i løpet av 12 måneder';

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
    useEffect(() => {
        if (restSykefraværshistorikk.status === RestStatus.IkkeLastet) {
            setNåværendeTapteDagsverk(undefined);
            setØnsketTapteDagsverk(undefined);
        }
    }, [restSykefraværshistorikk]);

    useEffect(() => {
        if (restSykefraværshistorikk.status === RestStatus.Suksess && !harEndretTapteDagsverk) {
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
    }, [restSykefraværshistorikk, harEndretTapteDagsverk, skalViseDefaultTapteDagsverk]);

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
                <Kalkulatorrad
                    onChange={(event) => setKostnadDagsverk(parseInt(event.target.value))}
                    onClick={sendEventOmEndretInput}
                    value={kostnadDagsverk}
                />
                <div className="kalkulator__rad">
                    <Element className="kalkulator__label_fast_størrelse">
                        {nåværendeTapteDagsverkLabel}
                    </Element>
                    <Input
                        label={''}
                        onChange={(event) =>
                            validerOgSettNåværendeTapteDagsverk(parseFloat(event.target.value))
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
                        {ønsketTapteDagsverkLabel}
                    </Element>
                    <Input
                        label={''}
                        onChange={(event) =>
                            validerOgSettØnsketTapteDagsverk(parseFloat(event.target.value))
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
