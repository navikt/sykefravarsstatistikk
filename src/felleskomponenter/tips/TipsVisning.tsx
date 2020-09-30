import React, { FunctionComponent } from 'react';
import './TipsVisning.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import EksternLenke from '../EksternLenke/EksternLenke';
import { Tidsbruk } from './Tidsbruk/Tidsbruk';
import { TipsBilde } from './TipsBilde/TipsBilde';
import { Tips } from './tips';

interface Props {
    tips: Tips;
}

export const TipsVisning: FunctionComponent<Props> = ({ tips }) => {
    return (
        <div className="tips-visning">
            <TipsBilde src={tips.img.src} alt={tips.img.alt} />
            <div className="tips-visning__tekst-wrapper">
                <Undertittel className="tips-visning__tittel" tag="p">
                    {tips.tittel}
                </Undertittel>
                <Normaltekst>{tips.ingress}</Normaltekst>
                <Tidsbruk className="tips-visning__tidsbruk">{tips.tidsbruk}</Tidsbruk>

                <EksternLenke href={tips.lenke.href}>{tips.lenke.tekst}</EksternLenke>
            </div>
        </div>
    );
};
