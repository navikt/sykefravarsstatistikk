import React, { FunctionComponent, useContext } from 'react';
import './Samtalestøttepanel.less';
import '../../felleskomponenter/InternLenke/InternLenke.less';
import { SamtalestøttePodlet } from '../../microfrontends/microfrontends';
import PanelBase from 'nav-frontend-paneler';
import { orgnrContext } from '../../App';

const SamtalestøttePodletpanel: FunctionComponent = () => {
    const orgnr = useContext(orgnrContext);
    return (
        <PanelBase className="samtalestøttepanel">
            <SamtalestøttePodlet visning="PANEL_MED_IKON_OG_TEKST" orgnr={orgnr} />
        </PanelBase>
    );
};

export default SamtalestøttePodletpanel;
