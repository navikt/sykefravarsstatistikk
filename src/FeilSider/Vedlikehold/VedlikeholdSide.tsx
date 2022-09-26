import React from 'react';
import {Normaltekst} from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import './VedlikeholdSide.less';


const VedlikeholdSide: React.FunctionComponent = () => {
  return (
      <div className="vedlikehold-side__wrapper">
        <div className="vedlikehold-side">
          <Alertstripe type="advarsel">
            Din statistikk er ikke tilgjengelig nå.
          </Alertstripe>

          <Normaltekst className="vedlikehold-side__overskrift">
            Vi forventer å vise statistikken igjen om noen timer.
          </Normaltekst>

          <Normaltekst className="vedlikehold-side__forklaring">
            Sykefraværsstatistikken bruker andre systemer som er utilgjengelig nå.
          </Normaltekst>
        </div>
      </div>
  );
};

export default VedlikeholdSide;
