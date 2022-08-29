import React, { FunctionComponent } from 'react';
import { RestSummertSykefraværshistorikk } from '../../api/summert-sykefraværshistorikk-api';
import { EkspanderbartSammenligningspanel } from '../SammenligningMedBransje/EkspanderbartSammenligningspanel';
import { RestStatus } from '../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import { getSammenligningResultat, aggregertStatistikkHarBransje } from '../vurdering-utils';
import { SykefraværVurdering } from '../Speedometer/Speedometer';
import { SammenligningsType } from '../vurderingstekster';
import { SammenligningIngress } from '../SammenligningIngress/SammenligningIngress';
import { SlikHarViKommetFramTilDittResultat } from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import './EkspanderbarSammenligning.less';
import { RestVirksomhetsdata } from '../../api/virksomhetsdata-api';
import { DinNæringEllerBransje } from './DinNæringEllerBransje/DinNæringEllerBransje';
import { Element } from 'nav-frontend-typografi';
import { ArbeidsmiljøportalenBransje } from '../../utils/bransje-utils';
import { AggregertStatistikkResponse } from '../../hooks/useAggregertStatistikk';

interface Props {
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk;
    restVirksomhetsdata: RestVirksomhetsdata;
    aggregertStatistikk: AggregertStatistikkResponse;
}

export const EkspanderbarSammenligning: FunctionComponent<Props> = ({
    restSummertSykefraværshistorikk,
    restVirksomhetsdata,
    aggregertStatistikk
}) => {
    if (
        aggregertStatistikk.restStatus === RestStatus.IngenTilgang ||
        aggregertStatistikk.restStatus === RestStatus.IkkeInnlogget
    ) {
        return null;
    }

    if (
        aggregertStatistikk.restStatus === RestStatus.LasterInn ||
        aggregertStatistikk.restStatus === RestStatus.IkkeLastet
    ) {
        return (
            <Skeleton
                className="ekspanderbart-sammenligningspanel__loading-skeleton"
                height={355}
            />
        );
    }



    const bransje: ArbeidsmiljøportalenBransje | undefined =
        restVirksomhetsdata.status === RestStatus.Suksess
            ? restVirksomhetsdata.data.bransje
            : undefined;

    const harBransje =
        restSummertSykefraværshistorikk.status === RestStatus.Suksess &&
        aggregertStatistikkHarBransje(aggregertStatistikk.data);
    const {
        prosentSiste4Kvartaler,
        prosentSiste4KvartalerKorttid,
        prosentSiste4KvartalerLangtid,
        prosentSiste4KvartalerGradert,
        prosentSiste4KvartalerTotalt,
        trendTotalt,
        trend
    } = aggregertStatistikk.data

    const {
        sammenligningResultatTotalt,
        sammenligningResultatKorttid,
        sammenligningResultatLangtid,
        sammenligningResultatGradert,
    } = getSammenligningResultat(restSummertSykefraværshistorikk, aggregertStatistikk);


    const antallKvartalerVirksomhet =
        sammenligningResultatTotalt.sammenligningVurdering ===
            SykefraværVurdering.UFULLSTENDIG_DATA ||
        sammenligningResultatTotalt.sammenligningVurdering === SykefraværVurdering.INGEN_DATA ? (
            <strong> {sammenligningResultatTotalt.kvartaler?.length || 0} av 4 kvartaler</strong>
        ) : null;

    const antallKvartalerBransje =
        sammenligningResultatTotalt.sammenligningVurdering ===
            SykefraværVurdering.UFULLSTENDIG_DATA ||
        sammenligningResultatTotalt.sammenligningVurdering === SykefraværVurdering.INGEN_DATA ? (
            <strong>4 av 4 kvartaler</strong>
        ) : null;

    return (
        <div className="ekspanderbar-sammenligning">
            <SammenligningIngress bransje={bransje} harBransje={harBransje} />
            <SlikHarViKommetFramTilDittResultat
                resultat={sammenligningResultatTotalt.sammenligningVurdering}
                kvartaler={sammenligningResultatTotalt.kvartaler}
            />
            <DinNæringEllerBransje
                restSummertSykefraværshistorikk={restSummertSykefraværshistorikk}
            />
            <Element className="ekspanderbar-sammenligning__undertittel">
                Overordnet sammenligning:
            </Element>
            <EkspanderbartSammenligningspanel
                className="ekspanderbar-sammenligning__sammenligning-totalt"
                sykefraværVurdering={sammenligningResultatTotalt.sammenligningVurdering}
                sykefraværVirksomhet={sammenligningResultatTotalt.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatTotalt.sykefraværNæringEllerBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.TOTALT}
                bransje={bransje}
                harBransje={harBransje}
            />
            <Element className="ekspanderbar-sammenligning__undertittel">
                Detaljert sammenligning:
            </Element>
            <EkspanderbartSammenligningspanel
                sykefraværVurdering={sammenligningResultatGradert.sammenligningVurdering}
                sykefraværVirksomhet={sammenligningResultatGradert.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatGradert.sykefraværNæringEllerBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.GRADERT}
                bransje={bransje}
                harBransje={harBransje}
            />
            <EkspanderbartSammenligningspanel
                sykefraværVurdering={sammenligningResultatKorttid.sammenligningVurdering}
                sykefraværVirksomhet={sammenligningResultatKorttid.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatKorttid.sykefraværNæringEllerBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.KORTTID}
                bransje={bransje}
                harBransje={harBransje}
            />
            <EkspanderbartSammenligningspanel
                sykefraværVurdering={sammenligningResultatLangtid.sammenligningVurdering}
                sykefraværVirksomhet={sammenligningResultatLangtid.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatLangtid.sykefraværNæringEllerBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.LANGTID}
                bransje={bransje}
                harBransje={harBransje}
            />
        </div>
    );
};
