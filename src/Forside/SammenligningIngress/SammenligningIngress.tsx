import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SammenligningIngress.less';
import { ArbeidsmiljøportalenBransje } from '../ArbeidsmiljøportalPanel/bransje-utils';

export const SammenligningIngress: FunctionComponent<{
    bransje?: ArbeidsmiljøportalenBransje;
    harBransje: boolean;
}> = ({ harBransje }) => {
    const bransjeEllerNæringTekst = harBransje ? 'bransje' : 'næring';
    return (
        <div className='sammenligning-ingress'>
            <Systemtittel tag='h2' className='sammenligning-ingress__tittel'>
                Hvor er ditt potensial?
            </Systemtittel>
            <Normaltekst>
                Du kan få hjelp til å forstå det ved å sammenligne deg med andre i din{' '}
                {bransjeEllerNæringTekst}. Vi har laget en oversikt for deg.
            </Normaltekst>
            <Normaltekst className="sammenligning-ingress__tilbakemelding-tekst">
                Vi bruker tilbakemeldingsfunksjoner på siden for å gjøre tjenestene bedre.
                Tilbakemeldingene kan ikke knyttes til deg eller din virksomhet.
            </Normaltekst>
        </div>
    );
};
