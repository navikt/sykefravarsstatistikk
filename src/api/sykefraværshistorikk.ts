import { RestRessurs, RestStatus } from './api-utils';
import { useEffect, useState } from 'react';
import { hentRestSykefraværshistorikk } from './api';

enum SykefraværshistorikkType {
    LAND = 'LAND',
    SEKTOR = 'SEKTOR',
    NÆRING = 'NÆRING',
    BRANSJE = 'BRANSJE',
    VIRKSOMHET = 'VIRKSOMHET',
}

export type KvartalsvisSykefraværsprosent = {
    label: string;
    kvartal: number;
    årstall: number;
} & (
    | {
          erMaskert: true;
          prosent: null;
      }
    | {
          erMaskert: false;
          prosent: number;
      }
);

export interface Sykefraværshistorikk {
    type: SykefraværshistorikkType;
    label: string;
    kvartalsvisSykefraværsprosent: KvartalsvisSykefraværsprosent[];
}

export type RestSykefraværshistorikk = RestRessurs<Sykefraværshistorikk[]>;

export const useRestSykefraværshistorikk = (
    orgnr: string | undefined
): RestSykefraværshistorikk => {
    const [restSykefraværshistorikk, setRestSykefraværshistorikk] = useState<
        RestSykefraværshistorikk
    >({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        if (orgnr) {
            setRestSykefraværshistorikk({
                status: RestStatus.IkkeLastet,
            });
            const hentRestSykefraværshistorikkOgSettState = async () => {
                setRestSykefraværshistorikk(await hentRestSykefraværshistorikk(orgnr));
            };
            hentRestSykefraværshistorikkOgSettState();
        }
    }, [orgnr]);

    return restSykefraværshistorikk;
};
