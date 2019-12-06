import React from "react";
import PanelBase from "nav-frontend-paneler";
import informasjonsirkelSvg from "./informasjon-sirkel.svg";
import {Normaltekst, Systemtittel, Undertekst, UndertekstBold} from "nav-frontend-typografi";

const ManglerRettigheterIAltinnSide: React.FunctionComponent = () => {
    return (
        <PanelBase className="error-side-panel">
                <img src={informasjonsirkelSvg} className="error-side-panel__ikon" alt=""/>
            <div className="infopanel__tekst-wrapper">
                <Systemtittel className="infopanel__overskrift" tag="h2">
                    Du mangler rettigheter i Altinn
                </Systemtittel>
                <Normaltekst>
                    Du har ikke Altinn-tilgangen for å se sykefraværsstatistikk for denne virksomheten.
                </Normaltekst>
                <UndertekstBold>
                    For å se sykefraværsstatistikk kan du
                </UndertekstBold>
                <Undertekst>
                    Bytte til en virksomhet der du har tilgang til sykefraværsstatistikk
                </Undertekst>
                <Undertekst>
                    Be om tilgang til Altinn for denne virksomhet
                </Undertekst>
                <a
                    href="https://google.com"
                    className="lenke"
                >
                    Les mer om hvordan tilgangsstyringen i Altinn fungerer
                </a>

            </div>
        </PanelBase>
    );
};

export default ManglerRettigheterIAltinnSide;
