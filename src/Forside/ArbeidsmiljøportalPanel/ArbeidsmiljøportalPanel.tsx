import React, { FunctionComponent } from 'react';
import './ArbeidsmiljøportalPanel.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Nyhet } from '../../felleskomponenter/Nyhet/Nyhet';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';

export const ArbeidsmiljøportalPanel: FunctionComponent = () => {
    return (
        <div className="arbeidsmiljøportal-panel">
            <Nyhet />
            <Systemtittel>Dette påvirker arbeidsmiljøet i næringsmiddelindustrien</Systemtittel>
            <Normaltekst>
                Arbeidsmiljøet handler om hvordan vi planlegger, organiserer og gjennomfører selve
                jobben. For å forebygge arbeidsrelatert sykefravær, bør du vite hvor skoen trykker.
            </Normaltekst>
            <ul>
                <li className="arbeidsmiljøportal-panel__listeelement">
                    Se forebyggingspotensialet i næringsmiddelindustrien
                </li>
                <li className="arbeidsmiljøportal-panel__listeelement">
                    Verktøy tilpasset din bransje
                </li>
            </ul>
            <EksternLenke href="#">Gå til Arbeidsmiljøportalen</EksternLenke>
        </div>
    );
};
