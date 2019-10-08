import {
    hentAltinnOrganisasjonerBrukerHarTilgangTil,
    hentJuridiskeEnheter,
    RestRessurs, RestStatus,
} from './organisasjonstre-api';

export interface AltinnOrganisasjon {
    Name: string;
    Type: string;
    OrganizationNumber: string;
    OrganizationForm: string;
    Status: string;
    ParentOrganizationNumber: string | null;
}

export interface Organisasjon {
    navn: string;
    orgnr: string;
    harTilgang?: boolean;
}

interface JuridiskEnhetMedUnderenheter {
    juridiskEnhet: Organisasjon;
    underenheter: Organisasjon[];
}

export type Organisasjonstre = JuridiskEnhetMedUnderenheter[];

export const hentOrganisasjonerOgGenererOrganisasjonstre = async (): Promise<RestRessurs<Organisasjonstre>> => {
    try {
        const altinnOrganisasjoner = await hentAltinnOrganisasjonerBrukerHarTilgangTil();
        const manglendeJuridiskeEnheter = await hentManglendeJuridiskeEnheter(altinnOrganisasjoner);
        return {
            status: RestStatus.Suksess,
            data: mapTilOrganisasjonstre(altinnOrganisasjoner, manglendeJuridiskeEnheter),
        };
    } catch (error) {
        return {
            status: RestStatus.Feil,
            error: 'Feil ved henting av organisasjonstre',
        }
    }
};

const plukkUtJuridiskeEnheter = (
    altinnOrganisasjoner: AltinnOrganisasjon[]
): AltinnOrganisasjon[] => {
    return altinnOrganisasjoner.filter(org => org.Type === 'Enterprise');
};

const mapTilOrganisasjon = (
    altinnOrganisasjon: AltinnOrganisasjon,
    harTilgang: boolean
): Organisasjon => {
    return {
        navn: altinnOrganisasjon.Name,
        orgnr: altinnOrganisasjon.OrganizationNumber,
        harTilgang: harTilgang,
    };
};

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

const hentManglendeJuridiskeEnheter = async (
    altinnOrganisasjoner: AltinnOrganisasjon[]
): Promise<Organisasjon[]> => {
    const manglendeOrgnumre: string[] = finnOrgnumreTilManglendeJuridiskeEnheter(
        altinnOrganisasjoner
    );
    return await hentJuridiskeEnheter(manglendeOrgnumre);
};

export const mapTilOrganisasjonstre = (
    altinnOrganisasjoner: AltinnOrganisasjon[],
    manglendeJuridiskeEnheter: Organisasjon[]
): Organisasjonstre => {
    const juridiskeEnheterMedTilgang = plukkUtJuridiskeEnheter(altinnOrganisasjoner).map(
        altinnOrganisasjon => mapTilOrganisasjon(altinnOrganisasjon, true)
    );

    const juridiskeEnheterUtenTilgang = manglendeJuridiskeEnheter.map(org => {
        return { ...org, harTilgang: false };
    });

    const hentUnderenheterTilhørendeJuridiskEnhet = (
        juridiskEnhet: Organisasjon
    ): Organisasjon[] => {
        return altinnOrganisasjoner
            .filter(
                altinnOrganisasjon =>
                    altinnOrganisasjon.ParentOrganizationNumber === juridiskEnhet.orgnr
            )
            .map(altinnOrganisasjon => mapTilOrganisasjon(altinnOrganisasjon, true));
    };

    const organisasjonstre: Organisasjonstre = [
        ...juridiskeEnheterUtenTilgang,
        ...juridiskeEnheterMedTilgang,
    ].map(juridiskEnhet => {
        return {
            juridiskEnhet: juridiskEnhet,
            underenheter: hentUnderenheterTilhørendeJuridiskEnhet(juridiskEnhet),
        };
    });

    return organisasjonstre;
};
