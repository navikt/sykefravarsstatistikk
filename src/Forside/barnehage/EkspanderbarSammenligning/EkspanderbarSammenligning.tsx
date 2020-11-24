import React, {FunctionComponent} from 'react';
import {
    RestSummertSykefraværshistorikk,
    Statistikkategori,
    SummertSykefraværshistorikk
} from '../../../api/sykefraværsvarighet';
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
import {ÅrstallOgKvartal} from "../../../utils/sykefraværshistorikk-utils";

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

    const sammenligningHjelpeFunksjon = (
        restStatus: RestStatus.Suksess | RestStatus.Feil, 
        summertSykefraværshistorikk: SummertSykefraværshistorikk[] | null,
        sammenligningsType: SammenligningsType
    ): {
        sammenligningstype: SammenligningsType,
        sammenligningResultat: SykefraværResultat,
        sykefraværVirksomhet: number | null | undefined,
        sykefraværBransje: number | null | undefined,
        kvartaler: ÅrstallOgKvartal[] | undefined;
    } => {

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
        
        let sammenligningResultat: SykefraværResultat;
        let sykefraværVirksomhet;
        let sykefraværBransje;
        
        switch(sammenligningsType) {
            case SammenligningsType.TOTALT:
                sammenligningResultat = getResultatForSammenligningAvSykefravær(
                    restSummertSykefraværshistorikk.status,
                    getTotaltSykefraværSiste4Kvartaler(varighet),
                    getTotaltSykefraværSiste4Kvartaler(varighetBransjeEllerNæring)?.prosent
                );
                sykefraværVirksomhet = getTotaltSykefraværSiste4Kvartaler(varighet)?.prosent;
                sykefraværBransje = getTotaltSykefraværSiste4Kvartaler(varighetBransjeEllerNæring)?.prosent;
                break;
            case SammenligningsType.KORTTID:
                sammenligningResultat = getResultatForSammenligningAvSykefravær(
                    restSummertSykefraværshistorikk.status,
                    varighet?.summertKorttidsfravær,
                    varighetBransjeEllerNæring?.summertKorttidsfravær.prosent
                );
                sykefraværVirksomhet = varighet?.summertKorttidsfravær.prosent;
                sykefraværBransje = varighetBransjeEllerNæring?.summertKorttidsfravær.prosent;
                break;
            case SammenligningsType.LANGTID:
                sammenligningResultat = getResultatForSammenligningAvSykefravær(
                    restSummertSykefraværshistorikk.status,
                    varighet?.summertLangtidsfravær,
                    varighetBransjeEllerNæring?.summertLangtidsfravær.prosent
                );
                sykefraværVirksomhet = varighet?.summertLangtidsfravær.prosent;
                sykefraværBransje = varighetBransjeEllerNæring?.summertLangtidsfravær.prosent;
        }

        return {
            sammenligningstype: sammenligningsType,
            sammenligningResultat: sammenligningResultat,
            sykefraværVirksomhet: sykefraværVirksomhet,
            sykefraværBransje: sykefraværBransje,
            kvartaler: kvartaler
        }; 
    };
    
    const sammenligningResultatTotalt = sammenligningHjelpeFunksjon(
        restSummertSykefraværshistorikk.status,
        restSummertSykefraværshistorikk.status === RestStatus.Suksess? 
            restSummertSykefraværshistorikk.data : null, 
        SammenligningsType.TOTALT);
    
    
    const sammenligningResultatKorttid = sammenligningHjelpeFunksjon(
        restSummertSykefraværshistorikk.status,
        restSummertSykefraværshistorikk.status === RestStatus.Suksess?
            restSummertSykefraværshistorikk.data : null,
        SammenligningsType.KORTTID);
    
    const sammenligningResultatLangtid = sammenligningHjelpeFunksjon(
        restSummertSykefraværshistorikk.status,
        restSummertSykefraværshistorikk.status === RestStatus.Suksess?
            restSummertSykefraværshistorikk.data : null,
        SammenligningsType.LANGTID);

    const antallKvartalerVirksomhet =
        sammenligningResultatTotalt.sammenligningResultat === SykefraværResultat.UFULLSTENDIG_DATA ||
        sammenligningResultatTotalt.sammenligningResultat === SykefraværResultat.INGEN_DATA ? (
            <>
                <strong> {sammenligningResultatTotalt.kvartaler?.length || 0} av 4 kvartaler</strong>
            </>
        ) : null;

    const antallKvartalerBransje =
        sammenligningResultatTotalt.sammenligningResultat === SykefraværResultat.UFULLSTENDIG_DATA ||
        sammenligningResultatTotalt.sammenligningResultat === SykefraværResultat.INGEN_DATA ? (
            <>
                <strong>4 av 4 kvartaler</strong>
            </>
        ) : null;

    return (
        <div className="ekspanderbar-sammenligning">
            <SammenligningIngress />
            <SlikHarViKommetFramTilDittResultat
                resultat={sammenligningResultatTotalt.sammenligningResultat}
                kvartaler={sammenligningResultatTotalt.kvartaler}
                onÅpne={() => sendEvent('barnehage sammenligning lesmer', 'åpne')}
            />
            <EkspanderbartSammenligningspanel
                className="ekspanderbar-sammenligning__sammenligning-totalt"
                sammenligningResultat={sammenligningResultatTotalt.sammenligningResultat}
                sykefraværVirksomhet={sammenligningResultatTotalt.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatTotalt.sykefraværBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.TOTALT}
                defaultÅpen
                visTips={visTips}
            />
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultatKorttid.sammenligningResultat}
                sykefraværVirksomhet={sammenligningResultatKorttid.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatKorttid.sykefraværBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.KORTTID}
                visTips={visTips}
            />
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultatLangtid.sammenligningResultat}
                sykefraværVirksomhet={sammenligningResultatLangtid.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatLangtid.sykefraværBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.LANGTID}
                visTips={visTips}
            />
        </div>
    );
};
