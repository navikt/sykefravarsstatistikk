import React, { FunctionComponent, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import PanelBase from 'nav-frontend-paneler';
import './LegemeldtSykefraværPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import Sykefraværsprosentpanel from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { RestSammenligningContext } from '../../SammenligningProvider';
import {RestSammenligning, RestSammenligningStatus} from "../../api/sammenligningApi";
import { HvordanBeregnesTallene } from './HvordanBeregnesTallene/HvordanBeregnesTallene';
import MaskertSykefraværprosentpanel from './MaskertSykefraværprosentpanel/MaskertSykefraværprosentpanel';

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
                    label="Din virksomhet:"
                    labelHvisMaskert="Det er for få personer i datagrunnlaget til at vi kan vise sykefraværet."
                    labelHvisNull={`Vi kan ikke vise informasjon om sykefraværet til virksomheten din. Det kan være fordi det ikke er registrert sykefravær for virksomheten i ${
                        sammenligning.kvartal
                    }. kvartal ${sammenligning.årstall}.`}
                    laster={laster}
                />
                <Sykefraværsprosentpanel
                    label="Næringen virksomheten tilhører:"
                    sykefraværprosent={sammenligning.næring}
                    laster={laster}
                />
                {sammenligning.sektor && (
                    <Sykefraværsprosentpanel
                        label="Sektoren virksomheten tilhører:"
                        sykefraværprosent={sammenligning.sektor}
                        laster={laster}
                    />
                )}
                <Sykefraværsprosentpanel sykefraværprosent={sammenligning.land} laster={laster} />
                <HvordanBeregnesTallene />
            </div>
        </PanelBase>
    );
};

export default LegemeldtSykefraværPanel;
