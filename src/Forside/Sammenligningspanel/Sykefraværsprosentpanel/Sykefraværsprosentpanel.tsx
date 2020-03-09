import * as React from 'react';
import { Element, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './Sykefraværsprosentpanel.less';
import Skeleton from 'react-loading-skeleton';
import { Sykefraværsprosent } from '../../../api/sykefraværshistorikk';
import { ReactComponent as BedriftSvg } from '../Bedrift.svg';
import SammenligningsIkon from '../SammenligningsIkon';

export interface SykefraværprosentpanelProps {
    sykefraværsprosent?: Sykefraværsprosent;
    sykefraværprosentLabel?: string;
    laster: boolean;
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
    const { sykefraværsprosent, laster, sykefraværprosentLabel, children } = props;

    if (!laster && (!sykefraværsprosent || !sykefraværsprosent.prosent)) {
        return null;
    }
    console.log(props.sykefraværsprosent);
    const tekst = (
        <div className="sykefravarsprosentpanel__innhold">
            {children && <Element tag="div">{children}</Element>}
            <Normaltekst>{sykefraværprosentLabel}</Normaltekst>
        </div>
    );

    const prosent = !!sykefraværsprosent && (
        <Undertittel className="sykefravarsprosentpanel__prosent">
            {formaterProsent(sykefraværsprosent.prosent)}&nbsp;%
        </Undertittel>
    );

    const innhold = (
        <>
            {prosent}
            {tekst}
        </>
        /*
        <div className="test1">

            <Innholdstittel className="tittel1">13,1&nbsp;%</Innholdstittel>
            <div className="typo-element">Din virksomhet:</div>
            Flesk og fisk Oslo
        </div>
*/
    );

    const innholdLaster = (
        <div className="sykefravarsprosentpanel__lasting">
            <Skeleton height={40} />
        </div>
    );

    return (
        <div className="sykefravarsprosentpanel__med__logo">{laster ? innholdLaster : innhold}</div>
    );
};

export default Sykefraværsprosentpanel;
