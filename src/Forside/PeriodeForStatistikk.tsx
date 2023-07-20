import React, { FunctionComponent } from 'react';
import { BodyShort, Loader } from '@navikt/ds-react';
import { RestStatus } from '../api/api-utils';
import { getPeriodeMedDato } from '../utils/app-utils';
import { RestPubliseringsdatoer } from '../api/publiseringsdatoer-api';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

export const PeriodeForStatistikk: FunctionComponent<{
    restPubliseringsdatoer: RestPubliseringsdatoer<{ gjeldendePeriode: ÅrstallOgKvartal }>;
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
