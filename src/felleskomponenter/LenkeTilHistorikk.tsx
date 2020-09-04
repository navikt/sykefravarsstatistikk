import React, { FunctionComponent } from 'react';
import InternLenke from './InternLenke/InternLenke';
import { PATH_HISTORIKK } from '../App';
import { useSendEvent } from '../amplitude/amplitude';

export const LenkeTilHistorikk: FunctionComponent<{ kildeSomSendesMedEvent: string }> = ({
    kildeSomSendesMedEvent,
}) => {
    const sendEvent = useSendEvent();
    return (
        <InternLenke
            pathname={PATH_HISTORIKK}
            onClick={() =>
                sendEvent('forside historikk', 'klikk', { kilde: kildeSomSendesMedEvent })
            }
        >
            Gå til sykefravær over tid
        </InternLenke>
    );
};
