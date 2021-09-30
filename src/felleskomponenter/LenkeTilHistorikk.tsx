import React, { FunctionComponent } from 'react';
import InternLenke from './InternLenke/InternLenke';
import { useSendEvent } from '../amplitude/events';
import { PATH_HISTORIKK } from '../konstanter';

interface Props {
    kildeSomSendesMedEvent: string;
}
export const LenkeTilHistorikk: FunctionComponent<Props> = ({ kildeSomSendesMedEvent }) => {
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
