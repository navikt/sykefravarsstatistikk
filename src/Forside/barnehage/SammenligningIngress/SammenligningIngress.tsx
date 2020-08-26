import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningIngress.less';
import KoronaInfotekst from '../../Sammenligningspanel/KoronaInfotekst/KoronaInfotekst';

export const SammenligningIngress: FunctionComponent = () => {
    // TODO: Teksten her er ikke ferdig.
    return (
        <>
            <KoronaInfotekst className="sammenligning-ingress__koronainfo" />
            <Systemtittel tag="h2" className="sammenligning-ingress__tittel">
                Hvor er ditt potensial?
            </Systemtittel>
            <Normaltekst>
                Du kan få hjelp til å forstå det ved å sammenligne deg med andre barnehager i Norge.
                Vi har laget en oversikt for deg.
            </Normaltekst>
        </>
    );
};
