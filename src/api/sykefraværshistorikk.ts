import { RestRessurs, RestStatus } from './api-utils';
import { useEffect, useState } from 'react';
import { hentRestTapteDagsverk } from './api';

enum SykefraværshistorikkType {
    LAND = 'LAND',
    SEKTOR = 'SEKTOR',
    NÆRING = 'NÆRING',
    BRANSJE = 'BRANSJE',
    VIRKSOMHET = 'VIRKSOMHET'
}

export interface Sykefraværshistorikk {
    sykefraværsstatistikkType: SykefraværshistorikkType;
    label: string;

}[];

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
