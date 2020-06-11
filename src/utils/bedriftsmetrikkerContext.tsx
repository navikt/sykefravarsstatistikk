import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { RestBedriftsmetrikker } from '../api/bedriftsmetrikker';
import { hentRestBedriftsmetrikker } from '../api/api';
import { useOrgnr } from './orgnr-hook';

export const bedriftsmetrikkerContext = createContext<RestBedriftsmetrikker>({
    status: RestStatus.IkkeLastet,
});

export const BedriftsmetrikkerProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
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

    const Provider = bedriftsmetrikkerContext.Provider;
    return <Provider value={restBedriftsmetrikker}>{props.children}</Provider>;
};
