import React, { FunctionComponent, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefraværPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { RestSammenligningContext } from '../../SammenligningProvider';
import { RestSammenligning, RestSammenligningStatus } from '../../api/sammenligning';
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';
import MaskertSykefraværprosentpanel from './MaskertSykefraværprosentpanel/MaskertSykefraværprosentpanel';
import Skeleton from 'react-loading-skeleton';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

const LegemeldtSykefraværPanel: FunctionComponent = () => {
    const restSammenligning: RestSammenligning = useContext(RestSammenligningContext);
    const sammenligning = restSammenligning.sammenligning;
    const laster = restSammenligning.status === RestSammenligningStatus.LasterInn;

    const overskrift = laster ? (
        <Skeleton height={28} />
    ) : (
        <Systemtittel className="legemeldtsykefravarpanel__overskrift">
            Legemeldt sykefravær i {sammenligning.kvartal}. kvartal {sammenligning.årstall}
        </Systemtittel>
    );

    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                {overskrift}
                <MaskertSykefraværprosentpanel
                    sykefraværprosent={sammenligning.virksomhet}
                    labelHvisMaskert="Det er for få personer i datagrunnlaget til at vi kan vise sykefraværet."
                    labelHvisNull={`Vi kan ikke vise informasjon om sykefraværet til virksomheten din. Det kan være fordi det ikke er registrert sykefravær for virksomheten i ${sammenligning.kvartal}. kvartal ${sammenligning.årstall}.`}
                    laster={laster}
                >
                    Din virksomhet:
                </MaskertSykefraværprosentpanel>
                <Sykefraværsprosentpanel sykefraværprosent={sammenligning.næring} laster={laster}>
                    Næringen virksomheten tilhører:
                </Sykefraværsprosentpanel>
                <Sykefraværsprosentpanel sykefraværprosent={sammenligning.bransje} laster={laster}>
                    <div className="legemeldtsykefravarpanel__bransje-label">
                        Bransjen virksomheten tilhører:
                        <Hjelpetekst className="legemeldtsykefravarpanel__bransje-hjelpetekst">
                            Bransjen er definert i samsvar med bransjeprogrammene under IA-avtalen
                            2019–2022.
                        </Hjelpetekst>
                    </div>
                </Sykefraværsprosentpanel>
                <Sykefraværsprosentpanel sykefraværprosent={sammenligning.sektor} laster={laster}>
                    Sektoren virksomheten tilhører:
                </Sykefraværsprosentpanel>
                <Sykefraværsprosentpanel sykefraværprosent={sammenligning.land} laster={laster} />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefraværPanel;
