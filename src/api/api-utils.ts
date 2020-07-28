export enum RestStatus {
    IkkeLastet = 'IkkeLastet',
    LasterInn = 'LasterInn',
    Suksess = 'Suksess',
    IkkeInnlogget = 'IkkeInnlogget',
    IngenTilgang = 'IngenTilgang',
    Feil = 'Feil',
}

export interface IkkeLastet {
    status: RestStatus.IkkeLastet;
}

export interface LasterInn {
    status: RestStatus.LasterInn;
}

export interface IkkeInnlogget {
    status: RestStatus.IkkeInnlogget;
}

export interface IngenTilgang {
    status: RestStatus.IngenTilgang;
}

export interface Suksess<T> {
    status: RestStatus.Suksess;
    data: T;
}

export enum Årsak {
    INGEN_NÆRING = 'INGEN_NÆRING',
}

export interface Feil {
    status: RestStatus.Feil;
    causedBy?: Årsak;
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
