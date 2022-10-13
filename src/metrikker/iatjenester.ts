import { tilIsoDatoMedUtcTimezoneUtenMillis } from '../utils/app-utils';
import { BASE_PATH } from '../konstanter';
import { Virksomhet } from './IaTjenesterMetrikkerContext';

interface IaTjenesteMetrikk {
    orgnr: String;
    altinnRettighet: String;
    type: String;
    kilde: 'SYKEFRAVÆRSSTATISTIKK';
    tjenesteMottakkelsesdato: String;
}

export const erIaTjenesterMetrikkerSendtForBedrift = (
    sendteMetrikker: [Virksomhet],
    orgnr: string
): boolean => {
    return sendteMetrikker.some((virksomhet) => virksomhet.orgnr === orgnr);
};

export const registrerLevertMetrikkForBedrift = (
    sendteMetrikker: [Virksomhet],
    orgnr: string
): [Virksomhet] => {
    sendteMetrikker.push({ orgnr: orgnr });
    return sendteMetrikker;
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

export const sendIaTjenesteMetrikk = async (iatjeneste: IaTjenesteMetrikk) => {
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

export const sendIaTjenesteMetrikkMottatt = (context: any, orgnr?: string) => {
    console.log('lista over sendt bedrifter er nå ', context.bedrifterSomHarSendtMetrikker);
    const iaTjenesteMetrikk = byggIaTjenesteMottattMetrikk(orgnr);
    console.log('Orgnummer: ', orgnr);
    console.log(
        'Er ia-tjeneste levert for bedrift? ',
        erIaTjenesterMetrikkerSendtForBedrift(context.bedrifterSomHarSendtMetrikker, orgnr ?? '')
    );
    if (
        orgnr !== undefined &&
        !erIaTjenesterMetrikkerSendtForBedrift(context.bedrifterSomHarSendtMetrikker, orgnr)
    ) {
        sendIaTjenesteMetrikk(iaTjenesteMetrikk).then((isSent) => {
            if (isSent) {
                context.setBedrifterSomHarSendtMetrikker(
                    registrerLevertMetrikkForBedrift(context, orgnr)
                );
                console.log(
                    'Registrerer IA-tjenestemetrikk; lista over sendt bedrifter er nå ',
                    context.bedrifterSomHarSendtMetrikker
                );
            }
        });
    }
};
