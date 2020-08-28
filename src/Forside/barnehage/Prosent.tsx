import React, { FunctionComponent } from 'react';
import { formaterProsent } from '../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';

interface Props {
    prosent: number | null | undefined;
    strong?: boolean;
}

export const Prosent: FunctionComponent<Props> = ({ prosent, strong }) => {
    const prosentErTall = prosent !== null && prosent !== undefined;
    const formatertProsent = prosentErTall ? formaterProsent(prosent) : '—';
    if (strong) {
        return <strong>{formatertProsent}&nbsp;%</strong>;
    } else {
        return <>{formatertProsent}&nbsp;%</>;
    }
};
