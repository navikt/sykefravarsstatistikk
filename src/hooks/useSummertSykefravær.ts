import {useEffect, useState} from 'react';
import {
  hentRestSummertSykefraværshistorikk,
  RestSummertSykefraværshistorikk,
} from '../api/summert-sykefraværshistorikk-api';
import {RestStatus} from '../api/api-utils';
import {useOrgnr} from './useOrgnr';

export function useSummertSykefravær() {
  const orgnr = useOrgnr();
  const [restSummertSykefraværshistorikk, setRestSummertSykefraværshistorikk] =
      useState<RestSummertSykefraværshistorikk>({status: RestStatus.IkkeLastet});

  useEffect(() => {
    if (orgnr) {
      setRestSummertSykefraværshistorikk({
        status: RestStatus.IkkeLastet,
      });
      const hentRestSummertSykefraværshistorikkOgSettState = async () => {
        setRestSummertSykefraværshistorikk(
            await hentRestSummertSykefraværshistorikk(orgnr)
        );
      };
      hentRestSummertSykefraværshistorikkOgSettState();
    }
  }, [orgnr]);
  return restSummertSykefraværshistorikk;
}
