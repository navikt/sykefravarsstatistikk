import React, { FunctionComponent } from 'react';
import Sykefraværsprosentpanel, {
    SykefraværprosentpanelProps,
} from '../Sykefraværsprosentpanel/Sykefraværsprosentpanel';
import { DataKanIkkeVisesPanel } from './DataKanIkkeVisesPanel/DataKanIkkeVisesPanel';
import {Sykefraværprosent} from "../../../SammenligningProvider";

export type MaskertSykefraværprosentpanelProps = SykefraværprosentpanelProps & {
    labelHvisMaskert: string;
    labelHvisNull: string;
    sykefraværprosent: Sykefraværprosent;
};

const MaskertSykefraværprosentpanel: FunctionComponent<
    MaskertSykefraværprosentpanelProps
> = props => {
    const { sykefraværprosent, children, labelHvisMaskert, labelHvisNull, laster } = props;

    if (sykefraværprosent.erMaskert) {
        return <DataKanIkkeVisesPanel label={labelHvisMaskert} />;
    } else if (sykefraværprosent.prosent === null) {
        return <DataKanIkkeVisesPanel label={labelHvisNull} />;
    } else {
        return (
            <Sykefraværsprosentpanel
                sykefraværprosent={sykefraværprosent}
                laster={laster}
            >
                {children}
            </Sykefraværsprosentpanel>
        );
    }
};

export default MaskertSykefraværprosentpanel;
