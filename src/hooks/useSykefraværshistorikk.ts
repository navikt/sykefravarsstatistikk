import {useEffect, useState} from 'react';
import {
  hentRestSykefraværshistorikk,
  RestSykefraværshistorikk,
} from '../api/kvartalsvis-sykefraværshistorikk-api';
import {RestStatus} from '../api/api-utils';
import {useOrgnr} from './useOrgnr';

export function useSykefraværshistorikk() {
  const orgnr = useOrgnr();
  const [restSykefraværshistorikk, setRestSykefraværshistorikk] =
      useState<RestSykefraværshistorikk>({status: RestStatus.IkkeLastet});

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
}
