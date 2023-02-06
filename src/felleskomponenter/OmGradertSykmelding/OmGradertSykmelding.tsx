import React from 'react';
import './OmGradertSykmelding.less';
import {Normaltekst} from 'nav-frontend-typografi';
import EksternLenke from '../EksternLenke/EksternLenke';
import {getTilpassetTittelOgTekstOmGradertSykmelding} from '../../Forside/vurderingstekster';
import { SykefraværVurdering } from "../../Forside/vurdering-utils";

interface Props {
  vurdering: SykefraværVurdering;
}

interface AvsnittProps {
  tittel: String;
  tekst: String;
}

export const OmGradertSykmelding = (props: Props) => {
  const tilpassetTittelOgTekstOmGradertSykmelding = getTilpassetTittelOgTekstOmGradertSykmelding(
      props.vurdering
  );

  const Avsnitt = (props: AvsnittProps) => (
      <div className="om-gradert-sykmelding__avsnitt">
        <Normaltekst>
          <strong>{props.tittel}</strong>
        </Normaltekst>
        <Normaltekst>{props.tekst}</Normaltekst>
      </div>
  );
  return (
      <div className="om-gradert-sykmelding">
        <Avsnitt
            tittel={tilpassetTittelOgTekstOmGradertSykmelding.tittel}
            tekst={tilpassetTittelOgTekstOmGradertSykmelding.tekst}
        />
        <Avsnitt
            tittel={'Du kan påvirke bruken av gradert sykmelding '}
            tekst={
                'Gradert sykmelding er et virkemiddel for å redusere langtidsfravær. ' +
                'God dialog mellom deg og medarbeideren din er en forutsetning for å benytte gradert sykmelding og iverksette tilretteleggingstiltak. ' +
                'Dette kan forhindre og forebygge langtids sykefravær og varig utstøtning fra arbeidslivet. '
            }
        />
        <EksternLenke
            href={
              'https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmelding-ulike-former/gradertsykemelding'
            }
        >
          Les mer om gradert sykmelding her
        </EksternLenke>
      </div>
  );
};
