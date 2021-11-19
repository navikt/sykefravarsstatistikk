import { useContext, useEffect } from 'react';
import { tilIsoDatoMedUtcTimezoneUtenMillis } from '../utils/app-utils';
import { iaTjenesterMetrikkerContext } from './IaTjenesterMetrikkerContext';
import { useOrgnr } from '../hooks/useOrgnr';

interface IaTjenesteMetrikk {
    orgnr: String;
    altinnRettighet: String;
    type: String;
    kilde: String;
    tjenesteMottakkelsesdato: String;
}

export const erIaTjenesterMetrikkerSendtForBedrift = (
    orgnr: string | undefined,
    sendteMetrikker: [string]
): boolean => {
    if (orgnr === undefined) {
        return true;
    } else {
        return sendteMetrikker.includes(orgnr);
    }
};

export const iaTjenesterMetrikkerErSendtForBedrift = (
    orgnr: string | undefined,
    sendteMetrikker: [string]
): [string] => {
    if (orgnr !== undefined) {
        sendteMetrikker.push(orgnr);
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

function byggIaTjenesteMottattMetrikk(nåværendeOrgnr: string | undefined) {
    const iaTjenesteMetrikk: IaTjenesteMetrikk = {
        orgnr: nåværendeOrgnr ?? '',
        kilde: 'SYKEFRAVÆRSSTATISTIKK',
        type: 'DIGITAL_IA_TJENESTE',
        tjenesteMottakkelsesdato: tilIsoDatoMedUtcTimezoneUtenMillis(new Date()),
        altinnRettighet: 'SYKEFRAVÆRSSTATISTIKK_FOR_VIRKSOMHETER',
    };
    return iaTjenesteMetrikk;
}

export const useSendIaTjenesteMetrikkEvent = (): (() => Promise<boolean>) => {
    const nåværendeOrgnr = useOrgnr();
    const iaTjenesteMetrikk = byggIaTjenesteMottattMetrikk(nåværendeOrgnr);

    return () => sendIaTjenesteMetrikk(iaTjenesteMetrikk);
};

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

export const useSendIaTjenesteMetrikkMottattVedSidevisningEvent = () => {
    const context = useContext(iaTjenesterMetrikkerContext);
    const orgnr = useOrgnr();

    useEffect(() => {
        const iaTjenesteMetrikk = byggIaTjenesteMottattMetrikk(orgnr);
        if (!erIaTjenesterMetrikkerSendtForBedrift(orgnr, context.bedrifterSomHarSendtMetrikker)) {
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
    }, [orgnr, context]);
};
