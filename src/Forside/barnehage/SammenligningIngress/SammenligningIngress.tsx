import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningIngress.less';
import KoronaInfotekst from '../../Sammenligningspanel/KoronaInfotekst/KoronaInfotekst';
import { SlikHarViKommetFramTilDittResultat } from '../SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import { useSendEvent } from '../../../amplitude/amplitude';
import {
    getResultatForSammenligningAvSykefravær,
    getTotaltSykefraværSiste4Kvartaler,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../barnehage-utils';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import Skeleton from 'react-loading-skeleton';

interface Props {
    restSykefraværsvarighet: RestSykefraværsvarighet;
}
export const SammenligningIngress: FunctionComponent<Props> = ({ restSykefraværsvarighet }) => {
    const sendEvent = useSendEvent();
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
    const sykefraværBransje = sykefraværForBarnehagerSiste4Kvartaler.totalt;
    const kvartaler = varighet?.summertKorttidsfravær.kvartaler.slice().reverse();

    const sammenligningResultat = getResultatForSammenligningAvSykefravær(
        restSykefraværsvarighet.status,
        getTotaltSykefraværSiste4Kvartaler(varighet),
        sykefraværBransje
    );

    return (
        <>
            <KoronaInfotekst className="sammenligning-ingress__koronainfo" />
            <Systemtittel tag="h2" className="sammenligning-ingress__tittel">
                Hvor er ditt potensial?
            </Systemtittel>
            <Normaltekst>
                Du kan få hjelp til å forstå det ved å sammenligne deg med andre barnehager i Norge.
            </Normaltekst>
            <Normaltekst>Vi har laget en oversikt for deg.</Normaltekst>
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
        </>
    );
};
