import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Infopanel.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import illustrasjon from './Forstørrelse.svg';

const Infopanel: React.FunctionComponent = () => {
    return (
        <PanelBase className="infopanel">
            <img src={illustrasjon} alt="" className="infopanel__illustrasjon" />
            <div className="infopanel__tekst-wrapper">
                <Systemtittel className="infopanel__overskrift" tag="h2">
                    Hvordan er sykefraværet deres sammenlignet med andre?
                </Systemtittel>
                <Normaltekst>
                    NAV og SSB utarbeider statistikk om sykefraværet i Norge. Her kan du sammenligne
                    sykefraværet i din virksomhet, med gjennomsnittet for virksomheter som tilhører
                    samme næring og sektor som deg.
                </Normaltekst>
            </div>
        </PanelBase>
    );
};

export default Infopanel;
