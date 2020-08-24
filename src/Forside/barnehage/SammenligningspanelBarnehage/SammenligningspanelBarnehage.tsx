import React, { FunctionComponent, useRef } from 'react';
import './SammenligningspanelBarnehage.less';
import { Knapp } from 'nav-frontend-knapper';

export const SammenligningspanelBarnehage: FunctionComponent = (props) => {
    const panelRef = useRef();

    return (
        <div className="sammenligningspanel-barnehage">
            <Knapp className="sammenligningspanel-barnehage__knapp">Skriv ut</Knapp>
            {props.children}
        </div>
    );
};
