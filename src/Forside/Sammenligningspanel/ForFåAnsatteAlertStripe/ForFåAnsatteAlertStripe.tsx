import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Sykefraværsprosent } from '../../../api/sykefraværshistorikk';

interface Props {
    sykefraværVirksomhet: Sykefraværsprosent | undefined;
}

export const ForFåAnsatteAlertStripe: FunctionComponent<Props> = ({ sykefraværVirksomhet }) => {
    const skalViseAlert = sykefraværVirksomhet && sykefraværVirksomhet.erMaskert;
    if (!skalViseAlert) {
        return null;
    }
    return (
        <AlertStripeInfo className="sammenligningspanel__alertstripe">
            <Element className="sammenligningspanel__alertstripe-tittel">
                Kan ikke vise all sykefraværsstatistikken av hensyn til personvern
            </Element>
            <Normaltekst>
                Det er for få ansatte i virksomheten til at vi kan vise sykefraværsstatistikken for
                din virksomhet. Med fire eller færre ansatte vil det være mulig å identifisere
                enkelte sykemeldte. Du kan fortsatt se statistikk om næring, sektor og land.
            </Normaltekst>
        </AlertStripeInfo>
    );
};
