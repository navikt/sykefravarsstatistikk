import { EventData, useEkstraDataRef } from '../amplitude';
import { amplitudeClient } from '../client';

interface NavigereEventProperties {
    url: string;
    destinasjon?: string;
    lenketekst?: string;
}

type SendNavigereEvent = (navigereEventProperties: NavigereEventProperties & Object) => void;

export function useSendNavigereEvent(): SendNavigereEvent {
    const ekstradata = useEkstraDataRef();

    return (navigereEventProperties: NavigereEventProperties & EventData) => {
        const metadata = {
            app: 'sykefravarsstatistikk',
        };
        navigereEventProperties.url = navigereEventProperties.url.split('?')[0];
        amplitudeClient.logEvent('navigere', {
            ...metadata,
            ...ekstradata.current,
            ...navigereEventProperties,
        });
    };
};