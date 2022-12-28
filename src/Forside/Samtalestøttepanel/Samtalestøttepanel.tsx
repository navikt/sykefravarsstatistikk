import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import lampeSvg from './lampe.svg';
import { Lenkepanel } from '../../felleskomponenter/Lenkepanel/Lenkepanel';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';
import { getSamtalestøtteUrl } from '../../utils/miljøUtils';

const Samtalestøttepanel: FunctionComponent = () => {
    const urlMedReferer = `${getSamtalestøtteUrl()}?referer=${window.location.href}`;
    return (
        <Lenkepanel overskrift={'Forbered samtale med medarbeider!'} ikon={lampeSvg}>
            <Normaltekst>
                <p>
                    Samtaler rundt sykefravær kan være vanskelige. Vi har laget et verktøy for
                    arbeidsgivere for å gjøre det lettere å forberede seg.
                </p>
            </Normaltekst>
            <p>
                <EksternLenke href={urlMedReferer}>Gå til samtalestøtten</EksternLenke>
            </p>
        </Lenkepanel>
    );
};

export default Samtalestøttepanel;
