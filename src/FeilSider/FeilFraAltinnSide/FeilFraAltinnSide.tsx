import React, { FunctionComponent } from 'react';
import { Alert } from "@navikt/ds-react";
import './FeilFraAltinnSide.less';

const FeilFraAltinnSide: FunctionComponent = () => {
    return (
        <div className="feil-fra-altinn-side">
            <Alert variant="error" className="feil-fra-altinn-side__alertstripe">
                Vi opplever ustabilitet med Altinn. Hvis du mener at du har roller i Altinn kan du
                prøve å{' '}
                <a href={document.location.href} className="feil-fra-altinn-side__lenke">
                    laste siden på nytt
                </a>
            </Alert>
        </div>
    );
};

export default FeilFraAltinnSide;
