import {useEffect, useState} from 'react';
import {hentRestvirksomhetsdata, RestVirksomhetsdata} from '../api/virksomhetsdata-api';
import {RestStatus} from '../api/api-utils';
import {useOrgnr} from './useOrgnr';

export function useVirksomhetsdata() {
  const orgnr = useOrgnr();
  const [restVirksomhetsdata, setRestVirksomhetsdata] = useState<RestVirksomhetsdata>({
    status: RestStatus.IkkeLastet,
  });

  useEffect(() => {
    if (orgnr) {
      setRestVirksomhetsdata({
        status: RestStatus.IkkeLastet,
      });
      const hentRestVirksomhetsdataOgSettState = async () => {
        setRestVirksomhetsdata(await hentRestvirksomhetsdata(orgnr));
      };
      hentRestVirksomhetsdataOgSettState();
    }
  }, [orgnr]);
  return restVirksomhetsdata;
}
