import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';
import grafSvg from './graf.svg';
import './Historikkpanel.less';
import { LenkeTilHistorikk } from '../../felleskomponenter/LenkeTilHistorikk';
import { PaneltittelMedIkon } from '../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon';
import { PATH_HISTORIKK } from '../../konstanter';

const Historikkpanel: FunctionComponent = () => {
    return (
        <PanelBase className="historikkpanel">
            <PaneltittelMedIkon src={grafSvg} alt="grafikon">
                Sykefraværshistorikk
            </PaneltittelMedIkon>
            <Normaltekst className="historikkpanel__ingress">
                Se hvordan det legemeldte sykefraværet har endret seg de siste årene og se
                statistikken kvartalsvis.
            </Normaltekst>
            <LenkeTilHistorikk
                kildeSomSendesMedEvent="panel"
                pathname={PATH_HISTORIKK}
                sendEventOmråde={'forside historikk'}
                tekst={'Gå til sykefravær over tid'}
            />
        </PanelBase>
    );
};

export default Historikkpanel;
