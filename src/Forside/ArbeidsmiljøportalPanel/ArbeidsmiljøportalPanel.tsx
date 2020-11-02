import React, { FunctionComponent } from 'react';
import './ArbeidsmiljøportalPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';

export const ArbeidsmiljøportalPanel: FunctionComponent = () => {
    return (
        <div className="arbeidsmiljøportal-panel">
            <Systemtittel>Dette påvirker arbeidsmiljøet i næringsmiddelindustrien</Systemtittel>
        </div>
    );
};
