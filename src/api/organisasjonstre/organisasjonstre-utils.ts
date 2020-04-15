import {
    hentAltinnOrganisasjonerBrukerHarTilgangTil,
    hentJuridiskeEnheter,
} from './organisasjonstre-api';
import { RestRessurs, RestStatus } from '../api-utils';
import * as Sentry from '@sentry/browser';

export interface AltinnOrganisasjon {
    Name: string;
    Type: string;
    OrganizationNumber: string;
    OrganizationForm: string;
    Status: string;
    ParentOrganizationNumber: string;
}

export interface Organisasjon {
    navn: string;
    orgnr: string;
    harTilgang?: boolean;
}
export interface JuridiskEnhetMedUnderenheter {
    juridiskEnhet: Organisasjon;
    underenheter: Organisasjon[];
}

export type Organisasjonstre = JuridiskEnhetMedUnderenheter[];

export const finnOrgnumreTilManglendeJuridiskeEnheter = (
    altinnOrganisasjoner: AltinnOrganisasjon[]
): string[] => {
    const orgnumreBrukerHarTilgangTil = altinnOrganisasjoner.map(org => org.OrganizationNumber);

    const harBrukerTilgang = (orgnr: string) => {
        return orgnumreBrukerHarTilgangTil.includes(orgnr);
    };

    const fjernDupliserteOrgnumre = (orgnumre: string[]): string[] => {
        return orgnumre.filter((orgnr, index) => orgnumre.indexOf(orgnr) === index);
    };

    const juridiskeEnheterBrukerIkkeHarTilgangTil: string[] = altinnOrganisasjoner
        .map(org => org.ParentOrganizationNumber)
        .filter(orgnr => orgnr !== null)
        .filter(orgnr => !harBrukerTilgang(orgnr!)) as string[];

    return fjernDupliserteOrgnumre(juridiskeEnheterBrukerIkkeHarTilgangTil);
};

export const hentAltinnOrganisasjoner = async (): Promise<RestRessurs<AltinnOrganisasjon[]>> => {
    try {
        const altinnOrganisasjoner = await hentAltinnOrganisasjonerBrukerHarTilgangTil();
        return {
            status: RestStatus.Suksess,
            data: altinnOrganisasjoner,
        };
    } catch (error) {
        Sentry.captureException(error);
        return { status: error.status || RestStatus.Feil };
    }
};
