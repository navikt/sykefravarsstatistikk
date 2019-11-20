import React, { FunctionComponent } from 'react';
import { DataErMaskertPanel } from './DataErMaskertPanel/DataErMaskertPanel';
import Sykefraværsprosentpanel, { SykefraværprosentpanelProps, } from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';

export type MaskertSykefraværprosentpanelProps = SykefraværprosentpanelProps & {
    labelHvisMaskert: string;
};

const MaskertSykefraværprosentpanel: FunctionComponent<MaskertSykefraværprosentpanelProps> = props => {
    const sykefravær = props.sykefraværprosent;
    if (!sykefravær || !sykefravær.prosent) {
        return null;
    }

    if (sykefravær.erMaskert) {
        return <DataErMaskertPanel label={props.labelHvisMaskert} />;
    } else {
        return <Sykefraværsprosentpanel label={props.label} sykefraværprosent={sykefravær} />;
    }
};

export default MaskertSykefraværprosentpanel;
