import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import './VedlikeholdSide.less';
import Lenke from 'nav-frontend-lenker';


const VedlikeholdSide: React.FunctionComponent = () => {
    return (
        <div className="vedlikehold-side__wrapper">
            <div className="vedlikehold-side">
                <Alertstripe type="advarsel">
                    Din statistikk er ikke tilgjengelig nå.
                </Alertstripe>

                <Normaltekst className="vedlikehold-side__overskrift">
                    Vi forventer å vise statistikken igjen om noen timer.
                    Fra 3. juni endrer metoden for å beregne stillingsprosent i sykefraværsstatistikk seg og vi jobber med å oppdatere tallene.
                </Normaltekst>

                <Lenke
                    className="vedlikehold-side__lenke"
                    href="https://www.nav.no/no/nav-og-samfunn/statistikk/sykefravar-statistikk/relatert-informasjon/endringer-i-sykefravaersstatistikken-fra-og-med-1.kvartal-2021"
                >
                    Les mer om endringene på statistikksidene på nav.no.
                </Lenke>
            </div>
        </div>
    );
};

export default VedlikeholdSide;
