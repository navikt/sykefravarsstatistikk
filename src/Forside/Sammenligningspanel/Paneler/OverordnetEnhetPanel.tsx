import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import SammenligningsIkon from './SammenligningsIkon/SammenligningsIkon';
import { SykefraværshistorikkType } from '../../../api/kvartalsvisSykefraværshistorikk';

export const OverordnetEnhetPanel: FunctionComponent<SykefraværprosentpanelProps> = ({
    sykefraværsprosent,
    sykefraværprosentLabel,
    laster,
    className,
}) => {
    return (
        <Sykefraværsprosentpanel
            sykefraværsprosent={sykefraværsprosent}
            sykefraværprosentLabel={sykefraværprosentLabel}
            laster={laster}
            ikon={<SammenligningsIkon label={SykefraværshistorikkType.OVERORDNET_ENHET} />}
            className={className}
        >
            Overordnet enhet:
        </Sykefraværsprosentpanel>
    );
};
