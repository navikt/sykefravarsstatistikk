import * as React from 'react';
import { Normaltekst, Element, Systemtittel } from 'nav-frontend-typografi';
import './Sykefraværsprosentpanel.less';
import { Sykefraværprosent } from '../../../SammenligningProvider';

interface Props {
    label?: string;
    sykefraværprosent: Sykefraværprosent | null;
}

export const formaterProsent = (prosent: number): string => {
    return Number(prosent)
        .toFixed(1)
        .toString()
        .replace('.', ',');
};

const Sykefraværsprosentpanel: React.FunctionComponent<Props> = props => {
    const sykefravær = props.sykefraværprosent;
    if (!sykefravær || !sykefravær.prosent) {
        return null;
    }

    return (
        <div className="sykefravarsprosentpanel">
            <Systemtittel>{formaterProsent(sykefravær.prosent)}&nbsp;%</Systemtittel>
            <div className="sykefravarsprosentpanel__innhold">
                {!!props.label && <Element>{props.label}</Element>}
                <Normaltekst>{sykefravær.label}</Normaltekst>
            </div>
        </div>
    );
};

export default Sykefraværsprosentpanel;
