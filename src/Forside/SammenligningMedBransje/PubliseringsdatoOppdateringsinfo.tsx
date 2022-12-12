import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { formatterDatoMedMånedNavn } from '../../utils/app-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';

export const PubliseringsdatoOppdateringsinfo: FunctionComponent<{
    restPubliseringsdatoer: RestPubliseringsdatoer;
}> = ({ restPubliseringsdatoer }) => {
    if (restPubliseringsdatoer.status === RestStatus.Suksess) {
        const publiseringsdatoer = restPubliseringsdatoer.data;
        return (
            <div>
                <Normaltekst>
                    {`Sist oppdatert: ` +
                        formatterDatoMedMånedNavn(
                            new Date(publiseringsdatoer.sistePubliseringsdato)
                        )}
                </Normaltekst>
                <Normaltekst>
                    {isFinite(new Date(publiseringsdatoer.nestePubliseringsdato).getDate()) &&
                        `Neste oppdatering: ` +
                            formatterDatoMedMånedNavn(
                                new Date(publiseringsdatoer.nestePubliseringsdato)
                            )}
                </Normaltekst>
            </div>
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
