import { default as React, FunctionComponent } from 'react';
import { useOrgnr } from '../utils/orgnr-hook';
import { useSendSidevisningEvent } from '../amplitude/events';

export const Forside: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
    useSendSidevisningEvent('forside', orgnr);

    return (
        <div className="forside__wrapper">
            <div className="forside">{props.children}</div>
        </div>
    );
};
