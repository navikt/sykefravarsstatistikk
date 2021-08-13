import React, { FunctionComponent } from "react";
import "./Samtalestøttepanel.less";
import "../../felleskomponenter/InternLenke/InternLenke.less";
import { SamtalestøttePodlet } from "../../microfrontends/microfrontends";
import PanelBase from "nav-frontend-paneler";

const SamtalestøttePodletpanel: FunctionComponent = () => {

    return (
        <PanelBase className="samtalestøttepanel">
            <SamtalestøttePodlet/>
        </PanelBase>
    );
};

export default SamtalestøttePodletpanel;
