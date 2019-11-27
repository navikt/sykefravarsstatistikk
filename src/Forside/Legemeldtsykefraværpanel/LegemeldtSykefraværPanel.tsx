import React, { FunctionComponent, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefraværPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { Sammenligning, SammenligningContext } from '../../SammenligningProvider';
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';
import MaskertSykefraværprosentpanel from './MaskertSykefraværprosentpanel/MaskertSykefraværprosentpanel';

const LegemeldtSykefraværPanel: FunctionComponent = () => {
    const sammenligning: Sammenligning = useContext(SammenligningContext);

    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <Systemtittel className="legemeldtsykefravarpanel__overskrift">
                    Legemeldt sykefravær i {sammenligning.kvartal}. kvartal {sammenligning.år}
                </Systemtittel>
                <MaskertSykefraværprosentpanel
                    sykefraværprosent={sammenligning.virksomhet}
                    label="Din virksomhet:"
                    labelHvisMaskert="Det er for få ansatte i virksomheten til at vi kan vise sykefraværet"
                    labelHvisNull="gåkke det her"
                />
                <Sykefraværsprosentpanel
                    label="Næringen virksomheten tilhører:"
                    sykefraværprosent={sammenligning.næring}
                />
                {sammenligning.sektor && <Sykefraværsprosentpanel
                    label="Sektoren virksomheten tilhører:"
                    sykefraværprosent={sammenligning.sektor}
                />}
                <Sykefraværsprosentpanel sykefraværprosent={sammenligning.land} />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefraværPanel;
