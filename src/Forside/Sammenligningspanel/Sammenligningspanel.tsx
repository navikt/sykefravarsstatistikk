import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Sammenligningspanel.less';
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';
import { RestSykefraværshistorikk, Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    getHistorikkLabels,
    historikkHarBransje,
    HistorikkLabels,
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import { RestStatus } from '../../api/api-utils';
import SammenligningspanelOverskrift from './SammenligningspanelOverskrift';
import SammenligningspanelFeilmelding from './SammenligningspanelFeilmelding';
import NæringEllerBransjePanel from './NæringEllerBransjePanel/NæringEllerBransjePanel';
import Virksomhetspanel from './Virksomhetspanel';
import SektorPanel from './SektorPanel/SektorPanel';
import LandsPanel from './LandsPanel/LandsPanel';

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

const Sammenligningspanel: FunctionComponent<Props> = props => {
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
        harBransje = historikkHarBransje(restSykefraværshistorikk.data);
    }

    const { årstall, kvartal } = sammenligningSisteKvartal;

    return (
        <PanelBase className="sammenligningspanel">
            <div className="sammenligningspanel__tekst-wrapper">
                <SammenligningspanelOverskrift
                    laster={laster}
                    className="sammenligningspanel__overskrift"
                >
                    Legemeldt sykefravær i {kvartal}. kvartal {årstall}
                </SammenligningspanelOverskrift>
                <SammenligningspanelFeilmelding
                    status={restStatus}
                    className="sammenligningspanel__feilmelding"
                >
                    Kunne ikke vise sykefraværet.
                </SammenligningspanelFeilmelding>
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
                <SektorPanel laster={laster} sykefraværsprosent={sammenligningSisteKvartal.sektor} sykefraværprosentLabel={labels.sektor} />
                <LandsPanel laster={laster} sykefraværsprosent={sammenligningSisteKvartal.land} sykefraværprosentLabel={labels.land} />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>

    );
};

export default Sammenligningspanel;
