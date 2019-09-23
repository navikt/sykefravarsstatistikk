import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Infopanel.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import illustrasjon from './forst-rrelse.svg';

const Infopanel: React.FunctionComponent = () => {
    return (
        <PanelBase className="infopanel">
            <img src={illustrasjon} alt="" />
            <div className="infopanel__tekst-wrapper">
                <Systemtittel className="infopanel__overskrift" tag="h2">
                    Se statistikk om virksomhetens sykefravær
                </Systemtittel>
                <Normaltekst>
                    NAV samler statistikk om sykefraværet i Norge. Her kan du sammenligne din
                    virksomhet med næringen og sektoren virksomheten tilhører.
                </Normaltekst>
            </div>
        </PanelBase>
    );
};

export default Infopanel;
