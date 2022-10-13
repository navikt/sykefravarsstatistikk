import { tilIsoDatoMedUtcTimezoneUtenMillis } from '../utils/app-utils';
import { BASE_PATH } from '../konstanter';

export type Virksomhet = { orgnr: string };

export const sendteMetrikker: Virksomhet[] = [{ orgnr: '' }];

interface IaTjenesteMetrikk {
    orgnr: String;
    altinnRettighet: String;
    type: String;
    kilde: 'SYKEFRAVÆRSSTATISTIKK';
    tjenesteMottakkelsesdato: String;
}

export const sendIaTjenesteMetrikkMottatt = (orgnr?: string) => {
    console.log('lista over sendt bedrifter er nå ', sendteMetrikker);
    const iaTjenesteMetrikk = byggIaTjenesteMottattMetrikk(orgnr);
    console.log('Orgnummer: ', orgnr);
    console.log(
        'Er ia-tjeneste levert for bedrift? ',
        erIaTjenesterMetrikkerSendtForBedrift(orgnr ?? '')
    );
    if (orgnr !== undefined && !erIaTjenesterMetrikkerSendtForBedrift(orgnr)) {
        postIaTjenesteMetrikk(iaTjenesteMetrikk).then((isSent) => {
            if (isSent) {
                registrerLevertMetrikkForBedrift(orgnr);
                console.log(
                    'Registrerer IA-tjenestemetrikk; lista over sendt bedrifter er nå ',
                    sendteMetrikker
                );
            }
        });
    }
};

export const erIaTjenesterMetrikkerSendtForBedrift = (orgnr: string): boolean => {
    return sendteMetrikker.some((virksomhet) => virksomhet.orgnr === orgnr);
};

export const registrerLevertMetrikkForBedrift = (orgnr: string) => {
    sendteMetrikker.push({ orgnr: orgnr });
};

const getIaTjenesterMetrikkerUrl = () => {
    return `${BASE_PATH}/proxy/ia-tjenester-metrikker`;
};

const iaTjenesterMetrikkerAPI = `${getIaTjenesterMetrikkerUrl()}/innlogget/mottatt-iatjeneste`;

function byggIaTjenesteMottattMetrikk(nåværendeOrgnr?: string) {
    const iaTjenesteMetrikk: IaTjenesteMetrikk = {
        orgnr: nåværendeOrgnr ?? '',
        type: 'DIGITAL_IA_TJENESTE',
        kilde: 'SYKEFRAVÆRSSTATISTIKK',
        tjenesteMottakkelsesdato: tilIsoDatoMedUtcTimezoneUtenMillis(new Date()),
        altinnRettighet: 'SYKEFRAVÆRSSTATISTIKK_FOR_VIRKSOMHETER',
    };
    return iaTjenesteMetrikk;
}

export const postIaTjenesteMetrikk = async (iatjeneste: IaTjenesteMetrikk) => {
    const settings = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(iatjeneste),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    try {
        // @ts-ignore
        const fetchResponse = await fetch(`${iaTjenesterMetrikkerAPI}`, settings);
        const data = await fetchResponse.json();
        return data.status === 'created';
    } catch (e) {
        return false;
    }
};