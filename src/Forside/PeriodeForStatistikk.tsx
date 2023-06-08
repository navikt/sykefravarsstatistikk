import React, { FunctionComponent } from 'react';
import { BodyShort, Loader } from '@navikt/ds-react';
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
        return <Loader />;
    } else {
        return <BodyShort>{''}</BodyShort>;
    }
};
