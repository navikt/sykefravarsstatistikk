import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Alert } from "@navikt/ds-react";
import './VedlikeholdSide.less';

const VedlikeholdSide: React.FunctionComponent = () => {
    return (
        <div className="vedlikehold-side__wrapper">
            <div className="vedlikehold-side">
                <Alert variant="warning">Din statistikk er ikke tilgjengelig nå.</Alert>

                <Normaltekst className="vedlikehold-side__overskrift">
                    Vi forventer å vise statistikken igjen om noen timer.
                </Normaltekst>

                <Normaltekst className="vedlikehold-side__forklaring">
                    Sykefraværsstatistikken bruker andre systemer som er utilgjengelig nå.
                </Normaltekst>
            </div>
        </div>
    );
};

export default VedlikeholdSide;
