import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { RestVirksomhetsdata } from '../api/virksomhetsdata';
import { hentRestvirksomhetsdata } from '../api/api';
import { useOrgnr } from './orgnr-hook';

export const virksomhetsdataContext = createContext<RestVirksomhetsdata>({
    status: RestStatus.IkkeLastet,
});

export const VirksomhetsdataProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
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

    const Provider = virksomhetsdataContext.Provider;
    return <Provider value={restVirksomhetsdata}>{props.children}</Provider>;
};
