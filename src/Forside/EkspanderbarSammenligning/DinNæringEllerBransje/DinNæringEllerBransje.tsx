import React, {FunctionComponent} from 'react';
import næringEllerBransjeIkonSvg from './næring-eller-bransje-ikon.svg';
import {Normaltekst} from 'nav-frontend-typografi';
import './DinNæringEllerBransje.less';
import {RestStatus} from '../../../api/api-utils';
import EksternLenke from '../../../felleskomponenter/EksternLenke/EksternLenke';
import {Statistikkategori} from '../../../api/summert-sykefraværshistorikk-api';

interface Props {
  restStatus: RestStatus;
  statistikKategori?: Statistikkategori;
  label: string
}

export const DinNæringEllerBransje: FunctionComponent<Props> = ({
                                                                  restStatus,
                                                                  statistikKategori,
                                                                  label
                                                                }) => {
  if (restStatus !== RestStatus.Suksess) {
    return null;
  }

  let tekst;
  if (statistikKategori === Statistikkategori.BRANSJE) {
    tekst = (
        <>
          <strong>Du tilhører bransjen:</strong> {label}
        </>
    );
  } else if (statistikKategori === Statistikkategori.NÆRING) {
    tekst = (
        <>
          <strong>Du tilhører næringen:</strong> {label}
        </>
    );
  } else {
    return null;
  }

  return (
      <div className="din-næring-eller-bransje">
        <div className="din-næring-eller-bransje__ikon-og-tekst">
          <img
              className="din-næring-eller-bransje__ikon"
              src={næringEllerBransjeIkonSvg}
              alt=""
          />
          <Normaltekst>{tekst}</Normaltekst>
        </div>
        <div
            className="din-næring-eller-bransje__lenke-wrapper"
        >
          <EksternLenke
              href="https://www.altinn.no/skjemaoversikt/bronnoysundregistrene/samordnet-registermelding---registrering-av-nye-og-endring-av-eksisterende-foretak-og-enheter/"
          >
            Endre næringskode i Altinn
          </EksternLenke>
          <EksternLenke
              href="https://www.brreg.no/bedrift/naeringskoder/"
          >
            Om næringskoder i Brønnøysundregistrene
          </EksternLenke>
        </div>
      </div>
  );
};
