import React, { FunctionComponent } from 'react';
import { ReactComponent as SektorSvg } from '../Sektor.svg';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import SammenligningsIkon from '../SammenligningsIkon';
import { SykefraværshistorikkType } from '../../../api/sykefraværshistorikk';

const LandsPanel: FunctionComponent<SykefraværprosentpanelProps> = props => {
    return (
        <>
            <SammenligningsIkon label={SykefraværshistorikkType.LAND} />
            <Sykefraværsprosentpanel
                laster={props.laster}
                sykefraværprosentLabel={props.sykefraværprosentLabel}
                sykefraværsprosent={props.sykefraværsprosent}
            />
        </>
    );
};
export default LandsPanel;
