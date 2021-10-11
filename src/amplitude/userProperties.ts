import { AltinnOrganisasjon, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useContext, useEffect } from 'react';
import { RestStatus } from '../api/api-utils';
import {
    altinnOrganisasjonerContext,
    altinnOrganisasjonerMedTilgangTilStatistikkContext,
} from '../utils/altinnOrganisasjonerContext';
import { AntallVirksomheterSegmentering, tilSegmenteringAntallVirksomheter, tilTiendedeler } from './segmentering';
import { setUserProperties } from './client';

const hentAntallUnderenheter = (organisasjoner: AltinnOrganisasjon[]): number =>
    organisasjoner.filter(
        (org) => org.ParentOrganizationNumber && org.ParentOrganizationNumber.length > 0,
    ).length;

export const useSetUserProperties = () => {
    const restOrganisasjoner = useContext<RestAltinnOrganisasjoner>(altinnOrganisasjonerContext);
    const restOrganisasjonerMedStatistikk = useContext<RestAltinnOrganisasjoner>(
        altinnOrganisasjonerMedTilgangTilStatistikkContext,
    );
    useEffect(() => {
        if (restOrganisasjoner.status === RestStatus.Suksess) {
            const segmentering: AntallVirksomheterSegmentering = tilSegmenteringAntallVirksomheter(
                hentAntallUnderenheter(restOrganisasjoner.data)
            );
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
            const antallUnderenheter = hentAntallUnderenheter(restOrganisasjoner.data);
            const antallUnderenheterMedStatistikk = hentAntallUnderenheter(
                restOrganisasjonerMedStatistikk.data
            );

            setUserProperties({
                statistikktilgang_til_antall_underenheter: tilTiendedeler(
                    antallUnderenheterMedStatistikk,
                    antallUnderenheter
                ),
            });
        }
    }, [restOrganisasjonerMedStatistikk, restOrganisasjoner]);
};
