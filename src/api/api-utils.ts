import * as Sentry from '@sentry/browser';

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

export const fetchMedFeilhåndtering = async <T>(
    url: string,
    init?: RequestInit
): Promise<RestRessurs<T>> => {
  const response = await fetch(url, init);
  const restStatus = getRestStatus(response.status);

  if (restStatus === RestStatus.Suksess) {
    return {
      status: RestStatus.Suksess,
      data: (await response.json()) as T,
    };
  }
  if (restStatus === RestStatus.Feil) {
    Sentry.captureException(new Error('Status ' + response.status + ' ved kall til ' + url));

    try {
      const body = await response.json();

      const causedBy: string = body.causedBy;

      if (!!causedBy && Object.keys(Årsak).includes(causedBy)) {
        return {
          status: RestStatus.Feil,
          causedBy: Årsak[causedBy as keyof typeof Årsak],
        };
      }
    } catch (ignored) {
      // Ignored exception
    }
  }
  return {
    status: restStatus,
  };
};
