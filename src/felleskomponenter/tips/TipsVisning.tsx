import React, { FunctionComponent } from 'react';
import { Tips } from './tips';
import './TipsVisning.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import EksternLenke from '../EksternLenke/EksternLenke';
import { AntallMinutter } from './AntallMinutter/AntallMinutter';
import { TipsBilde } from './TipsBilde/TipsBilde';

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
                <AntallMinutter
                    className="tips-visning__tidsbruk"
                    antallMinutter={tips.antallMinutter}
                />
                <EksternLenke href={tips.lenke.href}>{tips.lenke.tekst}</EksternLenke>
            </div>
        </div>
    );
};
