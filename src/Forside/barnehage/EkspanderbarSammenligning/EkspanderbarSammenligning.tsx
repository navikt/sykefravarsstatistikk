import React, { FunctionComponent } from 'react';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { EkspanderbartSammenligningspanel } from '../SammenligningMedBransje/EkspanderbartSammenligningspanel';
import { RestStatus } from '../../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import {
    getResultatForSammenligningAvSykefravær,
    getTotaltSykefraværSiste4Kvartaler,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../barnehage-utils';
import { SykefraværResultat } from '../Speedometer/Speedometer';
import { SammenligningsType } from '../vurderingstekster';
import './EkspanderbarSammenligning.less';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
    visTips?: boolean;
}

export const EkspanderbarSammenligning: FunctionComponent<Props> = ({
    restSykefraværsvarighet,
    visTips,
}) => {
    if (
        restSykefraværsvarighet.status === RestStatus.IngenTilgang ||
        restSykefraværsvarighet.status === RestStatus.IkkeInnlogget
    ) {
        return null;
    }

    if (
        restSykefraværsvarighet.status === RestStatus.LasterInn ||
        restSykefraværsvarighet.status === RestStatus.IkkeLastet
    ) {
        return (
            <Skeleton
                className="ekspanderbart-sammenligningspanel__loading-skeleton"
                height={355}
            />
        );
    }

    const varighet =
        restSykefraværsvarighet.status === RestStatus.Suksess
            ? restSykefraværsvarighet.data
            : undefined;
    const kvartaler = varighet?.summertKorttidsfravær.kvartaler.slice().reverse();

    const sammenligningResultat = getResultatForSammenligningAvSykefravær(
        restSykefraværsvarighet.status,
        getTotaltSykefraværSiste4Kvartaler(varighet),
        sykefraværForBarnehagerSiste4Kvartaler.totalt
    );
    const sammenligningResultatKorttid = getResultatForSammenligningAvSykefravær(
        restSykefraværsvarighet.status,
        varighet?.summertKorttidsfravær,
        sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær
    );
    const sammenligningResultatLangtid = getResultatForSammenligningAvSykefravær(
        restSykefraværsvarighet.status,
        varighet?.summertLangtidsfravær,
        sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær
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
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultat}
                sykefraværVirksomhet={getTotaltSykefraværSiste4Kvartaler(varighet)?.prosent}
                sykefraværBransje={sykefraværForBarnehagerSiste4Kvartaler.totalt}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.TOTALT}
                åpen
                visTips={visTips}
            />
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultatKorttid}
                sykefraværVirksomhet={varighet?.summertKorttidsfravær.prosent}
                sykefraværBransje={sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.KORTTID}
                visTips={visTips}
            />
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultatLangtid}
                sykefraværVirksomhet={varighet?.summertLangtidsfravær.prosent}
                sykefraværBransje={sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.LANGTID}
                visTips={visTips}
            />
        </div>
    );
};
