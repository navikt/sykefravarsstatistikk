import React, { FunctionComponent, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefraværPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { Sammenligning, SammenligningContext } from '../../SammenligningProvider';
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';
import { DataErMaskertPanel } from './DataErMaskertPanel/DataErMaskertPanel';

const LegemeldtSykefraværPanel: FunctionComponent = () => {
    const sammenligning: Sammenligning = useContext(SammenligningContext);

    let sykefraværVirksomhet;

    console.log(sammenligning);

    if (sammenligning.virksomhet && sammenligning.virksomhet.erMaskert) {
        sykefraværVirksomhet = (
            <DataErMaskertPanel label="Det er for få ansatte i virksomheten til at vi kan vise sykefraværet"/>
        );
    } else {
        sykefraværVirksomhet = (
            <Sykefraværsprosentpanel
                label={'Din virksomhet:'}
                sykefraværprosent={sammenligning.virksomhet}
            />
        );
    }

    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <Systemtittel className="legemeldtsykefravarpanel__overskrift">
                    Legemeldt sykefravær i {sammenligning.kvartal}. kvartal {sammenligning.år}
                </Systemtittel>
                {sykefraværVirksomhet}
                <Sykefraværsprosentpanel
                    label={'Næringen virksomheten tilhører:'}
                    sykefraværprosent={sammenligning.næring}
                />
                <Sykefraværsprosentpanel
                    label={'Sektoren virksomheten tilhører:'}
                    sykefraværprosent={sammenligning.sektor}
                />
                <Sykefraværsprosentpanel sykefraværprosent={sammenligning.land} />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefraværPanel;
