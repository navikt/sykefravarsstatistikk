import React, { FunctionComponent } from 'react';
import { KvartalsvisSammenligning } from '../../../utils/sykefraværshistorikk-utils';
import { ForFåAnsatteAlertStripe } from '../ForFåAnsatteAlertStripe/ForFåAnsatteAlertStripe';

interface Props {
    sammenligningSisteKvartal: KvartalsvisSammenligning;
}

export const SammenligningspanelAlertStripe: FunctionComponent<Props> = ({
    sammenligningSisteKvartal,
}) => {
    const { virksomhet } = sammenligningSisteKvartal;
    const forFåAnsatte = virksomhet && virksomhet.erMaskert;
    const harIkkeData = !virksomhet;

    if (forFåAnsatte) {
        return <ForFåAnsatteAlertStripe />;
    }
    if (harIkkeData) {
    }
    return null;
};
