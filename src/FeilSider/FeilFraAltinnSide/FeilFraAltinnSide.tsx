import React, {FunctionComponent} from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import './FeilFraAltinnSide.less';

const FeilFraAltinnSide: FunctionComponent = () => {
  return (
      <div className="feil-fra-altinn-side">
        <AlertStripe type="feil" className="feil-fra-altinn-side__alertstripe">
          Vi opplever ustabilitet med Altinn. Hvis du mener at du har roller i Altinn kan du
          prøve å{' '}
          <a href={document.location.href} className="feil-fra-altinn-side__lenke">
            laste siden på nytt
          </a>
        </AlertStripe>
      </div>
  );
};

export default FeilFraAltinnSide;
