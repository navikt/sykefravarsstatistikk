import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';

export interface AltinnOrganisasjon {
    Name: string;
    Type: string;
    OrganizationNumber: string;
    OrganizationForm: string;
    Status: string;
    ParentOrganizationNumber: string | null;
}

interface Organisasjon {
    navn: string;
    orgnr: string;
    harTilgang?: boolean; // TODO Denne er kanskje relevant
}

interface JuridiskEnhetMedUnderenheter {
    juridiskEnhet: Organisasjon;
    underenheter: Organisasjon[];
}

export type Organisasjonstre = JuridiskEnhetMedUnderenheter[];

const defaultOrganisasjonstre: Organisasjonstre = [];

export const OrganisasjonstreContext = React.createContext<Organisasjonstre>(
    defaultOrganisasjonstre
);

const hentAltinnOrganisasjonerBrukerHarTilgangTil = async (): Promise<AltinnOrganisasjon[]> => {
    // TODO Feilhåndtering
    const respons = await fetch('/test');
    return await respons.json();
};

const hentJuridiskeEnheter = async (orgnumre: string[]): Promise<Organisasjon[]> => {
    if (!orgnumre || orgnumre.length === 0) {
        return [];
    }
    // TODO Feilhåndtering
    const urlTilBrreg =
        'https://data.brreg.no/enhetsregisteret/api/enheter/?organisasjonsnummer=' +
        orgnumre.join(',');
    const respons = await fetch(urlTilBrreg);
    console.log('respons', respons);
    const responsJson = await respons.json();

    if (!responsJson._embedded) {
        return [];
    }

    return responsJson._embedded.enheter.map((juridiskEnhetFraBrreg: any) => {
        const organisasjon: Organisasjon = {
            navn: juridiskEnhetFraBrreg.navn,
            orgnr: juridiskEnhetFraBrreg.organisasjonsnummer,
        };
        return organisasjon;
    });
};

const plukkUtJuridiskeEnheter = (
    altinnOrganisasjoner: AltinnOrganisasjon[]
): AltinnOrganisasjon[] => {
    return altinnOrganisasjoner.filter(org => org.Type === 'Enterprise');
};

const mapTilOrganisasjoner = (altinnOrganisasjoner: AltinnOrganisasjon[]): Organisasjon[] => {
    return altinnOrganisasjoner.map(altinnOrganisasjon => {
        const org: Organisasjon = {
            navn: altinnOrganisasjon.Name,
            orgnr: altinnOrganisasjon.OrganizationNumber,
        };
        return org;
    });
};

export const finnOrgnumreTilJuridiskeEnheterSomBrukerIkkeHarTilgangTil = (
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

const genererOrganisasjonstre = async (
    altinnOrganisasjoner: AltinnOrganisasjon[]
): Promise<Organisasjonstre> => {
    const orgnrUtenTilgang: string[] = finnOrgnumreTilJuridiskeEnheterSomBrukerIkkeHarTilgangTil(
        altinnOrganisasjoner
    );
    const juridiskeEnheterUtenTilgang = await hentJuridiskeEnheter(orgnrUtenTilgang);
    const alleJuridiskeEnheter: Organisasjon[] = [
        ...mapTilOrganisasjoner(plukkUtJuridiskeEnheter(altinnOrganisasjoner)),
        ...juridiskeEnheterUtenTilgang,
    ];

    return alleJuridiskeEnheter.map(juridiskEnhet => {
        const underenheter = altinnOrganisasjoner.filter(
            altinnOrganisasjon =>
                altinnOrganisasjon.ParentOrganizationNumber === juridiskEnhet.orgnr
        );
        console.log(`juridisk enhet ${juridiskEnhet.orgnr} med underenheter ${underenheter.map(org=>org.OrganizationNumber)}`);
        const juridiskEnhetMedUnderenheter: JuridiskEnhetMedUnderenheter = {
            juridiskEnhet: juridiskEnhet,
            underenheter: mapTilOrganisasjoner(underenheter),
        };
        return juridiskEnhetMedUnderenheter;
    });
};

export const OrganisasjonstreProvider: FunctionComponent = props => {
    const [organisasjonstre, setOrganisasjonstre] = useState<Organisasjonstre>(
        defaultOrganisasjonstre
    );

    useEffect(() => {
        hentAltinnOrganisasjonerBrukerHarTilgangTil()
            .then(organisasjoner => genererOrganisasjonstre(organisasjoner))
            .then(organisasjonstre => {
                console.log(organisasjonstre);
                setOrganisasjonstre(organisasjonstre);
            });
    }, []);

    return (
        <OrganisasjonstreContext.Provider value={organisasjonstre}>
            {props.children}
        </OrganisasjonstreContext.Provider>
    );
};
