import React, { FunctionComponent } from 'react';
import './TipsVisning.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import EksternLenke from '../EksternLenke/EksternLenke';
import { Tidsbruk } from './Tidsbruk/Tidsbruk';
import { TipsBilde } from './TipsBilde/TipsBilde';
import { Tips } from './tips';
import classNames from 'classnames';

interface Props {
    tips: Tips;
    className?: string;
}

export const TipsVisning: FunctionComponent<Props> = ({ tips, className }) => {
    return (
        <div className={classNames('tips-visning', className)}>
            <TipsBilde src={tips.img.src} alt={tips.img.alt} />
            <div className="tips-visning__tekst-wrapper">
                <Undertittel className="tips-visning__tittel" tag="p">
                    <EksternLenke href={tips.href}>{tips.tittel}</EksternLenke>
                </Undertittel>
                <Normaltekst>{tips.ingress}</Normaltekst>
                {tips.tidsbruk && (
                    <Tidsbruk className="tips-visning__tidsbruk">{tips.tidsbruk}</Tidsbruk>
                )}
            </div>
        </div>
    );
};
