import { getRestStatus, RestRessurs, RestStatus } from './api-utils';

export const KURSOVERSIKT_API_PATH = '/kursoversikt/api/sfkurs';

interface KursDto {
    RegistrationID: number;
    Title: string;
    RegistrationUrl: string;
    RegistrationImageMediaStorageID: number;
    FrontImageMediaStorageID: number;
    CatalogListMediaStorageID: number | null;
    RegistrationFromDateTime: string;
    RegistrationToDateTime: string;
    RegistrationDeadline: string;
    RegistrationPlaceName: string;
    DescriptionInternal: string;
    CatalogText: string;
    Description: string;
    FrontPageDescription: string;
    ActiveWeb: number;
    ShowRegistrationForm: number;
    ShowInActivityList: number;
    configurable_custom: null | {
        Fylke: string;
        'Type kurs': string;
        Tema: string;
    };
}

export interface Kurs {
    id: number;
    tittel: string;
    tema?: string;
    type?: string;
    start: Date;
    slutt: Date;
    påmeldingsfrist: Date;
}

export type RestKursliste = RestRessurs<Kurs[]>;

const mapTilKurs = (kursDto: KursDto): Kurs => ({
    id: kursDto.RegistrationID,
    tittel: kursDto.Title,
    tema: kursDto.configurable_custom?.Tema,
    type: kursDto.configurable_custom?.['Type kurs'],
    start: new Date(kursDto.RegistrationFromDateTime),
    slutt: new Date(kursDto.RegistrationToDateTime),
    påmeldingsfrist: new Date(kursDto.RegistrationDeadline),
});

export const hentRestKurs = async (): Promise<RestKursliste> => {
    console.log(KURSOVERSIKT_API_PATH);
    const response = await fetch(KURSOVERSIKT_API_PATH);
    const restStatus = getRestStatus(response.status);

    if (restStatus === RestStatus.Suksess) {
        try {
            const kursliste: Kurs[] = ((await response.json()) as KursDto[]).map((kursDto) =>
                mapTilKurs(kursDto)
            );

            return {
                status: RestStatus.Suksess,
                data: kursliste,
            };
        } catch (error) {
            return { status: RestStatus.Feil };
        }
    }
    return { status: RestStatus.Feil };
};
