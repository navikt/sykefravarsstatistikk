import { AltinnOrganisasjon, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { setUserProperties } from './amplitude';
import { useContext, useEffect } from 'react';
import { RestStatus } from '../api/api-utils';
import {
    altinnOrganisasjonerContext,
    altinnOrganisasjonerMedTilgangTilStatistikkContext,
} from '../utils/altinnOrganisasjonerContext';

const hentAntallUnderenheter = (organisasjoner: AltinnOrganisasjon[]): string | number =>
    organisasjoner.filter((org) => org.OrganizationNumber && org.OrganizationNumber.length > 0)
        .length;

const setAntallUnderenheterUserProperty = (organisasjoner: AltinnOrganisasjon[]) =>
    setUserProperties({
        antallUnderenheter: hentAntallUnderenheter(organisasjoner),
    });

const setAntallUnderenheterMedTilgangTilStatistikkUserProperty = (
    organisasjoner: AltinnOrganisasjon[]
) =>
    setUserProperties({
        antallUnderenheterMedTilgangTilStatistikk: hentAntallUnderenheter(organisasjoner),
    });

export const useSetUserProperties = () => {
    const restOrganisasjoner = useContext<RestAltinnOrganisasjoner>(altinnOrganisasjonerContext);
    const restOrganisasjonerMedStatistikk = useContext<RestAltinnOrganisasjoner>(
        altinnOrganisasjonerMedTilgangTilStatistikkContext
    );
    useEffect(() => {
        if (restOrganisasjoner.status === RestStatus.Suksess) {
            setAntallUnderenheterUserProperty(restOrganisasjoner.data);
        }
    }, [restOrganisasjoner]);

    useEffect(() => {
        if (restOrganisasjonerMedStatistikk.status === RestStatus.Suksess) {
            setAntallUnderenheterMedTilgangTilStatistikkUserProperty(
                restOrganisasjonerMedStatistikk.data
            );
        }
    }, [restOrganisasjonerMedStatistikk]);
};
