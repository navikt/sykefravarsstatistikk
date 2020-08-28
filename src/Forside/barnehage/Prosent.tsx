import React, { FunctionComponent } from 'react';
import { formaterProsent } from '../Sammenligningspanel/Paneler/Sykefraværsprosentpanel/Sykefraværsprosentpanel';

interface Props {
    prosent: number | null | undefined;
}

export const Prosent: FunctionComponent<Props> = ({ prosent }) => {
    const prosentErTall = prosent !== null && prosent !== undefined;
    const formatertProsent = prosentErTall ? formaterProsent(prosent) : '—';
    return <>{formatertProsent}&nbsp;%</>;
};
