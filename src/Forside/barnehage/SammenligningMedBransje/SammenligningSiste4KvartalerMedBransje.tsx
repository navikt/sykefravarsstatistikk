import React, { FunctionComponent } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningSiste4KvartalerMedBransje.less';
import Panel from 'nav-frontend-paneler';
import { Speedometer, SykefraværResultat } from '../Speedometer/Speedometer';
import InternLenke from '../../../felleskomponenter/InternLenke/InternLenke';
import { PATH_HISTORIKK } from '../../../App';
import { HoyreChevron } from 'nav-frontend-chevron';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import {
    RestSykefraværsvarighet,
    SykefraværSiste4Kvartaler,
    Sykefraværsvarighet,
} from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import {
    getResultatForSammenligningAvSykefravær,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../barnehage-utils';
import { nesteOppdatering } from '../../../utils/app-utils';
import Skeleton from 'react-loading-skeleton';
import { Prosent } from '../Prosent';
import { getVurderingstekstTotalt } from '../vurderingstekster';
import { SlikHarViKommetFramTilDittResultat } from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

const addNullable = (number1: number | null, number2: number | null) => {
    if (number1 === null || number2 === null) return null;
    return number1 + number2;
};

const getTotaltSykefraværSiste4Kvartaler = (
    varighet: Sykefraværsvarighet | undefined
): SykefraværSiste4Kvartaler | undefined => {
    if (varighet === undefined) return undefined;
    const korttid = varighet.korttidsfraværSiste4Kvartaler;
    const langtid = varighet.langtidsfraværSiste4Kvartaler;
    return {
        kvartaler: korttid.kvartaler,
        tapteDagsverk: addNullable(korttid.tapteDagsverk, langtid.tapteDagsverk),
        muligeDagsverk: korttid.muligeDagsverk,
        prosent: addNullable(korttid.prosent, langtid.prosent),
        erMaskert: korttid.erMaskert,
    };
};

export const SammenligningSiste4KvartalerMedBransje: FunctionComponent<Props> = ({
    restSykefraværsvarighet,
}) => {
    if (
        restSykefraværsvarighet.status === RestStatus.LasterInn ||
        restSykefraværsvarighet.status === RestStatus.IkkeLastet
    ) {
        return <Skeleton className="sammenligning-med-bransje__loading-skeleton" height={355} />;
    }

    const varighet =
        restSykefraværsvarighet.status === RestStatus.Suksess
            ? restSykefraværsvarighet.data
            : undefined;
    const kvartaler = varighet?.korttidsfraværSiste4Kvartaler.kvartaler.slice().reverse();

    const totaltSykefraværSiste4Kvartaler = getTotaltSykefraværSiste4Kvartaler(varighet);
    const sykefraværVirksomhet = totaltSykefraværSiste4Kvartaler?.prosent;
    const sykefraværBransje = sykefraværForBarnehagerSiste4Kvartaler.totalt;

    const sammenligningResultat = getResultatForSammenligningAvSykefravær(
        restSykefraværsvarighet.status,
        getTotaltSykefraværSiste4Kvartaler(varighet),
        sykefraværBransje
    );

    const antallKvartalerVirksomhet =
        sammenligningResultat === SykefraværResultat.UFULLSTENDIG_DATA ||
        sammenligningResultat === SykefraværResultat.INGEN_DATA ? (
            <>
                <strong> / {kvartaler?.length || 0} av 4 kvartaler</strong>
            </>
        ) : null;

    const antallKvartalerBransje =
        sammenligningResultat === SykefraværResultat.UFULLSTENDIG_DATA ||
        sammenligningResultat === SykefraværResultat.INGEN_DATA ? (
            <>
                <strong> / 4 av 4 kvartaler</strong>
            </>
        ) : null;

    return (
        <div className="sammenligning-med-bransje">
            <Systemtittel className="sammenligning-med-bransje__tittel">
                Legemeldt sykefravær siste 4 kvartal
            </Systemtittel>
            <LesMerPanel
                className="sammenligning-med-bransje__utregningsinfo"
                åpneLabel="Slik har vi kommet fram til ditt resultat"
            >
                <div className="sammenligning-med-bransje__utregningsinfo-innhold">
                    <SlikHarViKommetFramTilDittResultat
                        resultat={sammenligningResultat}
                        kvartaler={kvartaler}
                    />
                </div>
            </LesMerPanel>
            <Panel className="sammenligning-med-bransje__panel">
                <Ingress className="sammenligning-med-bransje__panel-tittel">
                    {getVurderingstekstTotalt(sammenligningResultat)}
                </Ingress>
                <div className="sammenligning-med-bransje__ikon-og-tall">
                    <Speedometer
                        className="sammenligning-med-bransje__ikon"
                        stor
                        resultat={sammenligningResultat}
                    />
                    <div className="sammenligning-med-bransje__tall">
                        <Ingress className="sammenligning-med-bransje__virksomhet-tittel">
                            Din virksomhet:
                        </Ingress>
                        <Systemtittel>
                            <Prosent prosent={sykefraværVirksomhet} />
                            {antallKvartalerVirksomhet}
                        </Systemtittel>
                        <Ingress className="sammenligning-med-bransje__bransje-tittel">
                            Barnehager i Norge:
                        </Ingress>
                        <Systemtittel>
                            <Prosent prosent={sykefraværBransje} />
                            {antallKvartalerBransje}
                        </Systemtittel>
                        <Normaltekst className="sammenligning-med-bransje__neste-oppdatering">
                            Neste oppdatering: {nesteOppdatering}
                        </Normaltekst>
                    </div>
                </div>
                <InternLenke
                    className="sammenligning-med-bransje__historikk-lenke"
                    pathname={PATH_HISTORIKK}
                >
                    Gå til sykefraværshistorikken <HoyreChevron />
                </InternLenke>
            </Panel>
        </div>
    );
};
