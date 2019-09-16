import React, { FC, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Sykefraværprosent, SykefraværprosentContext } from './SykefraværprosentProvider';

export const Statistikk: FC = props => {
    const sykefraværprosent: Sykefraværprosent = useContext(SykefraværprosentContext);

    return <PanelBase border> land: {sykefraværprosent.land}% </PanelBase>;
};
