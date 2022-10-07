import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { getPeriodeMedDato } from '../../utils/app-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';

export const PeriodeForBeskrivelse: FunctionComponent<{
    restPubliseringsdatoer: RestPubliseringsdatoer;
}> = ({ restPubliseringsdatoer }) => {
    if (restPubliseringsdatoer.status === RestStatus.Suksess) {
        return (
            <Normaltekst>
                {`Tallene er beregnet på sykefraværsstatistikk fra ` +
                    getPeriodeMedDato(restPubliseringsdatoer.data.gjeldendePeriode) +
                    ` (fire siste kvartaler).`}
            </Normaltekst>
        );
    } else if (
        restPubliseringsdatoer.status === RestStatus.LasterInn ||
        restPubliseringsdatoer.status === RestStatus.IkkeLastet
    ) {
        return <NavFrontendSpinner />;
    } else {
        return <Normaltekst>{''}</Normaltekst>;
    }
};
