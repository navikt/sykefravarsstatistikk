import React, { FunctionComponent } from 'react';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { ReactComponent as AltinnLogo } from './altinn-logo.svg';
import './BeOmTilgang.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

export const BeOmTilgang: FunctionComponent = () => (
    <Lenkepanel border tittelProps="normaltekst" href={'/hei'}>
        <span className="be-om-tilgang">
            <span className="be-om-tilgang__svg">
                <AltinnLogo />
            </span>
            <span className="be-om-tilgang__tekst">
                <Undertittel tag="span" className="be-om-tilgang__tittel">
                    Be om tilgang i Altinn
                </Undertittel>
                <Normaltekst tag="span">
                    Gå til Altinn og be om tilgang til tjenesten. Du kan velge hvem i virksomheten
                    som for forespørselen.
                </Normaltekst>
            </span>
        </span>
    </Lenkepanel>
);
