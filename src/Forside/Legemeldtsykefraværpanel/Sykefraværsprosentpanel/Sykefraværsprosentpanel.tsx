import * as React from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './Sykefraværsprosentpanel.less';
import { Sykefraværprosent } from '../../../SammenligningProvider';

export interface SykefraværprosentpanelProps {
    label?: string;
    sykefraværprosent: Sykefraværprosent;
}

export const formaterProsent = (prosent: number): string => {
    return Number(prosent)
        .toFixed(1)
        .toString()
        .replace('.', ',');
};

const Sykefraværsprosentpanel: React.FunctionComponent<SykefraværprosentpanelProps> = props => {
    const sykefraværprosent = props.sykefraværprosent;

    const skalViseLabel = !!props.label;

    const innhold = skalViseLabel ? (
        <div className="sykefravarsprosentpanel__innhold">
            <Element>{props.label}</Element>
            <Normaltekst>{sykefraværprosent.label}</Normaltekst>
        </div>
    ) : (
        <Normaltekst className="sykefravarsprosentpanel__innhold">
            {sykefraværprosent.label}
        </Normaltekst>
    );

    return (
        <div className="sykefravarsprosentpanel">
            <Systemtittel>{formaterProsent(sykefraværprosent.prosent!)}&nbsp;%</Systemtittel>
            {innhold}
        </div>
    );
};

export default Sykefraværsprosentpanel;
