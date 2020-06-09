import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

export const ForFåAnsatteAlertStripe: FunctionComponent = () => (
    <AlertStripeInfo className="sammenligningspanel__alertstripe">
        <Element className="sammenligningspanel__alertstripe-tittel">
            Kan ikke vise all sykefraværsstatistikken av hensyn til personvern
        </Element>
        <Normaltekst>
            Det er for få ansatte i virksomheten til at vi kan vise sykefraværsstatistikken for din
            virksomhet. Med fire eller færre ansatte vil det være mulig å identifisere enkelte
            sykemeldte. Du kan fortsatt se statistikk om næring, sektor og land.
        </Normaltekst>
    </AlertStripeInfo>
);
