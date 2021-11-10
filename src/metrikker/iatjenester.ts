import { useContext, useEffect } from 'react';
import { useOrgnr } from '../utils/orgnr-hook';
import { tilIsoDatoMedUtcTimezoneUtenMillis } from '../utils/app-utils';
import { iaTjenesterMetrikkerContext } from './IaTjenesterMetrikkerContext';

interface IaTjenesteMetrikkForenklet {
    orgnr: String;
    altinnRettighet: String,
    type: String;
    kilde: String;
    tjenesteMottakkelsesdato: String;
}

export const erIaTjenesterMetrikkerSendtForBedrift = (
    orgnr: string | undefined,
    sendteMetrikker: [string],
): boolean => {
    if (orgnr === undefined) {
        return true;
    } else {
        return sendteMetrikker.includes(orgnr);
    }
};

export const iaTjenesterMetrikkerErSendtForBedrift = (
    orgnr: string | undefined,
    sendteMetrikker: [string],
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

const iaTjenesterMetrikkerAPI = `${getIaTjenesterMetrikkerUrl()}/innlogget/forenklet/mottatt-iatjeneste`;

function byggForenkletIaTjenesteMottattMetrikk(
    nåværendeOrgnr: string | undefined,
) {
    const iaTjenesteMetrikk: IaTjenesteMetrikkForenklet = {
        orgnr: nåværendeOrgnr ?? '',
        kilde: 'SYKEFRAVÆRSSTATISTIKK',
        type: 'DIGITAL_IA_TJENESTE',
        tjenesteMottakkelsesdato: tilIsoDatoMedUtcTimezoneUtenMillis(new Date()),
        altinnRettighet: '', // TODO: Finn ut hva dette skal være. Og på hvilket format?
    };
    return iaTjenesteMetrikk;
}

export const useSendIaTjenesteMetrikkEvent = (): (() => Promise<boolean>) => {
    const nåværendeOrgnr = useOrgnr();
    const iaTjenesteMetrikk = byggForenkletIaTjenesteMottattMetrikk(nåværendeOrgnr);

    return () => sendForenkletIATjenesteMetrikk(iaTjenesteMetrikk);
};

export const sendForenkletIATjenesteMetrikk = async (iatjeneste: IaTjenesteMetrikkForenklet) => {
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
        // TODO: Fjern logging før prodsetting
        console.log('Kall til ia-tjeneste-metrikker (', iaTjenesterMetrikkerAPI, ') gjennomført med data ', data);
        return data.status === 'created';
    } catch (e) {
        console.log('kall til ia-tjeneste-metrikker ', iaTjenesterMetrikkerAPI, ' feilet! ', e);
        return false;
    }
};

export const useSendIaTjenesteMetrikkMottattVedSidevisningEvent = () => {
    const context = useContext(iaTjenesterMetrikkerContext);
    const orgnr = useOrgnr();

    useEffect(() => {
        const iaTjenesteMetrikk = byggForenkletIaTjenesteMottattMetrikk(orgnr);
        const erIaTjenesterMetrikkerSendtForDenneBedrift =
            erIaTjenesterMetrikkerSendtForBedrift(
                orgnr,
                context.bedrifterSomHarSendtMetrikker,
            );
        if (!erIaTjenesterMetrikkerSendtForDenneBedrift) {
            sendForenkletIATjenesteMetrikk(iaTjenesteMetrikk)
                .then((isSent) => {
                    if (isSent) {
                        context.setBedrifterSomHarSendtMetrikker(
                            iaTjenesterMetrikkerErSendtForBedrift(
                                orgnr,
                                context.bedrifterSomHarSendtMetrikker,
                            ),
                        );
                    }
                });
        }
    }, [useOrgnr()]);
};
