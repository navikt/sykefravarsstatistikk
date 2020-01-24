export enum RestStatus {
    IkkeLastet = 'IkkeLastet',
    LasterInn = 'LasterInn',
    Suksess = 'Suksess',
    IkkeInnlogget = 'IkkeInnlogget',
    IngenTilgang = 'IngenTilgang',
    Feil = 'Feil',
}

interface IkkeLastet {
    status: RestStatus.IkkeLastet;
}

interface LasterInn {
    status: RestStatus.LasterInn;
}

interface IkkeInnlogget {
    status: RestStatus.IkkeInnlogget;
}

interface IngenTilgang {
    status: RestStatus.IngenTilgang;
}

interface Suksess<T> {
    status: RestStatus.Suksess;
    data: T;
}

interface Feil {
    status: RestStatus.Feil;

}

export type RestRessurs<T> =
    | IkkeLastet
    | LasterInn
    | Suksess<T>
    | IkkeInnlogget
    | Feil
    | IngenTilgang;

export const getRestStatus = (responseStatus: number): RestStatus => {
    switch (responseStatus) {
        case 200: {
            return RestStatus.Suksess;
        }
        case 401: {
            return RestStatus.IkkeInnlogget;
        }
        case 403: {
            return RestStatus.IngenTilgang;
        }
        default: {
            return RestStatus.Feil;
        }
    }
};
