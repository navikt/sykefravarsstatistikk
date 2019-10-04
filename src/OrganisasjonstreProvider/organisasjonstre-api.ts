import { AltinnOrganisasjon, Organisasjon } from './organisasjonstre-utils';

export const hentAltinnOrganisasjonerBrukerHarTilgangTil = async (): Promise<
    AltinnOrganisasjon[]
> => {
    try {
        const respons = await fetch(
            'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/api/organisasjoner'
        );
        return await respons.json();
    } catch (error) {
        return await Promise.reject(error);
    }
};

export const hentJuridiskeEnheter = async (orgnumre: string[]): Promise<Organisasjon[]> => {
    if (!orgnumre || orgnumre.length === 0) {
        return [];
    }
    const urlTilBrreg =
        'https://data.brreg.no/enhetsregisteret/api/enheter/?organisasjonsnummer=' +
        orgnumre.join(',');

    try {
        const respons = await fetch(urlTilBrreg).then(res => res.json());

        if (!respons._embedded) {
            return [];
        }

        return respons._embedded.enheter.map((juridiskEnhetFraBrreg: any) => {
            const organisasjon: Organisasjon = {
                navn: juridiskEnhetFraBrreg.navn,
                orgnr: juridiskEnhetFraBrreg.organisasjonsnummer,
            };
            return organisasjon;
        });
    } catch (error) {
        return await Promise.reject(error);
    }
};
