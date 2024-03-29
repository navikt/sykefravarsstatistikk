import { hentInformasjonOmUnderenhet, RestUnderenhet } from '../api/underenheter-api';
import { RestRessurs, RestStatus } from '../../api/api-utils';
import { useEffect, useState } from 'react';
import { useOrgnr } from '../../hooks/useOrgnr';
import { hentInformasjonOmOverordnetEnhet, RestOverordnetEnhet } from '../api/enheter-api';
import { OverordnetEnhet } from '../domene/enhet';
import { Underenhet } from '../domene/underenhet';

const useRestDataForFlereVirksomheter = <T>(
    hentData: (orgnr: string) => Promise<RestRessurs<T>>,
    orgnr: string | undefined
): [RestRessurs<T>, DataForVirksomhet<T>[]] => {
    const [gjeldendeData, setGjeldendeData] = useState<RestRessurs<T>>({
        status: RestStatus.IkkeLastet,
    });

    const [dataForAlleVirksomheter, setDataForAlleVirksomheter] = useState<DataForVirksomhet<T>[]>(
        []
    );

    useEffect(() => {
        if (orgnr) {
            const dataOmGjeldendeVirksomhet = dataForAlleVirksomheter.find(
                (data) => data.orgnr === orgnr
            );

            if (dataOmGjeldendeVirksomhet) {
                setGjeldendeData(dataOmGjeldendeVirksomhet.restData);
            } else {
                setGjeldendeData({
                    status: RestStatus.IkkeLastet,
                });
                const hentRestDataOgSetState = async () => {
                    const restData = await hentData(orgnr);
                    setGjeldendeData(restData);
                    setDataForAlleVirksomheter([
                        ...dataForAlleVirksomheter,
                        {
                            orgnr: orgnr,
                            restData: restData,
                        },
                    ]);
                };
                hentRestDataOgSetState();
            }
        }
    }, [orgnr, dataForAlleVirksomheter, hentData]);

    return [gjeldendeData, dataForAlleVirksomheter];
};

export interface Enhetsregisterdata {
    restUnderenhet: RestUnderenhet;
    restOverordnetEnhet: RestOverordnetEnhet;
}

export function useEnheter(): Enhetsregisterdata {
    const underenhetOrgnr = useOrgnr();

    const [gjeldendeUnderenhet] = useRestDataForFlereVirksomheter<Underenhet>(
        hentInformasjonOmUnderenhet,
        underenhetOrgnr
    );
    const [gjeldendeOverordnetEnhet] = useRestDataForFlereVirksomheter<OverordnetEnhet>(
        hentInformasjonOmOverordnetEnhet,
        gjeldendeUnderenhet.status === RestStatus.Suksess
            ? gjeldendeUnderenhet.data.overordnetEnhet
            : undefined
    );
    return { restUnderenhet: gjeldendeUnderenhet, restOverordnetEnhet: gjeldendeOverordnetEnhet };
}

interface DataForVirksomhet<T> {
    orgnr: string;
    restData: RestRessurs<T>;
}
