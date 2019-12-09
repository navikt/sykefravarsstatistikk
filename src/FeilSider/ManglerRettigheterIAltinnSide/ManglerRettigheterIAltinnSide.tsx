import React from "react";
import PanelBase from "nav-frontend-paneler";
import informasjonsirkelSvg from "./informasjon-sirkel.svg";
import {Element, Normaltekst, Systemtittel} from "nav-frontend-typografi";
import './ManglerRettigheterIAltinnSide.less'
import Lenke from "nav-frontend-lenker";

const ManglerRettigheterIAltinnSide: React.FunctionComponent = () => {
    return (
        <div className="feilside">
            <PanelBase className="mangler-rettigheter-i-altinn-panel">
                <div className="mangler-rettigheter-i-altinn-panel__tekst-wrapper">
                    <div className="mangler-rettigheter-i-altinn-panel__tekst_og_ikon">
                        <img src={informasjonsirkelSvg} className="mangler-rettigheter-i-altinn-panel__tekst_og_ikon__ikon" alt=""/>
                        <Systemtittel tag="h2">
                            Du mangler rettigheter i Altinn
                        </Systemtittel>
                    </div>

                    <div className="mangler-rettigheter-i-altinn-panel__overskrift">
                        <Normaltekst>
                            Du har ikke Altinn-tilgangen for å se sykefraværsstatistikk for denne virksomheten.
                        </Normaltekst>
                    </div>
                    <div className="mangler-rettigheter-i-altinn-panel__overskrift">
                        <Element>
                            For å se sykefraværsstatistikk kan du
                        </Element>
                    </div>
                    <div className="mangler-rettigheter-i-altinn-panel__list-wrapper">
                        <ul>
                            <li>
                                <Normaltekst>
                                    Bytte til en virksomhet der du har tilgang til sykefraværsstatistikk
                                </Normaltekst>
                            </li>
                            <li>
                                <Normaltekst>
                                    Be om tilgang til Altinn for denne virksomhet
                                </Normaltekst>
                            </li>
                        </ul>
                    </div>
                    <div className="mangler-rettigheter-i-altinn-panel__lenke">
                        <Lenke href={'https://www.altinn.no/hjelp/profil/roller-og-rettigheter/'}>
                            Les mer om hvordan tilgangsstyringen i Altinn fungerer
                        </Lenke>
                    </div>
                </div>
            </PanelBase>
        </div>
    );
};

export default ManglerRettigheterIAltinnSide;
