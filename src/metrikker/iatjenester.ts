import { BASE_PATH } from '../konstanter';
import {
    getIaMetrikkerApiUrl,
    MetrikkKilde,
    MetrikkType,
    sendIaMetrikk,
} from '@navikt/ia-metrikker-client';

export const iaTjenesterMetrikkerApiUrl = getIaMetrikkerApiUrl(BASE_PATH);

export const sendSykefraværsstatistikkIaMetrikk = async (orgnr: string) => {
    return sendIaMetrikk(
        orgnr,
        MetrikkType.DIGITAL_IA_TJENESTE,
        MetrikkKilde.SYKEFRAVÆRSSTATISTIKK,
        iaTjenesterMetrikkerApiUrl
    );
};