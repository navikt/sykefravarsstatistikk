import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { DataKanIkkeVisesPanel } from './DataKanIkkeVisesPanel/DataKanIkkeVisesPanel';

export type MaskertSykefraværprosentpanelProps = SykefraværprosentpanelProps & {
    labelHvisMaskert: string;
    labelHvisNull: string;
};

const MaskertSykefraværprosentpanel: FunctionComponent<
    MaskertSykefraværprosentpanelProps
> = props => {
    const { sykefraværprosent, label, labelHvisMaskert, labelHvisNull, laster } = props;

    if (sykefraværprosent.erMaskert) {
        return <DataKanIkkeVisesPanel label={labelHvisMaskert} />;
    } else if (sykefraværprosent.prosent === null) {
        return <DataKanIkkeVisesPanel label={labelHvisNull} />;
    } else {
        return (
            <Sykefraværsprosentpanel
                label={label}
                sykefraværprosent={sykefraværprosent}
                laster={laster}
            />
        );
    }
};

export default MaskertSykefraværprosentpanel;
