import React, { FunctionComponent } from 'react';
import { Alert, Link } from '@navikt/ds-react';
import './FeilFraAltinnSide.css';

const FeilFraAltinnSide: FunctionComponent = () => {
    return (
        <div className="feil-fra-altinn-side">
            <Alert variant="error" className="feil-fra-altinn-side__alertstripe">
                Vi opplever ustabilitet med Altinn. Hvis du mener at du har roller i Altinn kan du
                prøve å <Link href={document.location.href}>laste siden på nytt</Link>
            </Alert>
        </div>
    );
};

export default FeilFraAltinnSide;
