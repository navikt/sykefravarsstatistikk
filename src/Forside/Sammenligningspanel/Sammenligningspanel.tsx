import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Sammenligningspanel.less';
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
import Sektorpanel from './Sektorpanel/Sektorpanel';
import Landspanel from './Landspanel/Landspanel';
import Skeleton from 'react-loading-skeleton';
import LesMerPanel from '../../felleskomponenter/LesMerPanel/LesMerPanel';
import { Normaltekst } from 'nav-frontend-typografi';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { ReactComponent as InfoCircle } from './InfoCircle.svg';

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

    const lasterinnhold = (
        <div className="sammenligningspanel__skeleton">
            <Skeleton height={228} />
        </div>
    );
    const lesMerOmKorona = (
        <div className="sammenligningspanel__korona_infotekst">
            <InfoCircle />
            <LesMerPanel
                åpneLabel="Koronaepidemien og sykefraværsstatistikken"
                lukkLabel="Lukk"
                className="sammenligningspanel__korona_infotekst_les_mer_panel"
            >
                <Normaltekst>
                    Opplever du høyere sykefravær enn normalt i første kvartal? Økning i
                    korttidssykefraværet skyldes sannsynligvis koronaepidemien. Når din
                    sykefraværsprosent beregnes, telles permitterte med som ansatte de tre første
                    månedene av permitteringen.
                    <EksternLenke href="https://www.nav.no/no/nav-og-samfunn/statistikk/sykefravar-statistikk/sykefravar">
                        Les mer om hvordan korona påvirker sykefraværet i Norge
                    </EksternLenke>
                </Normaltekst>
            </LesMerPanel>
        </div>
    );
    const innhold = (
        <div className="sammenligningspanel__innhold">
            <Virksomhetspanel
                sykefraværsprosent={sammenligningSisteKvartal.virksomhet}
                sykefraværprosentLabel={labels.virksomhet}
                laster={laster}
                className="sammenligningspanel__syfopanel"
            />
            <NæringEllerBransjePanel
                laster={laster}
                sykefraværsprosent={sammenligningSisteKvartal.næringEllerBransje}
                sykefraværprosentLabel={labels.næringEllerBransje}
                harBransje={harBransje}
                className="sammenligningspanel__syfopanel"
            />
            <Sektorpanel
                laster={laster}
                sykefraværsprosent={sammenligningSisteKvartal.sektor}
                sykefraværprosentLabel={labels.sektor}
                className="sammenligningspanel__syfopanel"
            />
            <Landspanel
                laster={laster}
                sykefraværsprosent={sammenligningSisteKvartal.land}
                sykefraværprosentLabel={labels.land}
                className="sammenligningspanel__syfopanel"
            />
        </div>
    );

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
                {lesMerOmKorona}
                {laster ? lasterinnhold : innhold}
            </div>
        </PanelBase>
    );
};

export default Sammenligningspanel;
