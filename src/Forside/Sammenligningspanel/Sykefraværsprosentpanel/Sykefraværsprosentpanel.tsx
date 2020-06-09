import * as React from 'react';
import { ReactElement } from 'react';
import { Element, Normaltekst, Sidetittel, Innholdstittel } from 'nav-frontend-typografi';
import './Sykefraværsprosentpanel.less';
import Skeleton from 'react-loading-skeleton';
import { Sykefraværsprosent } from '../../../api/sykefraværshistorikk';
import classNames from 'classnames';

export interface SykefraværprosentpanelProps {
    sykefraværsprosent?: Sykefraværsprosent;
    sykefraværprosentLabel?: string;
    laster: boolean;
    ikon?: ReactElement;
    className?: string;
}

export const formaterProsent = (prosent: number | null | undefined): string => {
    if (prosent === undefined || prosent === null) {
        return '';
    }
    return Number(prosent)
        .toFixed(1)
        .toString()
        .replace('.', ',');
};

const Sykefraværsprosentpanel: React.FunctionComponent<SykefraværprosentpanelProps> = props => {
    const { sykefraværsprosent, laster, sykefraværprosentLabel, children, ikon, className } = props;

    if (!laster && (!sykefraværsprosent || !sykefraværsprosent.prosent)) {
        return null;
    }
    const tekst = (
        <div className="sykefravarsprosentpanel__innhold">
            {children && <Element tag="div">{children}</Element>}
            <Normaltekst>{sykefraværprosentLabel}</Normaltekst>
        </div>
    );

    const prosent = !!sykefraværsprosent && (
        <Innholdstittel className="sykefravarsprosentpanel__prosent">
            {formaterProsent(sykefraværsprosent.prosent)}&nbsp;%
        </Innholdstittel>
    );

    const innhold = (
        <div className="sykefravarsprosentpanel">
            {ikon}
            {prosent}

            {tekst}
        </div>
    );

    const innholdLaster = (
        <div className="sykefravarsprosentpanel__lasting">
            <Skeleton height={140} />
        </div>
    );

    return <div className={classNames(className)}>{laster ? innholdLaster : innhold}</div>;
};

export default Sykefraværsprosentpanel;
