import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { RestVirksomhetMetadata, VirksomhetMetadata } from '../api/virksomhetMetadata';
import { virksomhetMetadataContext } from '../utils/virksomhetMetadataContext';
import { enhetsregisteretContext, EnhetsregisteretState } from '../utils/enhetsregisteretContext';
import { RestStatus } from '../api/api-utils';
import { mapTilNæringsbeskrivelse } from '../amplitude/næringsbeskrivelser';
import {
    InstitusjonellSektorkode,
    OverordnetEnhet,
    RestOverordnetEnhet,
    RestUnderenhet,
    Underenhet,
} from '../api/enhetsregisteret-api';
import { useOrgnr } from '../utils/orgnr-hook';
import { tilIsoDatoMedUtcTimezoneUtenMillis } from '../utils/app-utils';
import { iaTjenesterMetrikkerContext } from './IaTjenesterMetrikkerContext';

interface IaTjenesteMetrikkerEkstraData {
    orgnr: String;
    bransje: string;
    antallAnsatte: number;
    næring2siffer: string;
    næring2SifferBeskrivelse: string;
    næringKode5Siffer: string;
    næringskode5SifferBeskrivelse: String;
    institusjonellSektorKode: InstitusjonellSektorkode;
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
    tjenesteMottakkelsesdato: String;
    antallAnsatte: number;
    næringskode5SifferBeskrivelse: String;
    næring2SifferBeskrivelse: String;
    ssbSektorKode: String;
    ssbSektorKodeBeskrivelse: String;
    fylkesnummer: String;
    fylke: String;
    kommunenummer: String;
    kommune: String;
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
export type EventData = { [key: string]: any };

function byggIaTjenesteMottattMetrikk(
    nåværendeOrgnr: string | undefined,
    ekstradata: React.MutableRefObject<Partial<IaTjenesteMetrikkerEkstraData>>
) {
    const iaTjenesteMetrikk: IatjenesteMetrikk = {
        orgnr: nåværendeOrgnr ? nåværendeOrgnr : '',
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
        ssbSektorKode: ekstradata.current.institusjonellSektorKode
            ? ekstradata.current.institusjonellSektorKode.kode
            : '',
        ssbSektorKodeBeskrivelse: ekstradata.current.institusjonellSektorKode
            ? ekstradata.current.institusjonellSektorKode.beskrivelse
            : '',
        tjenesteMottakkelsesdato: tilIsoDatoMedUtcTimezoneUtenMillis(new Date()),
    };
    return iaTjenesteMetrikk;
}

function byggDirekteIaTjenesteMottattMetrikk(
    nåværendeOrgnr: string | undefined,
    ekstradata: IaTjenesteMetrikkerEkstraData
) {
    const iaTjenesteMetrikk: IatjenesteMetrikk = {
        orgnr: nåværendeOrgnr ? nåværendeOrgnr : '',
        antallAnsatte: ekstradata.antallAnsatte ? ekstradata.antallAnsatte : 0,
        kilde: 'SYKEFRAVÆRSSTATISTIKK',
        type: 'DIGITAL_IA_TJENESTE',
        fylke: ekstradata.fylke ? ekstradata.fylke : '',
        fylkesnummer: ekstradata.fylkesnummer ? ekstradata.fylkesnummer : '',
        kommune: ekstradata.kommune ? ekstradata.kommune : '',
        kommunenummer: ekstradata.kommunenummer ? ekstradata.kommunenummer : '',
        næring2SifferBeskrivelse: ekstradata.næring2SifferBeskrivelse
            ? ekstradata.næring2SifferBeskrivelse
            : '',
        næringKode5Siffer: ekstradata.næringKode5Siffer ? ekstradata.næringKode5Siffer : '',
        næringskode5SifferBeskrivelse: ekstradata.næringskode5SifferBeskrivelse
            ? ekstradata.næringskode5SifferBeskrivelse
            : '',
        ssbSektorKode: ekstradata.institusjonellSektorKode
            ? ekstradata.institusjonellSektorKode.kode
            : '',
        ssbSektorKodeBeskrivelse: ekstradata.institusjonellSektorKode
            ? ekstradata.institusjonellSektorKode.beskrivelse
            : '',
        tjenesteMottakkelsesdato: tilIsoDatoMedUtcTimezoneUtenMillis(new Date()),
    };
    return iaTjenesteMetrikk;
}

export const useSendIaTjenesteMetrikkEvent = (): (() => Promise<boolean>) => {
    const ekstradata = useIaTjenesteMetrikkerEkstraDataRef();
    const nåværendeOrgnr = useOrgnr();
    const iaTjenesteMetrikk = byggIaTjenesteMottattMetrikk(nåværendeOrgnr, ekstradata);

    return () => sendIATjenesteMetrikk(iaTjenesteMetrikk);
};

export const sendIATjenesteMetrikk = async (iatjeneste: IatjenesteMetrikk) => {
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

// Assembling the data:
// --------------------

const useIaTjenesteMetrikkerEkstraDataRef = (): MutableRefObject<
    Partial<IaTjenesteMetrikkerEkstraData>
> => {
    const restVirksomhetMetadata = useContext<RestVirksomhetMetadata>(virksomhetMetadataContext);
    const dataFraEnhetsregisteret = useContext<EnhetsregisteretState>(enhetsregisteretContext);
    const iaTjenesterMetrikkerEkstraData = useRef<Partial<IaTjenesteMetrikkerEkstraData>>({});

    useEffect(() => {
        if (
            restVirksomhetMetadata.status === RestStatus.Suksess &&
            dataFraEnhetsregisteret.restUnderenhet.status === RestStatus.Suksess &&
            dataFraEnhetsregisteret.restOverordnetEnhet.status === RestStatus.Suksess
        ) {
            iaTjenesterMetrikkerEkstraData.current = {
                ...getIaTjenesteMetrikkerEkstraDataFraVirksomhetMetadata(restVirksomhetMetadata),
                ...getIaTjenesteMetrikkerEkstraDataFraEnhetsregisteret(
                    dataFraEnhetsregisteret.restOverordnetEnhet,
                    dataFraEnhetsregisteret.restUnderenhet,
                    restVirksomhetMetadata
                ),
            };
        }
    }, [restVirksomhetMetadata, dataFraEnhetsregisteret]);

    return iaTjenesterMetrikkerEkstraData;
};

const byggIaTjenesteMetrikkerEkstraData = (
    virksomhetMetadata: VirksomhetMetadata,
    underenhet: Underenhet,
    overordnetEnhet: OverordnetEnhet
): IaTjenesteMetrikkerEkstraData => {
    const næringskode2siffer = virksomhetMetadata.næringskode5Siffer.kode.substring(0, 2);
    const næringsBeskrivelse = mapTilNæringsbeskrivelse(næringskode2siffer);
    return {
        antallAnsatte: virksomhetMetadata.antallAnsatte,
        næring2siffer: næringskode2siffer,
        næring2SifferBeskrivelse:
            næringsBeskrivelse === undefined ? 'INGEN_NÆRING' : næringsBeskrivelse,
        næringKode5Siffer: virksomhetMetadata.næringskode5Siffer.kode,
        næringskode5SifferBeskrivelse: virksomhetMetadata.næringskode5Siffer.beskrivelse,
        bransje:
            virksomhetMetadata.bransje === undefined ? 'INGEN_BRANSJE' : virksomhetMetadata.bransje,
        orgnr: underenhet.orgnr,
        institusjonellSektorKode: overordnetEnhet.institusjonellSektorkode,
        fylkesnummer: 'IKKE_TILGJENGELIG',
        fylke: 'IKKE_TILGJENGELIG',
        kommunenummer: underenhet.beliggenhetsadresse.kommunenummer,
        kommune: underenhet.beliggenhetsadresse.kommune,
    };
};

const getIaTjenesteMetrikkerEkstraDataFraVirksomhetMetadata = (
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

const getIaTjenesteMetrikkerEkstraDataFraEnhetsregisteret = (
    restOverordnetEnhet: RestOverordnetEnhet,
    restUnderenhet: RestUnderenhet,
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<IaTjenesteMetrikkerEkstraData> => {
    if (
        restVirksomhetMetadata.status === RestStatus.Suksess &&
        restOverordnetEnhet.status === RestStatus.Suksess &&
        restUnderenhet.status === RestStatus.Suksess
    ) {
        return {
            orgnr: restUnderenhet.data.orgnr,
            institusjonellSektorKode: restOverordnetEnhet.data.institusjonellSektorkode,
            fylkesnummer: 'IKKE_TILGJENGELIG',
            fylke: 'IKKE_TILGJENGELIG',
            kommunenummer: restUnderenhet.data.beliggenhetsadresse.kommunenummer,
            kommune: restUnderenhet.data.beliggenhetsadresse.kommune,
        };
    }
    return {};
};

export const useSendIaTjenesteMetrikkMottattVedSidevisningEvent = () => {
    const context = useContext(iaTjenesterMetrikkerContext);
    const restVirksomhetMetadata = useContext<RestVirksomhetMetadata>(virksomhetMetadataContext);
    const enhetsregisteretState = useContext<EnhetsregisteretState>(enhetsregisteretContext);
    const orgnr = useOrgnr();

    useEffect(() => {
        if (
            restVirksomhetMetadata.status === RestStatus.Suksess &&
            enhetsregisteretState.restUnderenhet.status === RestStatus.Suksess &&
            enhetsregisteretState.restOverordnetEnhet.status === RestStatus.Suksess
        ) {
            const virksomhetMetadata = restVirksomhetMetadata.data;
            const overordnetEnhet = enhetsregisteretState.restOverordnetEnhet.data;
            const underenhet = enhetsregisteretState.restUnderenhet.data;
            const ekstradata = byggIaTjenesteMetrikkerEkstraData(
                virksomhetMetadata,
                underenhet,
                overordnetEnhet
            );
            const iaTjenesteMetrikk = byggDirekteIaTjenesteMottattMetrikk(orgnr, ekstradata);
            const eriaTjenesteMetrikkKlarTilUtsending = iaTjenesteMetrikk.fylkesnummer !== '';

            if (eriaTjenesteMetrikkKlarTilUtsending) {
                let timerFunc = setTimeout(() => {
                    const erIaTjenesterMetrikkerSendtForDenneBedrift =
                        erIaTjenesterMetrikkerSendtForBedrift(
                            orgnr,
                            context.bedrifterSomHarSendtMetrikker
                        );
                    if (!erIaTjenesterMetrikkerSendtForDenneBedrift) {
                        sendIATjenesteMetrikk(iaTjenesteMetrikk).then((isSent) => {
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
                }, 5000);
                return () => clearTimeout(timerFunc);
            }
        }
    }, [
        useOrgnr(),
        useContext<EnhetsregisteretState>(enhetsregisteretContext),
        useContext<RestVirksomhetMetadata>(virksomhetMetadataContext),
    ]);
};
