import React, { FunctionComponent } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { BodyShort } from '@navikt/ds-react';
import { RestStatus } from '../api/api-utils';
import { formatterDatoMedMånedNavn } from '../utils/app-utils';
import { RestPubliseringsdatoer } from '../api/publiseringsdatoer-api';

export const PubliseringsdatoOppdateringsinfo: FunctionComponent<{
    restPubliseringsdatoer: RestPubliseringsdatoer;
}> = ({ restPubliseringsdatoer }) => {
    if (restPubliseringsdatoer.status === RestStatus.Suksess) {
        const publiseringsdatoer = restPubliseringsdatoer.data;
        return (
            <div>
                <BodyShort>
                    {`Sist oppdatert: ` +
                        formatterDatoMedMånedNavn(
                            new Date(publiseringsdatoer.sistePubliseringsdato)
                        )}
                </BodyShort>
                <BodyShort>
                    {isFinite(new Date(publiseringsdatoer.nestePubliseringsdato).getDate()) &&
                        `Neste oppdatering: ` +
                            formatterDatoMedMånedNavn(
                                new Date(publiseringsdatoer.nestePubliseringsdato)
                            )}
                </BodyShort>
            </div>
        );
    } else if (
        restPubliseringsdatoer.status === RestStatus.LasterInn ||
        restPubliseringsdatoer.status === RestStatus.IkkeLastet
    ) {
        return <NavFrontendSpinner />;
    } else {
        return <BodyShort>{''}</BodyShort>;
    }
};
