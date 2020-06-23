import { AltinnOrganisasjon, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { setUserProperties } from './amplitude';
import { useContext, useEffect } from 'react';
import { RestStatus } from '../api/api-utils';
import {
    altinnOrganisasjonerContext,
    altinnOrganisasjonerMedTilgangTilStatistikkContext,
} from '../utils/altinnOrganisasjonerContext';
import { tilSegmenteringAntallVirksomheter, tilTiendedeler } from './segmentering';

const hentAntallUnderenheterSegmentering = (
    organisasjoner: AltinnOrganisasjon[]
): string | undefined => {
    const antallUnderenheter = organisasjoner.filter(
        (org) => org.ParentOrganizationNumber && org.ParentOrganizationNumber.length > 0
    ).length;
    return tilSegmenteringAntallVirksomheter(antallUnderenheter);
};

export const useSetUserProperties = () => {
    const restOrganisasjoner = useContext<RestAltinnOrganisasjoner>(altinnOrganisasjonerContext);
    const restOrganisasjonerMedStatistikk = useContext<RestAltinnOrganisasjoner>(
        altinnOrganisasjonerMedTilgangTilStatistikkContext
    );
    useEffect(() => {
        if (restOrganisasjoner.status === RestStatus.Suksess) {
            const segmentering = hentAntallUnderenheterSegmentering(restOrganisasjoner.data);
            setUserProperties({
                tilgang_til_antall_underenheter: segmentering,
            });
        }
    }, [restOrganisasjoner]);

    useEffect(() => {
        if (
            restOrganisasjonerMedStatistikk.status === RestStatus.Suksess &&
            restOrganisasjoner.status === RestStatus.Suksess
        ) {
            const antallUnderenheter = restOrganisasjoner.data.length;
            const antallUnderenheterMedStatistikk = restOrganisasjonerMedStatistikk.data.length;

            setUserProperties({
                statistikktilgang_til_antall_underenheter: tilTiendedeler(
                    antallUnderenheterMedStatistikk,
                    antallUnderenheter
                ),
            });
        }
    }, [restOrganisasjonerMedStatistikk, restOrganisasjoner]);
};
