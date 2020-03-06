import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Sammenligningspanel.less';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
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

import { ReactComponent as BedriftSvg } from './Bedrift.svg';
import { ReactComponent as NorgeSvg } from './Norge.svg';
import { ReactComponent as NæringSvg } from './Næring.svg';
import { ReactComponent as SektorSvg } from './Sektor.svg';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';

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
        /*<PanelBase className="sammenligningspanel">
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
        </PanelBase>*/
        <div className="div-test typo-normal">
            <PanelBase className="test-panel">
                <Systemtittel className="infopanel__overskrift" tag="h2">
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
                    </SammenligningspanelFeilmelding>                </Systemtittel>
                <div className="test0">
                    <div className="test1">
                        <BedriftSvg />
                        <Innholdstittel className="tittel1">13,1&nbsp;%</Innholdstittel>
                        <div className="typo-element">Din virksomhet:</div>
                        Flesk og fisk Oslo
                    </div>
                    <div className="test1">
                        <NæringSvg />
                        <Innholdstittel className="tittel1">6.2&nbsp;%</Innholdstittel>
                        <div className="typo-element">Bransjen:</div>
                        Barnehager
                    </div>
                    <div className="test1">
                        <SektorSvg />
                        <Innholdstittel className="tittel1">5,1&nbsp;%</Innholdstittel>
                        <div className="typo-element">Offentlig sektor</div>
                    </div>
                    <div className="test1">
                        <NorgeSvg />
                        <Innholdstittel className="tittel1">4,1&nbsp;%</Innholdstittel>
                        <div className="typo-element">Norge</div>
                    </div>
                </div>
            </PanelBase>
        </div>
    );
};

export default Sammenligningspanel;
