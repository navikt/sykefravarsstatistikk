import React, { FunctionComponent } from "react";
import PanelBase from "nav-frontend-paneler";
import { Normaltekst } from "nav-frontend-typografi";
import lampeSvg from "./lampe.svg";
import "./Samtalestøttepanel.less";
import { LenkeTilHistorikk } from "../../felleskomponenter/LenkeTilHistorikk";
import { PaneltittelMedIkon } from "../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon";
import { PATH_SAMTALESTØTTE } from "../../konstanter";

const Samtalestøttepanel: FunctionComponent = () => {
    return (
        <PanelBase className="samtalestøttepanel">
            <PaneltittelMedIkon src={lampeSvg} alt="lampeikon">
                Forbered samtale med medarbeider!
            </PaneltittelMedIkon>
            <Normaltekst className="samtalestøttepanel__ingress">
                Samtaler rundt sykefravær kan være vanskelige. Vi har laget et verktøy for
                arbeidsgivere for å gjøre det lettere å forberede seg.
            </Normaltekst>
            <LenkeTilHistorikk kildeSomSendesMedEvent="panel"
            pathname={PATH_SAMTALESTØTTE}
            sendEventOmråde={'forside samtalestøtte'}
            tekst={'Gå til samtalestøtten'}/>
        </PanelBase>
    );
}

export default Samtalestøttepanel;
