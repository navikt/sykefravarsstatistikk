import { useEffect, useRef } from 'react';
import { useSendEvent } from '../amplitude';

export const useTidsbrukEvent = (
    område: string,
    ...antallSekunderFørEventSendes: number[]
): void => {
    const sendEvent = useSendEvent();
    const antallSekunder = useRef<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            antallSekunder.current += 1;
            if (antallSekunderFørEventSendes.includes(antallSekunder.current)) {
                sendEvent(område, 'tidsbruk', {
                    sekunder: antallSekunder.current,
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [antallSekunderFørEventSendes, område, sendEvent]);
};
