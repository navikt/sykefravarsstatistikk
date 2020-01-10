import * as React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './Sykefraværsprosentpanel.less';
import { Sykefraværprosent } from '../../../SammenligningProvider';
import Skeleton from 'react-loading-skeleton';

export interface SykefraværprosentpanelProps {
    sykefraværprosent?: Sykefraværprosent;
    laster: boolean;
}

export const formaterProsent = (prosent: number): string => {
    return Number(prosent)
        .toFixed(1)
        .toString()
        .replace('.', ',');
};

const Sykefraværsprosentpanel: React.FunctionComponent<SykefraværprosentpanelProps> = props => {
    const { sykefraværprosent, laster, children } = props;

    if (!sykefraværprosent) {
        return null;
    }

    const tekst = (
        <div className="sykefravarsprosentpanel__innhold">
            {children && <Element tag="div">{children}</Element>}
            <Normaltekst>{sykefraværprosent.label}</Normaltekst>
        </div>
    );

    const prosent = (
        <Undertittel className="sykefravarsprosentpanel__prosent">
            {formaterProsent(sykefraværprosent.prosent!)}&nbsp;%
        </Undertittel>
    );

    const innhold = (
        <>
            {prosent}
            {tekst}
        </>
    );

    const innholdLaster = (
        <div className="sykefravarsprosentpanel__lasting">
            <Skeleton height={40} />
        </div>
    );

    return <div className="sykefravarsprosentpanel">{laster ? innholdLaster : innhold}</div>;
};

export default Sykefraværsprosentpanel;
