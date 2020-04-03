import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, { SykefraværprosentpanelProps } from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import SammenligningsIkon from '../SammenligningsIkon';
import { SykefraværshistorikkType } from '../../../api/sykefraværshistorikk';

const Landspanel: FunctionComponent<SykefraværprosentpanelProps> = props => {
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
export default Landspanel;
