import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefraværPanel.less';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';
import {
    RestSykefraværshistorikk,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from '../../api/sykefraværshistorikk';
import {
    getHistorikkLabels,
    HistorikkLabels,
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import { RestStatus } from '../../api/api-utils';
import SykefraværpanelOverskrift from './SykefraværpanelOverskrift';
import SykefraværpanelFeilmelding from './SykefraværpanelFeilmelding';
import NæringEllerBransjePanel from './NæringEllerBransjePanel';
import Virksomhetspanel from './Virksomhetspanel';

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

const LegemeldtSykefraværPanel: FunctionComponent<Props> = props => {
    const restSykefraværshistorikk = props.restSykefraværshistorikk;
    const restStatus = restSykefraværshistorikk.status;
    const laster = restStatus === RestStatus.LasterInn || restStatus === RestStatus.IkkeLastet;

    let labels: HistorikkLabels | any = {};
    let sammenligningSisteKvartal: KvartalsvisSammenligning | any = {};
    let harBransje = undefined;

    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const historikkListe = restSykefraværshistorikk.data;
        labels = getHistorikkLabels(historikkListe);
        sammenligningSisteKvartal = getSammenligningForSisteKvartal(historikkListe);
        harBransje = !!restSykefraværshistorikk.data.find(
            historikk => historikk.type === SykefraværshistorikkType.BRANSJE
        );
    }

    const { årstall, kvartal } = sammenligningSisteKvartal;

    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <SykefraværpanelOverskrift
                    laster={laster}
                    className="legemeldtsykefravarpanel__overskrift"
                >
                    Legemeldt sykefravær i {kvartal}. kvartal {årstall}
                </SykefraværpanelOverskrift>
                <SykefraværpanelFeilmelding
                    status={restStatus}
                    className="legemeldtsykefravarpanel__feilmelding"
                >
                    Kunne ikke vise sykefraværet.
                </SykefraværpanelFeilmelding>
                <Virksomhetspanel
                    sykefraværsprosent={sammenligningSisteKvartal.virksomhet}
                    sykefraværprosentLabel={labels.virksomhet}
                    laster={laster}
                />
                <NæringEllerBransjePanel
                    laster={laster}
                    sykefraværsprosent={sammenligningSisteKvartal.næringEllerBransje}
                    sykefraværprosentLabel={labels.næringEllerBransje}
                    harBransje={harBransje}
                />
                <Sykefraværsprosentpanel
                    sykefraværsprosent={sammenligningSisteKvartal.sektor}
                    sykefraværprosentLabel={labels.sektor}
                    laster={laster}
                >
                    Sektoren virksomheten tilhører:
                </Sykefraværsprosentpanel>
                <Sykefraværsprosentpanel
                    sykefraværsprosent={sammenligningSisteKvartal.land}
                    sykefraværprosentLabel={labels.land}
                    laster={laster}
                />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefraværPanel;
