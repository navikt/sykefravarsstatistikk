import React from "react";
import PanelBase from "nav-frontend-paneler";
import informasjonsirkelSvg from "./informasjon-sirkel.svg";
import {Element, Normaltekst, Systemtittel} from "nav-frontend-typografi";
import './ManglerRettigheterIAltinnSide.less'
import Lenke from "nav-frontend-lenker";

const ManglerRettigheterIAltinnSide: React.FunctionComponent = () => {
    return (
        <div className="mangler-rettigheter-i-altinn__wrapper">
            <div className="mangler-rettigheter-i-altinn">
                <PanelBase className="mangler-rettigheter-i-altinn-panel">
                    <div className="mangler-rettigheter-i-altinn-panel__tekst-wrapper">
                        <div className="mangler-rettigheter-i-altinn-panel__tekst_og_ikon">
                            <img src={informasjonsirkelSvg}
                                 className="mangler-rettigheter-i-altinn-panel__tekst_og_ikon__ikon" alt=""/>
                            <Systemtittel tag="h2">
                                Du mangler rettigheter i Altinn
                            </Systemtittel>
                        </div>

                        <Normaltekst className="mangler-rettigheter-i-altinn-panel__overskrift">
                            Du har ikke Altinn-tilgangen for å se sykefraværsstatistikk for denne virksomheten.
                        </Normaltekst>
                        <Element className="mangler-rettigheter-i-altinn-panel__overskrift">
                            For å se sykefraværsstatistikk kan du
                        </Element>
                        <ul className="mangler-rettigheter-i-altinn-panel__list-wrapper">
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
                        <Lenke className="mangler-rettigheter-i-altinn-panel__lenke"
                               href={'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'}>
                            Les mer om hvordan tilgangsstyringen i Altinn fungerer
                        </Lenke>
                    </div>
                </PanelBase>
            </div>
        </div>
    );
};

export default ManglerRettigheterIAltinnSide;
