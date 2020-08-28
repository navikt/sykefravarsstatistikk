import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Sammenligningspanel.less';
import { RestSykefraværshistorikk, Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    getHistorikkLabels,
    historikkHarBransje,
    historikkHarOverordnetEnhet,
    HistorikkLabels,
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import { RestStatus } from '../../api/api-utils';
import SammenligningspanelOverskrift from './SammenligningspanelOverskrift';
import SammenligningspanelFeilmelding from './SammenligningspanelFeilmelding';
import NæringEllerBransjePanel from './Paneler/NæringEllerBransjePanel';
import { Virksomhetspanel } from './Paneler/Virksomhetspanel';
import Landspanel from './Paneler/Landspanel';
import Skeleton from 'react-loading-skeleton';
import { SammenligningspanelAlertStripe } from './SammenligningspanelAlertStripe/SammenligningspanelAlertStripe';
import KoronaInfotekst from './KoronaInfotekst/KoronaInfotekst';
import { OverordnetEnhetPanel } from './Paneler/OverordnetEnhetPanel';
import { Normaltekst } from 'nav-frontend-typografi';
import { nesteOppdatering } from '../../utils/app-utils';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const getSammenligningForSisteKvartal = (
    historikkListe: Sykefraværshistorikk[]
): KvartalsvisSammenligning => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(historikkListe);
    kvartalsvisSammenligning.reverse();
    return kvartalsvisSammenligning[0];
};

const Sammenligningspanel: FunctionComponent<Props> = (props) => {
    const restSykefraværshistorikk = props.restSykefraværshistorikk;
    const restStatus = restSykefraværshistorikk.status;
    const laster = restStatus === RestStatus.LasterInn || restStatus === RestStatus.IkkeLastet;

    let labels: HistorikkLabels | any = {};
    let sammenligningSisteKvartal: KvartalsvisSammenligning | any = {};
    let harBransje = undefined;
    let skalViseOverordnetEnhet = undefined;

    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const historikkListe = restSykefraværshistorikk.data;
        labels = getHistorikkLabels(historikkListe);
        sammenligningSisteKvartal = getSammenligningForSisteKvartal(historikkListe);
        harBransje = historikkHarBransje(historikkListe);
        skalViseOverordnetEnhet = historikkHarOverordnetEnhet(historikkListe);
    }

    const { årstall, kvartal } = sammenligningSisteKvartal;

    return (
        <>
            <SammenligningspanelAlertStripe
                sammenligningSisteKvartal={sammenligningSisteKvartal}
                restStatus={restStatus}
            />
            <PanelBase className="sammenligningspanel">
                <div className="sammenligningspanel__tekst-wrapper">
                    <SammenligningspanelOverskrift
                        laster={laster}
                        className="sammenligningspanel__overskrift"
                    >
                        Legemeldt sykefravær i {kvartal}. kvartal {årstall}
                    </SammenligningspanelOverskrift>
                    <Normaltekst className="sammenligningspanel__neste-oppdatering">
                        Neste oppdatering: {nesteOppdatering}
                    </Normaltekst>
                    <SammenligningspanelFeilmelding
                        restSykefraværshistorikk={restSykefraværshistorikk}
                        className="sammenligningspanel__feilmelding"
                    />
                    <KoronaInfotekst className="sammenligningspanel__koronainfo" />
                    {laster ? (
                        <div className="sammenligningspanel__skeleton">
                            <Skeleton height={228} />
                        </div>
                    ) : (
                        <div className="sammenligningspanel__innhold">
                            <Virksomhetspanel
                                sykefraværsprosent={sammenligningSisteKvartal.virksomhet}
                                sykefraværprosentLabel={labels.virksomhet}
                                laster={laster}
                                className="sammenligningspanel__syfopanel"
                            />
                            {skalViseOverordnetEnhet && (
                                <OverordnetEnhetPanel
                                    sykefraværsprosent={sammenligningSisteKvartal.overordnetEnhet}
                                    sykefraværprosentLabel={labels.overordnetEnhet}
                                    laster={laster}
                                    className="sammenligningspanel__syfopanel"
                                />
                            )}
                            <NæringEllerBransjePanel
                                laster={laster}
                                sykefraværsprosent={sammenligningSisteKvartal.næringEllerBransje}
                                sykefraværprosentLabel={labels.næringEllerBransje}
                                harBransje={harBransje}
                                className="sammenligningspanel__syfopanel"
                            />
                            <Landspanel
                                laster={laster}
                                sykefraværsprosent={sammenligningSisteKvartal.land}
                                sykefraværprosentLabel={labels.land}
                                className="sammenligningspanel__syfopanel"
                            />
                        </div>
                    )}
                </div>
            </PanelBase>
        </>
    );
};

export default Sammenligningspanel;
