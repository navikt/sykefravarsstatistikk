import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { RestVirksomhetMetadata } from '../api/virksomhetMetadata';
import { hentRestVirksomhetMetadata } from '../api/api';
import { useOrgnr } from './orgnr-hook';

export const virksomhetMetadataContext = createContext<RestVirksomhetMetadata>({
    status: RestStatus.IkkeLastet,
});

export const VirksomhetMetadataProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
    const [restVirksomhetMetadata, setRestVirksomhetMetadata] = useState<RestVirksomhetMetadata>({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        if (orgnr) {
            setRestVirksomhetMetadata({
                status: RestStatus.IkkeLastet,
            });
            const hentRestVirksomhetMetadataOgSettState = async () => {
                setRestVirksomhetMetadata(await hentRestVirksomhetMetadata(orgnr));
            };
            hentRestVirksomhetMetadataOgSettState();
        }
    }, [orgnr]);

    const Provider = virksomhetMetadataContext.Provider;
    return <Provider value={restVirksomhetMetadata}>{props.children}</Provider>;
};
