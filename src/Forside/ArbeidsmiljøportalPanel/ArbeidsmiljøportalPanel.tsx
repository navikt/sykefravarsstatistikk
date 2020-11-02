import React, { FunctionComponent } from 'react';
import './ArbeidsmiljøportalPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Nyhet } from '../../felleskomponenter/Nyhet/Nyhet';

export const ArbeidsmiljøportalPanel: FunctionComponent = () => {
    return (
        <div className="arbeidsmiljøportal-panel">
            <Nyhet />
            <Systemtittel>Dette påvirker arbeidsmiljøet i næringsmiddelindustrien</Systemtittel>
        </div>
    );
};
