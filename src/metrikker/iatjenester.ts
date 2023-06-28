import { BASE_PATH } from '../konstanter';

export type Virksomhet = { orgnr: string };

export const sendteMetrikker: Virksomhet[] = [{ orgnr: '' }];

interface IaTjenesteMetrikk {
    orgnr: string;
    type: string;
    kilde: 'SYKEFRAVÆRSSTATISTIKK';
}

export const sendIaTjenesteMetrikkMottatt = async (orgnr?: string): Promise<Virksomhet[]> => {
    const iaTjenesteMetrikk = byggIaTjenesteMottattMetrikk(orgnr);
    if (orgnr !== undefined && !erIaTjenesterMetrikkerSendtForBedrift(orgnr)) {
        const erSendt = await post(iaTjenesteMetrikk);
        if (erSendt) {
            sendteMetrikker.push({ orgnr: orgnr });
        }
    }
    return Promise.resolve(sendteMetrikker);
};

export const erIaTjenesterMetrikkerSendtForBedrift = (orgnr: string): boolean => {
    return sendteMetrikker.some((virksomhet) => virksomhet.orgnr === orgnr);
};

const getIaTjenesterMetrikkerUrl = () => {
    return `${BASE_PATH}/ia-tjenester-metrikker`;
};

export const iaTjenesterMetrikkerApiUrl = `${getIaTjenesterMetrikkerUrl()}/innlogget/mottatt-iatjeneste`;

function byggIaTjenesteMottattMetrikk(nåværendeOrgnr?: string) {
    const iaTjenesteMetrikk: IaTjenesteMetrikk = {
        orgnr: nåværendeOrgnr ?? '',
        type: 'DIGITAL_IA_TJENESTE',
        kilde: 'SYKEFRAVÆRSSTATISTIKK',
    };
    return iaTjenesteMetrikk;
}

const post = async (iatjeneste: IaTjenesteMetrikk) => {
    const settings: RequestInit = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(iatjeneste),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    try {
        const fetchResponse = await fetch(`${iaTjenesterMetrikkerApiUrl}`, settings);
        const data = await fetchResponse.json();
        return data.status === 'created';
    } catch (e) {
        return false;
    }
};
