import { BASE_PATH } from '../server/konstanter';
import { defaultSammenligning, RestSammenligning, RestSammenligningStatus } from './sammenligning';

const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;

const getRestSammenligningStatus = (responseStatus: number): RestSammenligningStatus => {
    switch (responseStatus) {
        case 200: {
            return RestSammenligningStatus.Suksess;
        }
        case 401: {
            return RestSammenligningStatus.IkkeInnlogget;
        }
        case 403: {
            return RestSammenligningStatus.HarIkkeRettigheterIAltinn;
        }
        default: {
            return RestSammenligningStatus.Error;
        }
    }
};

export const hentRestSammenligning = async (orgnr: string): Promise<RestSammenligning> => {
    const response = await fetch(sammenligningPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });

    const restSammenligningStatus = getRestSammenligningStatus(response.status);

    if (restSammenligningStatus === RestSammenligningStatus.Suksess) {
        let json = await response.json();
        return {
            status: restSammenligningStatus,
            sammenligning: json,
        };
    } else {
        return {
            status: restSammenligningStatus,
            sammenligning: defaultSammenligning,
        };
    }
};
