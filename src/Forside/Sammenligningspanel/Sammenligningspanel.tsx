import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Sammenligningspanel.less';
import {
    RestSykefraværshistorikk,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
    Sykefraværsprosent,
} from '../../api/sykefraværshistorikk';
import {
    beregnHvilkeÅrstallOgKvartalerSomSkalVises,
    getHistorikkLabels,
    historikkHarBransje,
    historikkHarOverordnetEnhet,
    HistorikkLabels,
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
    SammenligningOverFlereKvartaler,
    summerSykefraværsprosent,
    ÅrstallOgKvartal,
} from '../../utils/sykefraværshistorikk-utils';
import { RestStatus, Årsak } from '../../api/api-utils';
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

const getSammenligningForSisteKvartal = (
    historikkListe: Sykefraværshistorikk[]
): KvartalsvisSammenligning => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(historikkListe);
    kvartalsvisSammenligning.reverse();
    return kvartalsvisSammenligning[0];
};

const getFireSisteKvartaler = (historikkListe: Sykefraværshistorikk[]) => {
    const kvartaler = beregnHvilkeÅrstallOgKvartalerSomSkalVises(historikkListe);
    return kvartaler.slice(kvartaler.length - 4, kvartaler.length);
};

const getSammenligningFor4SisteKvartaler = (
    historikkListe: Sykefraværshistorikk[]
): SammenligningOverFlereKvartaler => {
    console.log(historikkListe);

    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(historikkListe);
    const kvartaler = beregnHvilkeÅrstallOgKvartalerSomSkalVises(historikkListe);
    const sammenligningSiste4Kvartaler = kvartalsvisSammenligning.slice(
        kvartaler.length - 4,
        kvartaler.length
    );

    const sammenligningSiste4KvartalerForVirksomhet: Sykefraværsprosent[] = sammenligningSiste4Kvartaler.map(
        (sammenligning) => sammenligning.virksomhet
    );
    console.log(sammenligningSiste4KvartalerForVirksomhet);

    const sammenligningSiste4KvartalerForOverordnetEnhet: Sykefraværsprosent[] = sammenligningSiste4Kvartaler.map(
        (sammenligning) => sammenligning.overordnetEnhet
    );
    const sammenligningSiste4KvartalerForSektor: Sykefraværsprosent[] = sammenligningSiste4Kvartaler.map(
        (sammenligning) => sammenligning.sektor
    );
    const sammenligningSiste4KvartalerForLand: Sykefraværsprosent[] = sammenligningSiste4Kvartaler.map(
        (sammenligning) => sammenligning.land
    );
    const sammenligningSiste4KvartalerForNæringEllerBransje: Sykefraværsprosent[] = sammenligningSiste4Kvartaler.map(
        (sammenligning) => sammenligning.næringEllerBransje
    );

    return {
        kvartaler: sammenligningSiste4Kvartaler.map((sammenligning) => ({
            årstall: sammenligning.årstall,
            kvartal: sammenligning.kvartal,
        })),
        virksomhet: summerSykefraværsprosent(sammenligningSiste4KvartalerForVirksomhet),
        overordnetEnhet: summerSykefraværsprosent(sammenligningSiste4KvartalerForOverordnetEnhet),
        sektor: summerSykefraværsprosent(sammenligningSiste4KvartalerForSektor),
        land: summerSykefraværsprosent(sammenligningSiste4KvartalerForLand),
        næringEllerBransje: summerSykefraværsprosent(
            sammenligningSiste4KvartalerForNæringEllerBransje
        ),
    };
};

const Sammenligningspanel: FunctionComponent<Props> = (props) => {
    const restSykefraværshistorikk = props.restSykefraværshistorikk;
    const restStatus = restSykefraværshistorikk.status;
    const laster = restStatus === RestStatus.LasterInn || restStatus === RestStatus.IkkeLastet;

    let labels: HistorikkLabels | any = {};
    let sammenligningSisteKvartaler: KvartalsvisSammenligning | any = {};
    let harBransje = undefined;
    let skalViseOverordnetEnhet = undefined;

    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const historikkListe = restSykefraværshistorikk.data;
        labels = getHistorikkLabels(historikkListe);
        sammenligningSisteKvartaler = getSammenligningFor4SisteKvartaler(historikkListe);
        harBransje = historikkHarBransje(historikkListe);
        skalViseOverordnetEnhet = historikkHarOverordnetEnhet(historikkListe);
    }

    const { årstall, kvartal } = sammenligningSisteKvartaler;

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
                        Legemeldt sykefravær i {kvartal}. kvartal {årstall}
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
