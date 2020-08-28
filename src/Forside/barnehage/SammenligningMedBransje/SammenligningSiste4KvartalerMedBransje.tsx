import React, { FunctionComponent } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningSiste4KvartalerMedBransje.less';
import Panel from 'nav-frontend-paneler';
import { Speedometer, SykefraværResultat } from '../Speedometer/Speedometer';
import InternLenke from '../../../felleskomponenter/InternLenke/InternLenke';
import { PATH_HISTORIKK } from '../../../App';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import {
    getResultatForSammenligningAvSykefravær,
    getTotaltSykefraværSiste4Kvartaler,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../barnehage-utils';
import { nesteOppdatering } from '../../../utils/app-utils';
import Skeleton from 'react-loading-skeleton';
import { Prosent } from '../Prosent';
import { getVurderingstekstTotalt } from '../vurderingstekster';
import { SlikHarViKommetFramTilDittResultat } from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import { useSendEvent } from '../../../amplitude/amplitude';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}

export const SammenligningSiste4KvartalerMedBransje: FunctionComponent<Props> = ({
    restSykefraværsvarighet,
}) => {
    const sendEvent = useSendEvent();

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
                Legemeldt sykefravær siste 4 kvartaler
            </Systemtittel>
            <LesMerPanel
                className="sammenligning-med-bransje__utregningsinfo"
                åpneLabel="Slik har vi kommet fram til ditt resultat"
                onÅpne={() => sendEvent('barnehage sammenligning total lesmer', 'åpne')}
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
                    Gå til sykefraværshistorikken
                </InternLenke>
            </Panel>
        </div>
    );
};
