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
    const { prosent, label } = props.sykefraværprosent;
    return (
        <div className="sykefravarsprosentpanel">
            <Systemtittel>{formaterProsent(prosent!)}&nbsp;%</Systemtittel>
            <div className="sykefravarsprosentpanel__innhold">
                {!!props.label && <Element>{label}</Element>}
                <Normaltekst>{label}</Normaltekst>
            </div>
        </div>
    );
};

export default Sykefraværsprosentpanel;
