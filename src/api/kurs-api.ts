import { getRestStatus, RestRessurs, RestStatus } from "./api-utils";
import { getMiljø } from "../utils/miljøUtils";

const KURSOVERSIKT_API_ENDEPUNKT = '/kursoversikt/api/kurs';

export const KURSOVERSIKT_API_PATH =
    getMiljø() === 'dev-gcp'
        ? 'https://kursoversikt.dev.nav.no' + KURSOVERSIKT_API_ENDEPUNKT
        : 'https://arbeidsgiver.nav.no' + KURSOVERSIKT_API_ENDEPUNKT;

interface KursDto {
    Title: string;
    ShowInActivityList: number;
    RegistrationUrl: string;
    RegistrationToDateTime: string;
    RegistrationPlaceName: string;
    RegistrationID: string;
    RegistrationFromDateTime: string;
    RegistrationDeadline: string;
    NumberOfParticipants: number;
    MaxNumberOfParticipants: number;
    FrontPageDescription: string;
    Description: string;
    configurable_custom: {
        Underkategori: string | null;
        Type: string;
        Tema: string;
        Fylke: string | null;
    };
    AvailableSeats: number;
}

export interface Kurs {
    id: string;
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
    type: kursDto.configurable_custom?.Type,
    start: new Date(kursDto.RegistrationFromDateTime),
    slutt: new Date(kursDto.RegistrationToDateTime),
    påmeldingsfrist: new Date(kursDto.RegistrationDeadline),
});

export const hentRestKurs = async (): Promise<RestKursliste> => {
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
