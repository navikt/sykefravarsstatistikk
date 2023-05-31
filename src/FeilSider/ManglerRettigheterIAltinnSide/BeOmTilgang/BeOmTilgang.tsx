import React, { FunctionComponent } from 'react';
import { LinkPanel, BodyLong, Heading } from "@navikt/ds-react";
import { ReactComponent as AltinnLogo } from './altinn-logo.svg';
import './BeOmTilgang.less';
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
                        <Heading className="be-om-tilgang__tittel" size="small" as="span">
                            Be om tilgang i Altinn
                        </Heading>
                        <BodyLong as="span">
                            Gå til Altinn og be om tilgang til tjenesten. Du kan velge hvem i
                            virksomheten som får forespørselen.
                        </BodyLong>
                    </span>
                </span>
            </LinkPanel.Title>
        </LinkPanel>
    );
};
