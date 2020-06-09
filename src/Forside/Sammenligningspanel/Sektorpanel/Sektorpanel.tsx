import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import SammenligningsIkon from '../SammenligningsIkon';
import { SykefraværshistorikkType } from '../../../api/sykefraværshistorikk';

const Sektorpanel: FunctionComponent<SykefraværprosentpanelProps> = props => {
    return (
        <Sykefraværsprosentpanel
            laster={props.laster}
            sykefraværprosentLabel={props.sykefraværprosentLabel}
            sykefraværsprosent={props.sykefraværsprosent}
            ikon={<SammenligningsIkon label={SykefraværshistorikkType.SEKTOR} />}
            className={props.className}
        >
            Sektor:
        </Sykefraværsprosentpanel>
    );
};
export default Sektorpanel;
