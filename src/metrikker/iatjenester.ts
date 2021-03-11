import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { RestVirksomhetMetadata } from '../api/virksomhetMetadata';
import { virksomhetMetadataContext } from '../utils/virksomhetMetadataContext';
import { enhetsregisteretContext, EnhetsregisteretState } from '../utils/enhetsregisteretContext';
import { RestStatus } from '../api/api-utils';
import { mapTilNæringsbeskrivelse } from '../amplitude/næringsbeskrivelser';
import { InstitusjonellSektorkode, RestOverordnetEnhet } from '../api/enhetsregisteret-api';

interface IaTjenesteMetrikkerEkstraData {
    bransje: string;
    antallAnsatte: number;
    næring2siffer: string;
    næring2SifferBeskrivelse: string;
    næringKode5Siffer: string;
    næringskode5SifferBeskrivelse: String;
    institusjonellSektorKode: InstitusjonellSektorkode;

    // TODO
    fylkesnummer: String;
    fylke: String;
    kommunenummer: String;
    kommune: String;
}

interface IatjenesteMetrikk {
    orgnr: String;
    næringKode5Siffer: String;
    type: String;
    kilde: String;
    tjenesteMottakkelsesdato: Date;
    antallAnsatte: number;
    næringskode5SifferBeskrivelse: String;
    næring2SifferBeskrivelse: String;
    SSBSektorKode: String;
    SSBSektorKodeBeskrivelse: String;
    fylkesnummer: String;
    fylke: String;
    kommunenummer: String;
    kommune: String;
}

const getIaTjenesterMetrikkerUrl = () => {
    switch (window.location.hostname) {
        case 'localhost':
            return 'http://localhost:8080/'
        case 'arbeidsgiver.nav.no':
            return 'https://arbeidsgiver.nav.no/ia-tjenester-metrikker/'
        default:
            return 'https://ia-tjenester-metrikker.dev.intern.nav.no/'
    }
};

const iaTjenesterMetrikkerAPI = `${getIaTjenesterMetrikkerUrl()}/innlogget/mottatt-iatjeneste`;

type SendIaTjenesteMetrikk = () => void;
export type EventData = { [key: string]: any };

export const useSendIaTjenesteMetrikkEvent = (): SendIaTjenesteMetrikk => {
    const ekstradata = useIaTjenesteMetrikkerEkstraDataRef();
    const iaTjenesteMetrikk: IatjenesteMetrikk = {
        orgnr: '',
        antallAnsatte: ekstradata.current.antallAnsatte ? ekstradata.current.antallAnsatte : 0,
        kilde: 'SYKEFRAVÆRSSTATISTIKK',
        type: 'DIGITAL_IA_TJENESTE',
        fylke: ekstradata.current.fylke ? ekstradata.current.fylke : '',
        fylkesnummer: ekstradata.current.fylkesnummer ? ekstradata.current.fylkesnummer : '',
        kommune: ekstradata.current.kommune ? ekstradata.current.kommune : '',
        kommunenummer: ekstradata.current.kommunenummer ? ekstradata.current.kommunenummer : '',
        næring2SifferBeskrivelse: ekstradata.current.næring2SifferBeskrivelse
            ? ekstradata.current.næring2SifferBeskrivelse
            : '',
        næringKode5Siffer: ekstradata.current.næringKode5Siffer
            ? ekstradata.current.næringKode5Siffer
            : '',
        næringskode5SifferBeskrivelse: ekstradata.current.næringskode5SifferBeskrivelse
            ? ekstradata.current.næringskode5SifferBeskrivelse
            : '',
        SSBSektorKode: ekstradata.current.institusjonellSektorKode
            ? ekstradata.current.institusjonellSektorKode.kode
            : '',
        SSBSektorKodeBeskrivelse: ekstradata.current.institusjonellSektorKode
            ? ekstradata.current.institusjonellSektorKode.beskrivelse
            : '',
        tjenesteMottakkelsesdato: new Date(),
    };

    return () => sendIATjenesteMetrikk(iaTjenesteMetrikk);
};


 // Method to be called when rendering component

export const useSendMottattIatjenesteEvent = (orgnr: string | undefined) => {
    const sendIaTjenesteMetrikk = useSendIaTjenesteMetrikkEvent();
    const skalSendeEvent = useRef(true);

    useEffect(() => {
        skalSendeEvent.current = true;
    }, [orgnr]);

    useEffect(() => {
        if (skalSendeEvent.current) {
            skalSendeEvent.current = false;
            sendIaTjenesteMetrikk();
        }
    }, [orgnr, sendIaTjenesteMetrikk]);
};


const useIaTjenesteMetrikkerEkstraDataRef = (): MutableRefObject<
    Partial<IaTjenesteMetrikkerEkstraData>
> => {
    const iaTjenesterMetrikkerEkstraData = useRef<Partial<IaTjenesteMetrikkerEkstraData>>({});

    const restVirksomhetMetadata = useContext<RestVirksomhetMetadata>(virksomhetMetadataContext);
    const dataFraEnhetsregisteret = useContext<EnhetsregisteretState>(enhetsregisteretContext);

    useEffect(() => {
        iaTjenesterMetrikkerEkstraData.current = {
            ...getIaTjenesteMetrikkerEkstraDataFraVirksomhetMetadata(restVirksomhetMetadata),
            ...getIaTjenesteMetrikkerEkstraDataFraEnhetsregisteret(
                dataFraEnhetsregisteret.restOverordnetEnhet,
                restVirksomhetMetadata
            ),
        };
    }, [restVirksomhetMetadata, dataFraEnhetsregisteret]);
    return iaTjenesterMetrikkerEkstraData;
};

export const sendIATjenesteMetrikk = async (iatjeneste: IatjenesteMetrikk) => {
    const settings = {
        method: 'POST',
        credentials: 'include',
        body: iatjeneste,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    try {
        // @ts-ignore
        const fetchResponse = await fetch(`${iaTjenesterMetrikkerAPI}`, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }
};

// Collecting the data:
// --------------------

export const getIaTjenesteMetrikkerEkstraDataFraVirksomhetMetadata = (
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<IaTjenesteMetrikkerEkstraData> => {
    if (restVirksomhetMetadata.status === RestStatus.Suksess) {
        const metrikker = restVirksomhetMetadata.data;
        const næringskode2siffer = metrikker.næringskode5Siffer.kode.substring(0, 2);

        return {
            antallAnsatte: metrikker.antallAnsatte,
            næring2siffer: næringskode2siffer,
            næring2SifferBeskrivelse: mapTilNæringsbeskrivelse(næringskode2siffer),
            næringKode5Siffer: metrikker.næringskode5Siffer.kode,
            næringskode5SifferBeskrivelse: metrikker.næringskode5Siffer.beskrivelse,
            bransje: metrikker.bransje,
        };
    }
    return {};
};

export const getIaTjenesteMetrikkerEkstraDataFraEnhetsregisteret = (
    restOverordnetEnhet: RestOverordnetEnhet,
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<IaTjenesteMetrikkerEkstraData> => {
    if (
        restVirksomhetMetadata.status === RestStatus.Suksess &&
        restOverordnetEnhet.status === RestStatus.Suksess
    ) {
        return {
            institusjonellSektorKode: restOverordnetEnhet.data.institusjonellSektorkode,
        };
    }
    return {};
};
