import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { getPeriodeMedDato } from '../../utils/app-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { BodyShort } from '@navikt/ds-react';

export const PeriodeForStatistikk: FunctionComponent<{
    restPubliseringsdatoer: RestPubliseringsdatoer;
}> = ({ restPubliseringsdatoer }) => {
    const status = restPubliseringsdatoer.status;
    if (status === RestStatus.Suksess) {
        return (
            <BodyShort size="small">
                {`Sykefraværsstatistikken er fra perioden ` +
                    getPeriodeMedDato(restPubliseringsdatoer.data.gjeldendePeriode)}
            </BodyShort>
        );
    } else if (status === RestStatus.IkkeLastet || status === RestStatus.LasterInn) {
        return <NavFrontendSpinner />;
    } else {
        return <BodyShort>{''}</BodyShort>;
    }
};
