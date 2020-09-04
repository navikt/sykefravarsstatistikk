import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as GrafIkon } from './graf.svg';
import './Historikkpanel.less';
import { LenkeTilHistorikk } from '../../felleskomponenter/LenkeTilHistorikk';

const Historikkpanel: FunctionComponent = () => {
    return (
        <PanelBase className="historikkpanel">
            <Systemtittel className="historikkpanel__overskrift" tag="h2">
                <GrafIkon className="historikkpanel__illustrasjon" />
                Sykefraværshistorikk
            </Systemtittel>
            <Normaltekst className="historikkpanel__ingress">
                Se hvordan det legemeldte sykefraværet har endret seg de siste årene og se
                statistikken kvartalsvis.
            </Normaltekst>
            <LenkeTilHistorikk kildeSomSendesMedEvent="panel" />
        </PanelBase>
    );
};

export default Historikkpanel;
