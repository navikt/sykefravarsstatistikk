import React, {useState} from 'react';
import './Banner.less';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {RestStatus} from '../api/api-utils';
import {AltinnOrganisasjon, RestAltinnOrganisasjoner} from '../api/altinnorganisasjon-api';
import {sendBedriftValgtEvent} from '../amplitude/events';

interface Props {
  tittel: string;
  restOrganisasjoner: RestAltinnOrganisasjoner;
}

const Banner: React.FunctionComponent<Props> = (props) => {
  const {tittel, restOrganisasjoner} = props;
  let altinnOrganisasjoner: AltinnOrganisasjon[] =
      restOrganisasjoner.status === RestStatus.Suksess ? restOrganisasjoner.data : [];

  const [bedriftValgtManueltFraLista, setBedriftValgtManueltFraLista] = useState(false);

  const sendEventHvisBedriftBlirManueltValgt = () => {
    if (bedriftValgtManueltFraLista) {
      sendBedriftValgtEvent();
    }
    setBedriftValgtManueltFraLista(true);
  };

  return (
      <Bedriftsmeny
          organisasjoner={altinnOrganisasjoner}
          sidetittel={tittel}
          onOrganisasjonChange={sendEventHvisBedriftBlirManueltValgt}
      />
  );
};

export default Banner;
