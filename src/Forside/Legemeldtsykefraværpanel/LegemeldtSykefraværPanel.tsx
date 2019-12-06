import React, { FunctionComponent, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefraværPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import {
    Sammenligning,
    SammenligningContext,
    RestSammenligningContext,
    RestSammenligning
} from '../../SammenligningProvider';
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';
import MaskertSykefraværprosentpanel from './MaskertSykefraværprosentpanel/MaskertSykefraværprosentpanel';

const LegemeldtSykefraværPanel: FunctionComponent = () => {
//    const sammenligning: Sammenligning = useContext(SammenligningContext);
    const restSammenligning: RestSammenligning = useContext(RestSammenligningContext);
    const sammenligning = restSammenligning.sammenligning;

    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <Systemtittel className="legemeldtsykefravarpanel__overskrift">
                    Legemeldt sykefravær i {sammenligning.kvartal}. kvartal {sammenligning.årstall}
                </Systemtittel>
                <MaskertSykefraværprosentpanel
                    sykefraværprosent={sammenligning.virksomhet}
                    label="Din virksomhet:"
                    labelHvisMaskert="Det er for få personer i datagrunnlaget til at vi kan vise sykefraværet."
                    labelHvisNull={`Vi kan ikke vise informasjon om sykefraværet til virksomheten din. Det kan være fordi det ikke er registrert sykefravær for virksomheten i ${
                        sammenligning.kvartal
                    }. kvartal ${sammenligning.årstall}.`}
                />
                <Sykefraværsprosentpanel
                    label="Næringen virksomheten tilhører:"
                    sykefraværprosent={sammenligning.næring}
                />
                {sammenligning.sektor && (
                    <Sykefraværsprosentpanel
                        label="Sektoren virksomheten tilhører:"
                        sykefraværprosent={sammenligning.sektor}
                    />
                )}
                <Sykefraværsprosentpanel sykefraværprosent={sammenligning.land} />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefraværPanel;

