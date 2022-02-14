function createFetchStub(data: string) {
    // @ts-ignore
    return function fetchStub(input: RequestInfo, init?: RequestInit | undefined) {
        return new Promise<Response>((resolve) => {
            // @ts-ignore
            resolve({
                json: () =>
                    Promise.resolve({
                        data: data,
                    }),
            });
        });
    };
}

// OBS: Vi måte lage en dummy implementasjon av fetch (global) ettersom Jest ikke spiller bra sammen med node-fetch 3.1.1
// TODO: Når Jest kommer med en versjon som fungerer bra med node-fetch ^3.1.1, da kan vi fjerne denne
// Se: https://github.com/node-fetch/node-fetch/issues/1289
export function setupFetchSpy() {
    return jest
        .spyOn(global, 'fetch')
        .mockImplementation(
            createFetchStub('Ingen data nødvendig, vi tester ikke kurs-api response')
        );
}
