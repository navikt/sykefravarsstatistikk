import amplitude from 'amplitude-js';
import {useOrgnr} from "./orgnr-hook";
import {useRestBedriftsmetrikker} from "../api/bedriftsmetrikker";
import {RestStatus} from "../api/api-utils";

const getApiKey = () => {
    return window.location.hostname === 'arbeidsgiver.nav.no'
        ? '3a6fe32c3457e77ce81c356bb14ca886'
        : '55477baea93c5227d8c0f6b813653615';
};

const instance = amplitude.getInstance();
instance.init(getApiKey(), '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
});

export const sendEvent = (område: string, hendelse: string, data?: Object): void => {
    console.log("Sender Event");
    console.log(data);
    if (hendelse === '') {
        // Ikke riktig bruk av loggingen. Hendelse skal alltid med.
        instance.logEvent(['#sykefravarsstatistikk', område].join('-'), data);
    } else {
        instance.logEvent(['#sykefravarsstatistikk', område, hendelse].join('-'), data);
    }
};

type SendEvent = (
    område: string, hendelse: string, data?: Object
) => void ;

export const useSendEvent: () => SendEvent = () => {
    const orgnr = useOrgnr();
    const restBedriftsmetrikker = useRestBedriftsmetrikker(orgnr);

    console.log(restBedriftsmetrikker);

    if (restBedriftsmetrikker.status === RestStatus.Suksess) {
        console.log("Sender Event fordi Status=Suksess");
        return (område: string, hendelse: string, data?: Object) => sendEvent(område, hendelse, {
            //næring: restBedriftsmetrikker.data.næringskode5Siffer.kode,
            næring: "12",
            //bransje: restBedriftsmetrikker.data.bransje, ...data
            bransje: "66", ...data
        });
    } else {
        console.log("Sender Event fordi Status!!!=Suksess");
        return (område: string, hendelse: string, data?: Object) => sendEvent(område, hendelse, data)
    }

};
