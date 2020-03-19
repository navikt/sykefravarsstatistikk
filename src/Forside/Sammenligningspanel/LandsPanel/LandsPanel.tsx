import React, { FunctionComponent } from 'react';
import { ReactComponent as SektorSvg } from '../Sektor.svg';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import SammenligningsIkon from '../SammenligningsIkon';
import { SykefraværshistorikkType } from '../../../api/sykefraværshistorikk';

const LandsPanel: FunctionComponent<SykefraværprosentpanelProps> = props => {
    return (
        <Sykefraværsprosentpanel
            laster={props.laster}
            sykefraværprosentLabel={props.sykefraværprosentLabel}
            sykefraværsprosent={props.sykefraværsprosent}
            ikon={<SammenligningsIkon label={SykefraværshistorikkType.LAND} />}
            className={props.className}
        />
    );
};
export default LandsPanel;
