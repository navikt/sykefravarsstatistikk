import { RestRessurs, RestStatus } from './api-utils';
import { useEffect, useState } from 'react';
import { hentRestTapteDagsverk } from './api';

export interface TapteDagsverk {
    tapteDagsverk: number;
    erMaskert: boolean;
}
export type RestTapteDagsverk = RestRessurs<TapteDagsverk>;

export const useRestTapteDagsverk = (orgnr: string | undefined): RestTapteDagsverk => {
    const [restTapteDagsverk, setRestTapteDagsverk] = useState<RestTapteDagsverk>({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        if (orgnr) {
            setRestTapteDagsverk({
                status: RestStatus.IkkeLastet,
            });
            const hentTapteDagsverkOgSettState = async () => {
                setRestTapteDagsverk(await hentRestTapteDagsverk(orgnr));
            };
            hentTapteDagsverkOgSettState();
        }
    }, [orgnr]);

    return restTapteDagsverk;
};
