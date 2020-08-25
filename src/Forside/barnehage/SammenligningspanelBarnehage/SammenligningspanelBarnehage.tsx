import React, { FunctionComponent, useRef } from 'react';
import './SammenligningspanelBarnehage.less';
import { Knapp } from 'nav-frontend-knapper';
import ReactToPrint from 'react-to-print';

export const SammenligningspanelBarnehage: FunctionComponent = (props) => {
    const panelRef = useRef<HTMLDivElement>(null);

    return (
        <div className="sammenligningspanel-barnehage" ref={panelRef}>
            <ReactToPrint
                content={() => panelRef.current}
                trigger={() => (
                    <Knapp className="sammenligningspanel-barnehage__knapp">Skriv ut</Knapp>
                )}
            />
            {props.children}
        </div>
    );
};
