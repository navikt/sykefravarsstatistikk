import React, { FunctionComponent } from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { ReactComponent as AltinnLogo } from './altinn-logo.svg';
import './BeOmTilgang.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useOrgnr } from '../../../hooks/useOrgnr';

const beOmTilgangTilSykefraværsstatistikkIAltinnLink = (orgnr: string | undefined) =>
    'https://altinn.no/ui/DelegationRequest?offeredBy=' + orgnr + '&resources=3403_2';

export const BeOmTilgang: FunctionComponent = () => {
    const orgnr = useOrgnr();
    return (
        <LinkPanel border href={beOmTilgangTilSykefraværsstatistikkIAltinnLink(orgnr)}>
            <LinkPanel.Title>
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
            </LinkPanel.Title>
            {
                // TODO: sjekk at LinkPanel.Title og LinkPanel.Description er satt riktig,
                // transform kan ikke programatisk skille hva som skal være hva
                // hvis du brukte tittelprops eller linkCreator så er du nødt til å fikse opp dette selv da programatisk migrering der er utenfor scope.
            }
        </LinkPanel>
    );
};
