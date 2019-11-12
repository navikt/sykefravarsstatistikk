import React, { FunctionComponent, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefraværPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { Sammenligning, SammenligningContext } from '../../SammenligningProvider';
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';

const LegemeldtSykefraværPanel: FunctionComponent = () => {
    const sammenligning: Sammenligning = useContext(SammenligningContext);
    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <Systemtittel className="legemeldtsykefravarpanel__overskrift">
                    Legemeldt sykefravær i {sammenligning.kvartal}. kvartal {sammenligning.år}
                </Systemtittel>
                <Sykefraværsprosentpanel
                    sykefraværprosent={sammenligning.virksomhet}
                />
                <Sykefraværsprosentpanel
                    sykefraværprosent={sammenligning.næring}
                />
                <Sykefraværsprosentpanel
                    sykefraværprosent={sammenligning.sektor}
                />
                <Sykefraværsprosentpanel
                    sykefraværprosent={sammenligning.land}
                />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefraværPanel;
