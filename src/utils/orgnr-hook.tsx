import { useLocation } from 'react-router';

export const useOrgnr = (): string | undefined => {
    const location = useLocation();
    const bedrift = new URLSearchParams(location.search).get('bedrift');

    if (bedrift === null) {
        return undefined;
    } else {
        return bedrift;
    }
};
