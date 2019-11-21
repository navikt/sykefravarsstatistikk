import React, { FunctionComponent } from 'react';
import { DataErMaskertPanel } from './DataErMaskertPanel/DataErMaskertPanel';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';

export type MaskertSykefraværprosentpanelProps = SykefraværprosentpanelProps & {
    labelHvisMaskert: string;
};

const MaskertSykefraværprosentpanel: FunctionComponent<
    MaskertSykefraværprosentpanelProps
> = props => {
    const { sykefraværprosent, label, labelHvisMaskert } = props;

    if (sykefraværprosent.erMaskert) {
        return <DataErMaskertPanel label={labelHvisMaskert} />;
    } else {
        return <Sykefraværsprosentpanel label={label} sykefraværprosent={sykefraværprosent} />;
    }
};

export default MaskertSykefraværprosentpanel;
