import { getRestStatus, RestRessurs, RestStatus } from '../../api/api-utils';
import { OverordnetEnhet } from '../domene/enhet';

export type RestOverordnetEnhet = RestRessurs<OverordnetEnhet>;

interface InstitusjonellSektorkodeDto {
    kode: string;
    beskrivelse: string;
}

export interface OverordnetEnhetDto {
    organisasjonsnummer: string;
    institusjonellSektorkode: InstitusjonellSektorkodeDto;
}

export const hentInformasjonOmOverordnetEnhet = async (
    orgnr: string
): Promise<RestOverordnetEnhet> => {
    const response = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`);
    const restStatus: RestStatus = getRestStatus(response.status);

    if (restStatus !== RestStatus.Suksess) {
        return {
            status: restStatus,
        };
    } else {
        const responseJson: OverordnetEnhetDto = await response.json();
        return {
            status: RestStatus.Suksess,
            data: {
                orgnr: responseJson.organisasjonsnummer,
                institusjonellSektorkode: {
                    kode: responseJson.institusjonellSektorkode?.kode,
                    beskrivelse: responseJson.institusjonellSektorkode?.beskrivelse,
                },
            },
        };
    }
};
