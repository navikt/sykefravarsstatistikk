import React, { FunctionComponent } from 'react';
import { Heading } from '@navikt/ds-react';

interface Props {
    prosent: string | null | undefined;
}

const norskDesimalFormat = (tall: string) => {
    return tall.replace('.', ',');
};

export const Prosent: FunctionComponent<Props> = ({ prosent }) => {
    const prosentErTall = prosent !== null && prosent !== undefined;
    const formatertProsent = norskDesimalFormat(prosentErTall ? prosent : '—');
    return (
        <Heading size="medium" as="p">
            <strong>{formatertProsent} %</strong>
        </Heading>
    );
};
