import React, { FunctionComponent } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './EkspanderbartSammenligningspanel.less';
import { Speedometer, SykefraværResultat } from '../Speedometer/Speedometer';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import {
    getResultatForSammenligningAvSykefravær,
    getTotaltSykefraværSiste4Kvartaler,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../barnehage-utils';
import { sisteOppdatering } from '../../../utils/app-utils';
import Skeleton from 'react-loading-skeleton';
import { Prosent } from '../Prosent';
import { getForklaringAvVurdering, getVurderingstekstTotalt } from '../vurderingstekster';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import AlertStripe from 'nav-frontend-alertstriper';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

export const EkspanderbartSammenligningspanel: FunctionComponent<Props> = ({
    restSykefraværsvarighet,
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
        return <Skeleton className="ekspanderbart-sammenligningspanel__loading-skeleton" height={355} />;
    }

    const varighet =
        restSykefraværsvarighet.status === RestStatus.Suksess
            ? restSykefraværsvarighet.data
            : undefined;
    const kvartaler = varighet?.summertKorttidsfravær.kvartaler.slice().reverse();

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

    const visningAvProsentForBransje =
        sammenligningResultat === SykefraværResultat.FEIL ? null : sykefraværBransje;
    const periode = '01.04.2019 til 31.03.2020';
    return (
        <div className="ekspanderbart-sammenligningspanel">
            <Ekspanderbartpanel
                apen={true}
                tittel={
                    <div className="ekspanderbart-sammenligningspanel__tittel-wrapper">
                        <Speedometer resultat={sammenligningResultat}/>
                        <Systemtittel className="ekspanderbart-sammenligningspanel__tittel">
                            {getVurderingstekstTotalt(sammenligningResultat)}
                        </Systemtittel>
                    </div>
                }
                className="ekspanderbart-sammenligningspanel__panel"
            >
                <Ingress tag="h3" className="ekspanderbart-sammenligningspanel__panel-tittel">
                    Legemeldt sykefravær
                    <Normaltekst>Periode: {periode}</Normaltekst>
                </Ingress>
                <div className="ekspanderbart-sammenligningspanel__ikon-og-tall">
                    <Speedometer
                        className="ekspanderbart-sammenligningspanel__ikon"
                        stor
                        resultat={sammenligningResultat}
                    />
                    <div className="ekspanderbart-sammenligningspanel__tall">
                        <Ingress className="ekspanderbart-sammenligningspanel__virksomhet-tittel">
                            Din virksomhet:
                        </Ingress>
                        <Systemtittel tag="p">
                            <Prosent prosent={sykefraværVirksomhet} />
                            {antallKvartalerVirksomhet}
                        </Systemtittel>
                        <Ingress className="ekspanderbart-sammenligningspanel__bransje-tittel">
                            Barnehager i Norge:
                        </Ingress>
                        <Systemtittel tag="p">
                            <Prosent prosent={visningAvProsentForBransje} />
                            {antallKvartalerBransje}
                        </Systemtittel>
                        <Normaltekst className="ekspanderbart-sammenligningspanel__neste-oppdatering">
                            Sist oppdatert: {sisteOppdatering}
                        </Normaltekst>
                    </div>
                </div>
                <AlertStripe type={'info'} className="ekspanderbart-sammenligningspanel__forklaring-av-vurdering">
                    {getForklaringAvVurdering(
                        sammenligningResultat,
                        sykefraværForBarnehagerSiste4Kvartaler.totalt
                    )}
                </AlertStripe>
            </Ekspanderbartpanel>
        </div>
    );
};
