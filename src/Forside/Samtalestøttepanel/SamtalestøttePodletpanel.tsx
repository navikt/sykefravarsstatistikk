import React, { FunctionComponent } from "react";
import "./Samtalestøttepanel.less";
import "../../felleskomponenter/InternLenke/InternLenke.less";
import { SamtalestøttePodlet } from "../../microfrontends/microfrontends";
import PanelBase from "nav-frontend-paneler";
import { useOrgnr } from "../../utils/orgnr-hook";

const SamtalestøttePodletpanel: FunctionComponent = () => {
  const orgnr= useOrgnr();
    return (
        <PanelBase className="samtalestøttepanel">
            <SamtalestøttePodlet
                orgnr={orgnr}
                ekstraData={'emptyEkstradata'}
                visningsversjon={'sykefraværsstatistikk'}
            />
        </PanelBase>
    );
};

export default SamtalestøttePodletpanel;
