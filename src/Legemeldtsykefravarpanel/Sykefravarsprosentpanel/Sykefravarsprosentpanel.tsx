import * as React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import './Sykefravarsprosentpanel.less';

interface Props {
    label: string;
    prosent: number;
}

export const formaterProsent = (prosent: number): string => {
    return Number(prosent)
        .toFixed(1)
        .toString()
        .replace('.', ',');
};

const Sykefravarsprosentpanel: React.FunctionComponent<Props> = props => {
    return (
        <div className="sykefravarsprosentpanel">
            <Element>{formaterProsent(props.prosent)}&nbsp;%</Element>
            <Normaltekst className="sykefravarsprosentpanel__label">{props.label}</Normaltekst>
        </div>
    );
};

export default Sykefravarsprosentpanel;
