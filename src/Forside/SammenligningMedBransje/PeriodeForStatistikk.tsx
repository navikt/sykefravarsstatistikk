import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { getPeriodeMedDato } from '../../utils/app-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';

export const PeriodeForStatistikk: FunctionComponent<{
    restPubliseringsdatoer: RestPubliseringsdatoer;
}> = ({ restPubliseringsdatoer }) => {
    if (restPubliseringsdatoer.status === RestStatus.Suksess) {
        return (
            <Normaltekst>
                {`Sykefraværsstatistikken er fra perioden ` +
                    getPeriodeMedDato(restPubliseringsdatoer.data.gjeldendePeriode)}
            </Normaltekst>
        );
    } else if (
        restPubliseringsdatoer.status === RestStatus.IkkeLastet ||
        restPubliseringsdatoer.status === RestStatus.LasterInn
    ) {
        return <NavFrontendSpinner />;
    } else {
        return <Normaltekst>{''}</Normaltekst>;
    }
};
