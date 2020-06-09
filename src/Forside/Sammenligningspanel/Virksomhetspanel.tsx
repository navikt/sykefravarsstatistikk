import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from './Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import SammenligningsIkon from './SammenligningsIkon';
import { SykefraværshistorikkType } from '../../api/sykefraværshistorikk';

export const Virksomhetspanel: FunctionComponent<SykefraværprosentpanelProps> = ({
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
            ikon={<SammenligningsIkon label={SykefraværshistorikkType.VIRKSOMHET} />}
            className={className}
        >
            Din virksomhet:
        </Sykefraværsprosentpanel>
    );
};
