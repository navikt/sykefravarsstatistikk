import React, { FunctionComponent } from 'react';

interface Props {
    prosent: string | null | undefined;
    strong?: boolean;
}

const norskDesimalFormat = (tall: string) => {
    return tall.replace('.', ',');
};

export const Prosent: FunctionComponent<Props> = ({ prosent, strong }) => {
    const prosentErTall = prosent !== null && prosent !== undefined;
    const formatertProsent = norskDesimalFormat(prosentErTall ? prosent : '—');
    if (strong) {
        return <strong>{formatertProsent}&nbsp;%</strong>;
    } else {
        return <>{formatertProsent}&nbsp;%</>;
    }
};
