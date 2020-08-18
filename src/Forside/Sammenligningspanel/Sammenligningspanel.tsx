import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Sammenligningspanel.less';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    getHistorikkLabels,
    historikkHarBransje,
    historikkHarOverordnetEnhet,
    HistorikkLabels,
    SammenligningOverFlereKvartaler,
    summerSammenligningForSisteKvartaler,
    ÅrstallOgKvartal,
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

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const Sammenligningspanel: FunctionComponent<Props> = (props) => {
    const restSykefraværshistorikk = props.restSykefraværshistorikk;
    const restStatus = restSykefraværshistorikk.status;
    const laster = restStatus === RestStatus.LasterInn || restStatus === RestStatus.IkkeLastet;

    let labels: HistorikkLabels | any = {};
    let sammenligningSisteKvartaler: SammenligningOverFlereKvartaler | any = {};
    let harBransje = undefined;
    let skalViseOverordnetEnhet = undefined;

    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const historikkListe = restSykefraværshistorikk.data;
        labels = getHistorikkLabels(historikkListe);
        sammenligningSisteKvartaler = summerSammenligningForSisteKvartaler(historikkListe);
        harBransje = historikkHarBransje(historikkListe);
        skalViseOverordnetEnhet = historikkHarOverordnetEnhet(historikkListe);
    }

    const kvartaler = sammenligningSisteKvartaler.kvartaler;
    const førsteKvartal = kvartaler[0];
    const sisteKvartal = kvartaler[kvartaler.length - 1];

    const formaterKvartal = (årstallOgKvartal: ÅrstallOgKvartal) =>
        `${årstallOgKvartal.kvartal}. kvartal ${årstallOgKvartal.årstall}`;

    return (
        <>
            <SammenligningspanelAlertStripe
                sammenligningSisteKvartal={sammenligningSisteKvartaler}
                restStatus={restStatus}
            />
            <PanelBase className="sammenligningspanel">
                <div className="sammenligningspanel__tekst-wrapper">
                    <SammenligningspanelOverskrift
                        laster={laster}
                        className="sammenligningspanel__overskrift"
                    >
                        Legemeldt sykefravær mellom {formaterKvartal(førsteKvartal)} og{' '}
                        {formaterKvartal(sisteKvartal)}
                    </SammenligningspanelOverskrift>
                    <SammenligningspanelFeilmelding
                        restSykefraværshistorikk={restSykefraværshistorikk}
                        className="sammenligningspanel__feilmelding"
                    />
                    <KoronaInfotekst />
                    {laster ? (
                        <div className="sammenligningspanel__skeleton">
                            <Skeleton height={228} />
                        </div>
                    ) : (
                        <div className="sammenligningspanel__innhold">
                            <Virksomhetspanel
                                sykefraværsprosent={sammenligningSisteKvartaler.virksomhet}
                                sykefraværprosentLabel={labels.virksomhet}
                                laster={laster}
                                className="sammenligningspanel__syfopanel"
                            />
                            {skalViseOverordnetEnhet && (
                                <OverordnetEnhetPanel
                                    sykefraværsprosent={sammenligningSisteKvartaler.overordnetEnhet}
                                    sykefraværprosentLabel={labels.overordnetEnhet}
                                    laster={laster}
                                    className="sammenligningspanel__syfopanel"
                                />
                            )}
                            <NæringEllerBransjePanel
                                laster={laster}
                                sykefraværsprosent={sammenligningSisteKvartaler.næringEllerBransje}
                                sykefraværprosentLabel={labels.næringEllerBransje}
                                harBransje={harBransje}
                                className="sammenligningspanel__syfopanel"
                            />
                            <Landspanel
                                laster={laster}
                                sykefraværsprosent={sammenligningSisteKvartaler.land}
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
