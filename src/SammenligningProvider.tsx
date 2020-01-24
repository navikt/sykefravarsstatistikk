import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useOrgnr } from './utils/orgnr-hook';
import {
    defaultSammenligning,
    RestSammenligning,
    RestSammenligningStatus,
} from './api/sammenligning';
import { hentRestSammenligning } from './api/sammenligningApi';

const defaultRestSammenligning: RestSammenligning = {
    status: RestSammenligningStatus.LasterInn,
    sammenligning: defaultSammenligning,
};

export const RestSammenligningContext = React.createContext(defaultRestSammenligning);

export const SammenligningProvider: FunctionComponent = props => {
    const [restSammenligningState, setRestSammenligningState] = useState<RestSammenligning>(
        defaultRestSammenligning
    );

    const orgnr = useOrgnr();

    useEffect(() => {
        if (!orgnr) {
            return;
        }
        setRestSammenligningState(defaultRestSammenligning);

        const getSammenligning = async () => {
            let restSammenligningResponse = await hentRestSammenligning(orgnr);
            setRestSammenligningState(restSammenligningResponse);
        };
        getSammenligning();
    }, [setRestSammenligningState, orgnr]);

    return (
        <RestSammenligningContext.Provider value={restSammenligningState}>
            {props.children}
        </RestSammenligningContext.Provider>
    );
};
