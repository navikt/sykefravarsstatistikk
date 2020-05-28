import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { DataKanIkkeVisesPanel } from './DataKanIkkeVisesPanel/DataKanIkkeVisesPanel';

export type MaskertSykefraværprosentpanelProps = SykefraværprosentpanelProps & {
    labelHvisMaskert: string;
    labelHvisUndefined: string;
};

const MaskertSykefraværprosentpanel: FunctionComponent<MaskertSykefraværprosentpanelProps> = props => {
    const {
        sykefraværsprosent,
        sykefraværprosentLabel,
        children,
        labelHvisMaskert,
        labelHvisUndefined,
        laster,
        ikon,
        className,
    } = props;

    if (!sykefraværsprosent) {
        return null;
    }

    if (sykefraværsprosent.erMaskert) {
        return <DataKanIkkeVisesPanel label={labelHvisMaskert} />;
    } else if (sykefraværsprosent.prosent === undefined) {
        return <DataKanIkkeVisesPanel label={labelHvisUndefined} />;
    } else {
        return (
            <Sykefraværsprosentpanel
                sykefraværsprosent={sykefraværsprosent}
                sykefraværprosentLabel={sykefraværprosentLabel}
                laster={laster}
                ikon={ikon}
                className={className}
            >
                {children}
            </Sykefraværsprosentpanel>
        );
    }
};

export default MaskertSykefraværprosentpanel;
