import React, {useContext} from 'react';
import {Hovedknapp} from 'nav-frontend-knapper';
import illustrasjonSvg from './statistikk-ikon.svg';
import {Normaltekst} from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './Innloggingsside.less';
import Sidetittel from 'nav-frontend-typografi/lib/sidetittel';
import {EnvironmentContext} from "../Context/EnvironmentContext";

interface Props {
  redirectUrl: string;
}

const Innloggingsside: React.FunctionComponent<Props> = ({redirectUrl}) => {
  const { MIN_SIDE_ARBEIDSGIVER_URL } = useContext(EnvironmentContext)
  const redirectTilLogin = () => {
    window.location.href = `/sykefravarsstatistikk/redirect-til-login?redirect=${redirectUrl}`;
  };

  return (
      <div className="innloggingsside__wrapper">
        <div className="innloggingsside">
          <img src={illustrasjonSvg} className="innloggingsside__illustrasjon" alt=""/>

          <Sidetittel className="innloggingsside__sidetittel">
            Sykefraværsstatistikk
          </Sidetittel>

          <Normaltekst className="innloggingsside__overskrift">
            Se statistikk om sykefraværet i din virksomhet og sammenligne dere med andre
            virksomheter. For å se statistikken må du logge inn. Tilgangstyringen skjer
            gjennom Altinn.
          </Normaltekst>

          <Lenke
              className="innloggingsside__lenke"
              href={
                  MIN_SIDE_ARBEIDSGIVER_URL + '/informasjon-om-tilgangsstyring'
              }
          >
            Les mer om roller og tilganger
          </Lenke>

          <Hovedknapp
              onClick={redirectTilLogin}
              className="innloggingsside__loginKnapp-wrapper"
          >
            Logg inn
          </Hovedknapp>
        </div>
      </div>
  );
};

export default Innloggingsside;
