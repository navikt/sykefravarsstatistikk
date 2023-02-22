import React, { FunctionComponent } from 'react';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { ReactComponent as AltinnLogo } from './altinn-logo.svg';
import './BeOmTilgang.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useOrgnr } from '../../../hooks/useOrgnr';

const beOmTilgangTilSykefraværsstatistikkIAltinnLink = (orgnr: string | undefined) =>
    'https://altinn.no/ui/DelegationRequest?offeredBy=' + orgnr + '&resources=3403_2';

export const BeOmTilgang: FunctionComponent = () => {
    const orgnr = useOrgnr();
    return (
        <Lenkepanel
            border
            tittelProps="normaltekst"
            href={beOmTilgangTilSykefraværsstatistikkIAltinnLink(orgnr)}
        >
            <span className="be-om-tilgang">
                <span className="be-om-tilgang__svg">
                    <AltinnLogo />
                </span>
                <span className="be-om-tilgang__tekst">
                    <Undertittel tag="span" className="be-om-tilgang__tittel">
                        Be om tilgang i Altinn
                    </Undertittel>
                    <Normaltekst tag="span">
                        Gå til Altinn og be om tilgang til tjenesten. Du kan velge hvem i
                        virksomheten som får forespørselen.
                    </Normaltekst>
                </span>
            </span>
        </Lenkepanel>
    );
};
