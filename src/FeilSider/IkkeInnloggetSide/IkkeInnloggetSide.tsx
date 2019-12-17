import React from "react";
import PanelBase from "nav-frontend-paneler";
import {Hovedknapp} from 'nav-frontend-knapper';
import illustrasjonSvg from "./statistikk-ikon.svg";
import {Normaltekst} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import './IkkeInnloggetSide.less';
import Sidetittel from "nav-frontend-typografi/lib/sidetittel";


export const IkkeInnloggetSide: React.FunctionComponent = () => {
    const redirectTilLogin = () => {
            window.location.href = '/sykefravarsstatistikk/redirect-til-login';
    };

    return (
        <div className="feilside__wrapper">
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
                                Se statistikk om sykefraværet i din virksomhet og sammenligne dere med andre
                                virksomheter. For å se statistikken må du logge inn. Tilgangstyringen skjer gjennom
                                Altinn.
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
        </div>
    );
}

export default IkkeInnloggetSide;
