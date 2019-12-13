import React from "react";
import PanelBase from "nav-frontend-paneler";
import {Hovedknapp} from 'nav-frontend-knapper';
import illustrasjonSvg from "./statistikk-ikon.svg";
import {Normaltekst} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import environment from '../../utils/environment';
import './IkkeInnloggetSide.less';
import Sidetittel from "nav-frontend-typografi/lib/sidetittel";


const IkkeInnlogget: React.FunctionComponent = () => {
    const redirectTilLogin = () => {
        if (environment.MILJO === 'prod-sbs' || environment.MILJO === 'dev-sbs') {
            window.location.href = '/min-side-arbeidsgiver/redirect-til-login';
        } else {
            document.cookie = 'nav-esso=0123456789..*; path=/;';
            document.cookie = 'selvbetjening-idtoken =0123456789..*; path=/;';
            window.location.href = '/min-side-arbeidsgiver/';
        }
    };

    return (
        <div className="feilside">
            <PanelBase className="ikke-innlogget-side-panel">
                <div>
                    <img src={illustrasjonSvg}
                         className="ikke-innlogget-side-panel__illustrasjon" alt=""/>

                    <Sidetittel className="ikke-innlogget-side-panel__sidetittel">
                        Sykefraværsstatistikk
                    </Sidetittel>

                    <div className="ikke-innlogget-side-panel__tekst-wrapper">
                        <Normaltekst className="ikke-innlogget-side-panel__overskrift">
                            Se statistikk om sykefraværet i din virksomhet og sammenligne dere med andre virksomheter. For å se statistikken må du logge inn. Tilgangstyringen skjer gjennom Altinn.
                        </Normaltekst>
                        <Normaltekst className="ikke-innlogget-side-panel__overskrift">


                        </Normaltekst>

                        <Lenke className="ikke-innlogget-side-panel__lenke"
                               href={'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'}>
                            Les mer om roller og tilganger
                        </Lenke>

                        <div className="ikke-innlogget-side-panel__loginKnapp-wrapper">
                            <Hovedknapp onClick={redirectTilLogin}>
                                Logg inn
                            </Hovedknapp>
                        </div>
                    </div>
                </div>
            </PanelBase>
        </div>
    );
}

export default IkkeInnlogget;