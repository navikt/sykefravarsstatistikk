import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningIngress.less';

export const SammenligningIngress: FunctionComponent<{
    harBransje: boolean;
}> = ({ harBransje }) => {
    const bransjeEllerNæringTekst = harBransje ? 'bransje' : 'næring';
    return (
        <div className="sammenligning-ingress">
            <Systemtittel tag="h2" className="sammenligning-ingress__tittel">
                Hvor er ditt potensial?
            </Systemtittel>
            <Normaltekst>
                Du kan få hjelp til å forstå det ved å sammenligne deg med andre i din{' '}
                {bransjeEllerNæringTekst}. Vi har laget en oversikt for deg.
            </Normaltekst>
        </div>
    );
};
