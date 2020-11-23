import React, {FunctionComponent} from 'react';
import {RestSummertSykefraværshistorikk, Statistikkategori} from '../../../api/sykefraværsvarighet';
import {EkspanderbartSammenligningspanel} from '../SammenligningMedBransje/EkspanderbartSammenligningspanel';
import {RestStatus} from '../../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import {
    getResultatForSammenligningAvSykefravær,
    getSykefraværsvarighet,
    getTotaltSykefraværSiste4Kvartaler,
} from '../barnehage-utils';
import {SykefraværResultat} from '../Speedometer/Speedometer';
import {SammenligningsType} from '../vurderingstekster';
import {SammenligningIngress} from '../SammenligningIngress/SammenligningIngress';
import {SlikHarViKommetFramTilDittResultat} from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import {useSendEvent} from '../../../amplitude/amplitude';
import './EkspanderbarSammenligning.less';

interface Props {
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk;
    visTips: boolean;
}

export const EkspanderbarSammenligning: FunctionComponent<Props> = ({
    restSummertSykefraværshistorikk,
    visTips,
}) => {
    const sendEvent = useSendEvent();

    if (
        restSummertSykefraværshistorikk.status === RestStatus.IngenTilgang ||
        restSummertSykefraværshistorikk.status === RestStatus.IkkeInnlogget
    ) {
        return null;
    }

    if (
        restSummertSykefraværshistorikk.status === RestStatus.LasterInn ||
        restSummertSykefraværshistorikk.status === RestStatus.IkkeLastet
    ) {
        return (
            <Skeleton
                className="ekspanderbart-sammenligningspanel__loading-skeleton"
                height={355}
            />
        );
    }

    const varighet =
        restSummertSykefraværshistorikk.status === RestStatus.Suksess
            ? getSykefraværsvarighet(restSummertSykefraværshistorikk.data, Statistikkategori.VIRKSOMHET)
            : undefined;
    const kvartaler = varighet?.summertKorttidsfravær.kvartaler.slice().reverse();

    const varighetBransjeEllerNæring =
        restSummertSykefraværshistorikk.status === RestStatus.Suksess
            ? getSykefraværsvarighet(
            restSummertSykefraværshistorikk.data,
            Statistikkategori.BRANSJE, Statistikkategori.NÆRING
            )
            : undefined;

    const totaltSykefraværForBarnehagerSiste4Kvartaler = getTotaltSykefraværSiste4Kvartaler(varighetBransjeEllerNæring)?.prosent;
    const korttidssykefraværForBarnehagerSiste4Kvartaler = varighetBransjeEllerNæring?.summertKorttidsfravær.prosent;
    const langtidssykefraværForBarnehagerSiste4Kvartaler = varighetBransjeEllerNæring?.summertLangtidsfravær.prosent;

    const sammenligningResultat = getResultatForSammenligningAvSykefravær(
        restSummertSykefraværshistorikk.status,
        getTotaltSykefraværSiste4Kvartaler(varighet),
        totaltSykefraværForBarnehagerSiste4Kvartaler
    );
    const sammenligningResultatKorttid = getResultatForSammenligningAvSykefravær(
        restSummertSykefraværshistorikk.status,
        varighet?.summertKorttidsfravær,
        korttidssykefraværForBarnehagerSiste4Kvartaler
    );
    const sammenligningResultatLangtid = getResultatForSammenligningAvSykefravær(
        restSummertSykefraværshistorikk.status,
        varighet?.summertLangtidsfravær,
        langtidssykefraværForBarnehagerSiste4Kvartaler
    );

    const antallKvartalerVirksomhet =
        sammenligningResultat === SykefraværResultat.UFULLSTENDIG_DATA ||
        sammenligningResultat === SykefraværResultat.INGEN_DATA ? (
            <>
                <strong> {kvartaler?.length || 0} av 4 kvartaler</strong>
            </>
        ) : null;

    const antallKvartalerBransje =
        sammenligningResultat === SykefraværResultat.UFULLSTENDIG_DATA ||
        sammenligningResultat === SykefraværResultat.INGEN_DATA ? (
            <>
                <strong>4 av 4 kvartaler</strong>
            </>
        ) : null;

    return (
        <div className="ekspanderbar-sammenligning">
            <SammenligningIngress />
            <SlikHarViKommetFramTilDittResultat
                resultat={sammenligningResultat}
                kvartaler={kvartaler}
                onÅpne={() => sendEvent('barnehage sammenligning lesmer', 'åpne')}
            />
            <EkspanderbartSammenligningspanel
                className="ekspanderbar-sammenligning__sammenligning-totalt"
                sammenligningResultat={sammenligningResultat}
                sykefraværVirksomhet={getTotaltSykefraværSiste4Kvartaler(varighet)?.prosent}
                sykefraværBransje={totaltSykefraværForBarnehagerSiste4Kvartaler}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.TOTALT}
                defaultÅpen
                visTips={visTips}
            />
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultatKorttid}
                sykefraværVirksomhet={varighet?.summertKorttidsfravær.prosent}
                sykefraværBransje={korttidssykefraværForBarnehagerSiste4Kvartaler}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.KORTTID}
                visTips={visTips}
            />
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultatLangtid}
                sykefraværVirksomhet={varighet?.summertLangtidsfravær.prosent}
                sykefraværBransje={langtidssykefraværForBarnehagerSiste4Kvartaler}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.LANGTID}
                visTips={visTips}
            />
        </div>
    );
};
