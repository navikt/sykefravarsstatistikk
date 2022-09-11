import React, { FunctionComponent } from 'react';

interface Props {
    prosent: string | null | undefined;
    strong?: boolean;
}

export const Prosent: FunctionComponent<Props> = ({ prosent, strong }) => {
    const prosentErTall = prosent !== null && prosent !== undefined;
    const formatertProsent = prosentErTall ? prosent : '—';
    if (strong) {
        return <strong>{formatertProsent}&nbsp;%</strong>;
    } else {
        return <>{formatertProsent}&nbsp;%</>;
    }
};
