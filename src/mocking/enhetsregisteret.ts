export const enhetsregisteretMockRespons = (
    orgnr: string,
    navn: string,
    overordnetEnhetOrgnr: string
) => {
    return {
        _embedded: {
            enheter: [
                {
                    organisasjonsnummer: orgnr,
                    navn: navn,
                    overordnetEnhet: overordnetEnhetOrgnr,
                },
            ],
        },
    };
};
