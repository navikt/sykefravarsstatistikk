import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import '../../felleskomponenter/Lenkepanel/Historikkpanel.less';
import { PaneltittelMedIkon } from '../PaneltittelMedIkon/PaneltittelMedIkon';

interface LenkepanelProps {
    overskrift: string;
    ikon: React.ReactNode;
}

export const Lenkepanel: FunctionComponent<LenkepanelProps> = (props) => {
    return (
        <PanelBase className="lenkepanel">
            <PaneltittelMedIkon src={props.ikon} alt="Dekorativt ikon">
              {props.overskrift}
            </PaneltittelMedIkon>
            {props.children}
        </PanelBase>
    );
};
