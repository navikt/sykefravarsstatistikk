import React, { FunctionComponent } from 'react';
import { RestSummertSykefraværshistorikk } from '../../../api/summertSykefraværshistorikk';
import { EkspanderbartSammenligningspanel } from '../SammenligningMedBransje/EkspanderbartSammenligningspanel';
import { RestStatus } from '../../../api/api-utils';
import Skeleton from 'react-loading-skeleton';
import { getSammenligningResultatMedProsent } from '../barnehage-utils';
import { SykefraværVurdering } from '../Speedometer/Speedometer';
import { SammenligningsType } from '../vurderingstekster';
import { SammenligningIngress } from '../SammenligningIngress/SammenligningIngress';
import { SlikHarViKommetFramTilDittResultat } from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import { useSendEvent } from '../../../amplitude/amplitude';
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

    const summertSykefraværshistorikk =
        restSummertSykefraværshistorikk.status === RestStatus.Suksess
            ? restSummertSykefraværshistorikk.data
            : undefined;

    const sammenligningResultatTotalt = getSammenligningResultatMedProsent(
        restSummertSykefraværshistorikk.status,
        summertSykefraværshistorikk,
        SammenligningsType.TOTALT
    );

    const sammenligningResultatKorttid = getSammenligningResultatMedProsent(
        restSummertSykefraværshistorikk.status,
        summertSykefraværshistorikk,
        SammenligningsType.KORTTID
    );
    const sammenligningResultatLangtid = getSammenligningResultatMedProsent(
        restSummertSykefraværshistorikk.status,
        summertSykefraværshistorikk,
        SammenligningsType.LANGTID
    );

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
            <SammenligningIngress />
            <SlikHarViKommetFramTilDittResultat
                resultat={sammenligningResultatTotalt.sammenligningVurdering}
                kvartaler={sammenligningResultatTotalt.kvartaler}
                onÅpne={() => sendEvent('barnehage sammenligning lesmer', 'åpne')}
            />
            <EkspanderbartSammenligningspanel
                className="ekspanderbar-sammenligning__sammenligning-totalt"
                sammenligningResultat={sammenligningResultatTotalt.sammenligningVurdering}
                sykefraværVirksomhet={sammenligningResultatTotalt.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatTotalt.sykefraværBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.TOTALT}
                defaultÅpen
                visTips={visTips}
            />
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultatKorttid.sammenligningVurdering}
                sykefraværVirksomhet={sammenligningResultatKorttid.sykefraværVirksomhet}
                sykefraværBransje={sammenligningResultatKorttid.sykefraværBransje}
                antallKvartalerVirksomhet={antallKvartalerVirksomhet}
                antallKvartalerBransje={antallKvartalerBransje}
                sammenligningsType={SammenligningsType.KORTTID}
                visTips={visTips}
            />
            <EkspanderbartSammenligningspanel
                sammenligningResultat={sammenligningResultatLangtid.sammenligningVurdering}
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
