import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import lampeSvg from './lampe.svg';
import PanelBase from 'nav-frontend-paneler';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { getSamtalestøtteUrl } from '../../utils/miljøUtils';
import { PaneltittelMedIkon } from '../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon';
import './Samtalestøttepanel.less';

export const Samtalestøttepanel: FunctionComponent = () => {
    const urlMedReferer = `${getSamtalestøtteUrl()}?referer=${window.location.href}`;
    return (
        <PanelBase className="samtalestøttepanel">
            <PaneltittelMedIkon src={lampeSvg} alt={'samtalestøtteikon'}>
                Forbered samtale med medarbeider!
            </PaneltittelMedIkon>
            <Normaltekst className="samtalestøttepanel__ingress">
                Samtaler rundt sykefravær kan være vanskelige. Vi har laget et verktøy for
                arbeidsgivere for å gjøre det lettere å forberede seg.
            </Normaltekst>
            <EksternLenke href={urlMedReferer}>
                Gå til samtalestøtten
            </EksternLenke>
        </PanelBase>
    );
};

export default Samtalestøttepanel;
