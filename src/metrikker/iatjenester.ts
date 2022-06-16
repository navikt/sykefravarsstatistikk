import { useContext, useEffect } from 'react';
import { tilIsoDatoMedUtcTimezoneUtenMillis } from '../utils/app-utils';
import { iaTjenesterMetrikkerContext, TjenestePerOrgnr } from './IaTjenesterMetrikkerContext';
import { useOrgnr } from '../hooks/useOrgnr';

interface IaTjenesteMetrikk {
    orgnr: String;
    altinnRettighet: String;
    type: String;
    kilde: String;
    tjenesteMottakkelsesdato: String;
}
export enum IaTjenesteKilde {
    SYKEFRAVÆRSSTATISTIKK = 'SYKEFRAVÆRSSTATISTIKK',
    KALKULATOR = 'KALKULATOR',
}
const erMetrikkerSendtForKilde = (
    orgnr: string | undefined,
    sendteMetrikker: [TjenestePerOrgnr],
    kilde: IaTjenesteKilde
) => {
    return sendteMetrikker.some(
        (tjenestePerOrgnr) => tjenestePerOrgnr.orgnr === orgnr && tjenestePerOrgnr.kilde === kilde
    );
};

export const erIaTjenesterMetrikkerSendtForBedrift = (
    orgnr: string | undefined,
    sendteMetrikker: [TjenestePerOrgnr],
    kilde: IaTjenesteKilde = IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK
): boolean => {
    if (orgnr === undefined) {
        return true;
    } else {
        return erMetrikkerSendtForKilde(orgnr, sendteMetrikker, kilde);
    }
};

export const iaTjenesterMetrikkerErSendtForBedrift = (
    orgnr: string | undefined,
    sendteMetrikker: [TjenestePerOrgnr],
    kilde: IaTjenesteKilde = IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK
): [TjenestePerOrgnr] => {
    if (
        orgnr !== undefined &&
        !erMetrikkerSendtForKilde(orgnr,sendteMetrikker,kilde)
    ) {
        sendteMetrikker.push({ orgnr: orgnr, kilde: kilde });
    }
    return sendteMetrikker;
};

const getIaTjenesterMetrikkerUrl = () => {
    switch (window.location.hostname) {
        case 'localhost':
            return 'http://localhost:8080/ia-tjenester-metrikker';
        case 'arbeidsgiver.nav.no':
            return 'https://arbeidsgiver.nav.no/ia-tjenester-metrikker';
        default:
            return 'https://ia-tjenester-metrikker.dev.intern.nav.no';
    }
};

const iaTjenesterMetrikkerAPI = `${getIaTjenesterMetrikkerUrl()}/innlogget/mottatt-iatjeneste`;

function byggIaTjenesteMottattMetrikk(
    nåværendeOrgnr: string | undefined,
    kilde: string = IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK
) {
    const iaTjenesteMetrikk: IaTjenesteMetrikk = {
        orgnr: nåværendeOrgnr ?? '',
        kilde: kilde,
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

export const useSendIaTjenesteMetrikkMottattVedSidevisningEvent = (
    kilde: IaTjenesteKilde = IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK,
    sendMetrikker: boolean = true
) => {
    const context = useContext(iaTjenesterMetrikkerContext);
    const orgnr = useOrgnr();

    useEffect(() => {
        const iaTjenesteMetrikk = byggIaTjenesteMottattMetrikk(orgnr, kilde);
        if (
            !erIaTjenesterMetrikkerSendtForBedrift(
                orgnr ?? '',
                context.bedrifterSomHarSendtMetrikker,
                kilde
            ) &&
            sendMetrikker
        ) {
            sendIaTjenesteMetrikk(iaTjenesteMetrikk).then((isSent) => {
                if (isSent) {
                    context.setBedrifterSomHarSendtMetrikker(
                        iaTjenesterMetrikkerErSendtForBedrift(
                            orgnr,
                            context.bedrifterSomHarSendtMetrikker,
                            kilde
                        )
                    );
                }
            });
        }
    }, [orgnr, context, kilde, sendMetrikker]);
};
