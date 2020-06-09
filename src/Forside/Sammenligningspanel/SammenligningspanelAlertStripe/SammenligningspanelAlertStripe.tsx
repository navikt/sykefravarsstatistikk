import React, { FunctionComponent } from 'react';
import { KvartalsvisSammenligning } from '../../../utils/sykefraværshistorikk-utils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './SammenligningspanelAlertStripe.less';
import { RestStatus } from '../../../api/api-utils';

interface Props {
    sammenligningSisteKvartal: KvartalsvisSammenligning;
    restStatus: RestStatus;
}

export const SammenligningspanelAlertStripe: FunctionComponent<Props> = ({
    sammenligningSisteKvartal,
    restStatus,
}) => {
    const { virksomhet } = sammenligningSisteKvartal;
    const forFåAnsatte = virksomhet && virksomhet.erMaskert;
    const harIkkeData = restStatus === RestStatus.Suksess && (!virksomhet || !virksomhet.prosent);

    if (forFåAnsatte) {
        return (
            <AlertStripeInfo className="sammenligning-alert">
                <Element className="sammenligning-alert__tittel">
                    Kan ikke vise all sykefraværsstatistikken av hensyn til personvern
                </Element>
                <Normaltekst>
                    Det er for få ansatte i virksomheten til at vi kan vise sykefraværsstatistikken
                    for din virksomhet. Med fire eller færre ansatte vil det være mulig å
                    identifisere enkelte sykemeldte. Du kan fortsatt se statistikk om næring, sektor
                    og land.
                </Normaltekst>
            </AlertStripeInfo>
        );
    }
    if (harIkkeData) {
        return (
            <AlertStripeInfo className="sammenligning-alert">
                <Element className="sammenligning-alert__tittel">
                    Kan ikke vise all sykefraværsstatistikk for din virksomhet
                </Element>
                <Normaltekst>
                    Vi finner ikke noe statistikk på virksomheten din. Det kan være fordi bedriften
                    nylig har blitt opprettet slik at vi ikke har noe tallgrunnlag. Statistikken
                    publiseres kvartalsvis.
                </Normaltekst>
            </AlertStripeInfo>
        );
    }
    return null;
};
