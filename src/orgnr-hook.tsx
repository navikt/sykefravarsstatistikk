import { useLocation} from "react-router";
import * as queryString from 'query-string';

export const useOrgnr = (): string | undefined => {
    const location = useLocation();
    const { bedrift } = queryString.parse(location.search);

    if (bedrift === null) {
        return undefined;
    } else if (Array.isArray(bedrift)) {
        return bedrift[0];
    } else {
        return bedrift;
    }

};