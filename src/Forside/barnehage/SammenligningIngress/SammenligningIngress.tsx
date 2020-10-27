import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningIngress.less';
import KoronaInfotekst from '../../Sammenligningspanel/KoronaInfotekst/KoronaInfotekst';

export const SammenligningIngress: FunctionComponent = () => {
    return (
        <div className="sammenligning-ingress">
            <KoronaInfotekst className="sammenligning-ingress__koronainfo" />
            <Systemtittel tag="h2" className="sammenligning-ingress__tittel">
                Hvor er ditt potensial?
            </Systemtittel>
            <Normaltekst>
                Du kan få hjelp til å forstå det ved å sammenligne deg med andre barnehager i Norge.
                Vi har laget en oversikt for deg.
            </Normaltekst>
            <Normaltekst className="sammenligning-ingress__tilbakemelding-tekst">
                Vi bruker tilbakemeldingsfunksjoner på siden for å gjøre tjenestene bedre.
                Tilbakemeldingene kan ikke knyttes til deg eller din virksomhet.
            </Normaltekst>
        </div>
    );
};
