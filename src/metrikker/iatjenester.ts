import { tilIsoDatoMedUtcTimezoneUtenMillis } from '../utils/app-utils';
import { BASE_PATH } from '../konstanter';
import { TjenestePerOrgnr } from './IaTjenesterMetrikkerContext';

interface IaTjenesteMetrikk {
    orgnr: String;
    altinnRettighet: String;
    type: String;
    tjenesteMottakkelsesdato: String;
}

export const erIaTjenesterMetrikkerSendtForBedrift = (
    orgnr: string,
    sendteMetrikker: [TjenestePerOrgnr]
): boolean => {
    return sendteMetrikker.some(
        (tjenestePerOrgnr) =>
            tjenestePerOrgnr.orgnr === orgnr && tjenestePerOrgnr.kilde === 'SYKEFRAVÆRSSTATISTIKK,'
    );
};

export const iaTjenesterMetrikkerErSendtForBedrift = (
    orgnr: string | undefined,
    sendteMetrikker: [TjenestePerOrgnr],
    kilde = 'SYKEFRAVÆRSSTATISTIKK'
): [TjenestePerOrgnr] => {
    if (
        orgnr !== undefined &&
        !sendteMetrikker.some(
            (tjenestePerOrgnr) =>
                tjenestePerOrgnr.orgnr === orgnr &&
                tjenestePerOrgnr.kilde === 'SYKEFRAVÆRSSTATISTIKK'
        )
    ) {
        sendteMetrikker.push({ orgnr: orgnr, kilde: kilde });
    }
    return sendteMetrikker;
};

const getIaTjenesterMetrikkerUrl = () => {
    return `${BASE_PATH}/proxy/ia-tjenester-metrikker`;
};

const iaTjenesterMetrikkerAPI = `${getIaTjenesterMetrikkerUrl()}/innlogget/mottatt-iatjeneste`;

function byggIaTjenesteMottattMetrikk(nåværendeOrgnr: string | undefined) {
    const iaTjenesteMetrikk: IaTjenesteMetrikk = {
        orgnr: nåværendeOrgnr ?? '',
        type: 'DIGITAL_IA_TJENESTE',
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

export const sendIaTjenesteMetrikkMottattEvent = (orgnr: string | undefined, context: any) => {
    const iaTjenesteMetrikk = byggIaTjenesteMottattMetrikk(orgnr);
    if (
        !erIaTjenesterMetrikkerSendtForBedrift(orgnr ?? '', context.bedrifterSomHarSendtMetrikker)
    ) {
        sendIaTjenesteMetrikk(iaTjenesteMetrikk).then((isSent) => {
            if (isSent) {
                context.setBedrifterSomHarSendtMetrikker(
                    iaTjenesterMetrikkerErSendtForBedrift(
                        orgnr,
                        context.bedrifterSomHarSendtMetrikker
                    )
                );
            }
        });
    }
};
