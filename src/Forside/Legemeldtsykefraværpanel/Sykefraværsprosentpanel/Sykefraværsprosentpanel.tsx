import * as React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import './Sykefraværsprosentpanel.less';
import { Sykefraværprosent } from '../../../SammenligningProvider';

interface Props {
    sykefraværprosent: Sykefraværprosent | null;
}

export const formaterProsent = (prosent: number): string => {
    return Number(prosent)
        .toFixed(1)
        .toString()
        .replace('.', ',');
};

const Sykefraværsprosentpanel: React.FunctionComponent<Props> = props => {
    if (!props.sykefraværprosent) {
        return null;
    }
    const {prosent, label} = props.sykefraværprosent;
    return (
        <div className="sykefravarsprosentpanel">
            <Element>{formaterProsent(prosent)}&nbsp;%</Element>
            <Normaltekst className="sykefravarsprosentpanel__label">{label}</Normaltekst>
        </div>
    );
};

export default Sykefraværsprosentpanel;
