import React, { FunctionComponent } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { BodyShort } from '@navikt/ds-react';
import { RestStatus } from "../api/api-utils";
import { getPeriodeMedDato } from "../utils/app-utils";
import { RestPubliseringsdatoer } from "../api/publiseringsdatoer-api";

export const PeriodeForStatistikk: FunctionComponent<{
    restPubliseringsdatoer: RestPubliseringsdatoer;
}> = ({ restPubliseringsdatoer }) => {
    const status = restPubliseringsdatoer.status;
    if (status === RestStatus.Suksess) {
        return (
            <BodyShort>
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
