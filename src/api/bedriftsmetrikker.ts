import { RestRessurs, RestStatus } from './api-utils';
import { useEffect, useState } from 'react';
import { hentRestBedriftsmetrikker } from './api';
import amplitude from '../utils/amplitude';

export type Næringskode5Siffer = {
    kode: number;
    beskrivelse: string;
};

export interface Bedriftsmetrikker {
    næringskode5Siffer: Næringskode5Siffer;
    antallAnsatte: number;
}

export type RestBedriftsmetrikker = RestRessurs<Bedriftsmetrikker>;

export const useRestBedriftsmetrikker = (orgnr: string | undefined): RestBedriftsmetrikker => {
    const [restBedriftsmetrikker, setRestBedriftsmetrikker] = useState<RestBedriftsmetrikker>({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        if (orgnr) {
            setRestBedriftsmetrikker({
                status: RestStatus.IkkeLastet,
            });
            const hentRestBedriftsmetrikkerOgSettState = async () => {
                setRestBedriftsmetrikker(await hentRestBedriftsmetrikker(orgnr));
            };
            hentRestBedriftsmetrikkerOgSettState();
        }
    }, [orgnr]);

    return restBedriftsmetrikker;
};

export const trackBedriftsmetrikker = (målinger: Bedriftsmetrikker) => {
    let størrelse: string;
    const antallAnsatte = målinger.antallAnsatte;
    if (antallAnsatte === 0) {
        størrelse = 'ingen';
    } else if (antallAnsatte >= 1 && antallAnsatte <= 4) {
        størrelse = 'sma-1-4';
    } else if (antallAnsatte >= 5 && antallAnsatte <= 19) {
        størrelse = 'sma-5-19';
    } else if (antallAnsatte >= 20 && antallAnsatte <= 49) {
        størrelse = 'medium-20-49';
    } else if (antallAnsatte >= 50 && antallAnsatte <= 99) {
        størrelse = 'medium-50-99';
    } else {
        størrelse = '-store-100+';
    }
    amplitude.logEvent(`#sykefravarsstatistikk-segmentering-storrelse-${størrelse}`);
};
