import { useEffect, useRef } from 'react';
import { useSendEvent } from '../amplitude';

export const useSendSidevisningEvent = (område: string, orgnr: string | undefined) => {
    const sendEvent = useSendEvent();
    const skalSendeEvent = useRef(true);

    useEffect(() => {
        skalSendeEvent.current = true;
    }, [orgnr]);

    useEffect(() => {
        if (skalSendeEvent.current) {
            skalSendeEvent.current = false;

            // Setter timeout på eventet, slik at alle dataene fra "ekstradata" rekker å laste inn før eventet sendes.
            setTimeout(() => sendEvent(område, 'vist'), 2000);
        }
    }, [orgnr, område, sendEvent]);
};