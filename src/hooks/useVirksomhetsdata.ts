import { useContext, useEffect, useState } from 'react';
import { hentRestvirksomhetsdata, RestVirksomhetsdata } from '../api/virksomhetsdata-api';
import { RestStatus } from '../api/api-utils';
import { orgnrContext } from '../App';

export function useVirksomhetsdata() {
    const orgnr = useContext(orgnrContext);
    const [restVirksomhetsdata, setRestVirksomhetsdata] = useState<RestVirksomhetsdata>({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        if (orgnr) {
            setRestVirksomhetsdata({
                status: RestStatus.IkkeLastet,
            });
            const hentRestVirksomhetsdataOgSettState = async () => {
                setRestVirksomhetsdata(await hentRestvirksomhetsdata(orgnr));
            };
            hentRestVirksomhetsdataOgSettState();
        }
    }, [orgnr]);
    return restVirksomhetsdata;
}
