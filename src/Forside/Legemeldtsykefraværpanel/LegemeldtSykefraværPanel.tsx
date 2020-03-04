import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefraværPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';
import MaskertSykefraværprosentpanel from './MaskertSykefraværprosentpanel/MaskertSykefraværprosentpanel';
import Skeleton from 'react-loading-skeleton';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { RestSykefraværshistorikk, SykefraværshistorikkType } from '../../api/sykefraværshistorikk';
import {
    getHistorikkLabels,
    HistorikkLabels,
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import { RestStatus } from '../../api/api-utils';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const getSammenligningForSisteKvartal = (
    restSykefraværshistorikk: RestSykefraværshistorikk
): KvartalsvisSammenligning | undefined => {
    if (restSykefraværshistorikk.status !== RestStatus.Suksess) {
        return undefined;
    }
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        restSykefraværshistorikk.data
    );
    kvartalsvisSammenligning.reverse();
    return kvartalsvisSammenligning[0];
};

const LegemeldtSykefraværPanel: FunctionComponent<Props> = props => {
    const restSykefraværshistorikk = props.restSykefraværshistorikk;
    const restStatus = restSykefraværshistorikk.status;
    const laster = restStatus === RestStatus.LasterInn || restStatus === RestStatus.IkkeLastet;

    let overskrift;
    let feilmelding;
    let harBransje = undefined;
    let labels: HistorikkLabels | any = {};
    const { virksomhet, næringEllerBransje, sektor, land, årstall, kvartal } =
        getSammenligningForSisteKvartal(restSykefraværshistorikk) || {};

    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        harBransje = !!restSykefraværshistorikk.data.find(
            historikk => historikk.type === SykefraværshistorikkType.BRANSJE
        );
        labels = getHistorikkLabels(restSykefraværshistorikk.data);
        overskrift = (
            <Systemtittel className="legemeldtsykefravarpanel__overskrift">
                Legemeldt sykefravær i {kvartal}. kvartal {årstall}
            </Systemtittel>
        );
    } else if (restStatus === RestStatus.IkkeLastet || restStatus === RestStatus.LasterInn) {
        overskrift = <Skeleton height={28} />;
    } else {
        feilmelding = (
            <AlertStripeFeil className="legemeldtsykefravarpanel__feilmelding">
                Kunne ikke vise sykefraværet.
            </AlertStripeFeil>
        );
    }

    const tekstForNæringEllerBransje = harBransje ? (
        <div className="legemeldtsykefravarpanel__bransje-label">
            Bransjen virksomheten tilhører:
            <Hjelpetekst className="legemeldtsykefravarpanel__bransje-hjelpetekst">
                Bransjen er definert i samsvar med bransjeprogrammene under IA-avtalen 2019–2022.
            </Hjelpetekst>
        </div>
    ) : (
        'Næringen virksomheten tilhører:'
    );

    let feilmeldingHvisTallForVirksomhetErUndefined =
        'Vi kan ikke vise informasjon om sykefraværet til virksomheten din.';
    if (kvartal !== undefined && årstall !== undefined) {
        feilmeldingHvisTallForVirksomhetErUndefined += ` Det kan være fordi det ikke er registrert sykefravær for virksomheten i ${kvartal}. kvartal ${årstall}.`;
    }

    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                {overskrift}
                {feilmelding}
                <MaskertSykefraværprosentpanel
                    sykefraværsprosent={virksomhet}
                    sykefraværprosentLabel={labels.virksomhet}
                    labelHvisMaskert="Det er for få personer i datagrunnlaget til at vi kan vise sykefraværet."
                    labelHvisUndefined={feilmeldingHvisTallForVirksomhetErUndefined}
                    laster={laster}
                >
                    Din virksomhet:
                </MaskertSykefraværprosentpanel>
                <Sykefraværsprosentpanel
                    sykefraværsprosent={næringEllerBransje}
                    sykefraværprosentLabel={labels.næringEllerBransje}
                    laster={laster}
                >
                    {tekstForNæringEllerBransje}
                </Sykefraværsprosentpanel>
                <Sykefraværsprosentpanel
                    sykefraværsprosent={sektor}
                    sykefraværprosentLabel={labels.sektor}
                    laster={laster}
                >
                    Sektoren virksomheten tilhører:
                </Sykefraværsprosentpanel>
                <Sykefraværsprosentpanel
                    sykefraværsprosent={land}
                    sykefraværprosentLabel={labels.land}
                    laster={laster}
                />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefraværPanel;
