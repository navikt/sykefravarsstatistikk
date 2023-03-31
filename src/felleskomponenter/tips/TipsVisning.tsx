import React, { FunctionComponent } from 'react';
import './TipsVisning.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import EksternLenke from '../EksternLenke/EksternLenke';
import { Tidsbruk } from './Tidsbruk/Tidsbruk';
import { TipsBilde } from './TipsBilde/TipsBilde';
import { Tips } from './tips';
import classNames from 'classnames';
import VarDetteRelevant from '../VarDetteRelevant/VarDetteRelevant';

interface Props {
    tips: Tips | null;
    className?: string;
}

export const TipsVisning: FunctionComponent<Props> = ({ tips, className }) => {
    if (tips === null) return null;
    return (
        <div className={classNames('tips-visning', className)}>
            <TipsBilde src={tips.img.src} alt={tips.img.alt} />
            <div className="tips-visning__tekst-wrapper">
                <div>
                    <Undertittel className="tips-visning__tittel" tag="p">
                        <EksternLenke href={tips.href}>{tips.tittel}</EksternLenke>
                    </Undertittel>
                    <Normaltekst tag="div">{tips.ingress}</Normaltekst>
                </div>
                {tips.tidsbruk && (
                    <Tidsbruk className="tips-visning__tidsbruk">{tips.tidsbruk}</Tidsbruk>
                )}
                <VarDetteRelevant tipsID={tips.id} />
            </div>
        </div>
    );
};
