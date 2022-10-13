import {useEffect, useState} from 'react';
import {RestStatus} from '../api/api-utils';
import {hentPubliseringsdatoer, RestPubliseringsdatoer} from "../api/publiseringsdatoer-api";

export function usePubliseringsdatoer() {
  const [restPubliseringsdatoer, setRestPubliseringsdatoer] =
      useState<RestPubliseringsdatoer>({
        status: RestStatus.LasterInn,
      });

  useEffect(() => {
    hentPubliseringsdatoer().then(
       setRestPubliseringsdatoer
    );
  }, []);
  return restPubliseringsdatoer;
}
