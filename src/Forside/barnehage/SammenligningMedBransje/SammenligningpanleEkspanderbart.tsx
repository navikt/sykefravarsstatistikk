import React, { FunctionComponent } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningSiste4KvartalerMedBransje.less';
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
import { getInfoTekst, getVurderingstekstTotalt } from '../vurderingstekster';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import AlertStripe from 'nav-frontend-alertstriper';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

export const SammenligningpanleEkspanderbart: FunctionComponent<Props> = ({
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
        return <Skeleton className="sammenligning-med-bransje__loading-skeleton" height={355} />;
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
        <div className="sammenligning-med-bransje">
            <Ekspanderbartpanel
                apen={true}
                tittel={
                    <div>
                        <Systemtittel className="sammenligning-med-bransje__tittel">
                            {getVurderingstekstTotalt(sammenligningResultat)}
                        </Systemtittel>
                    </div>
                }
                className="sammenligning-med-bransje__panel"
            >
                <Ingress tag="h3" className="sammenligning-med-bransje__panel-tittel">
                    Legemeldt sykefravær
                    <Normaltekst>Periode: {periode}</Normaltekst>
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
                        <Systemtittel tag="p">
                            <Prosent prosent={sykefraværVirksomhet} />
                            {antallKvartalerVirksomhet}
                        </Systemtittel>
                        <Ingress className="sammenligning-med-bransje__bransje-tittel">
                            Barnehager i Norge:
                        </Ingress>
                        <Systemtittel tag="p">
                            <Prosent prosent={visningAvProsentForBransje} />
                            {antallKvartalerBransje}
                        </Systemtittel>
                        <Normaltekst className="sammenligning-med-bransje__neste-oppdatering">
                            Sist oppdatert: {sisteOppdatering}
                        </Normaltekst>
                    </div>
                </div>
                <AlertStripe type={'info'}>
                    {getInfoTekst(
                        sammenligningResultat,
                        sykefraværForBarnehagerSiste4Kvartaler.totalt
                    )}
                </AlertStripe>
            </Ekspanderbartpanel>
        </div>
    );
};
