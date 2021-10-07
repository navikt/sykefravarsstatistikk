import React, { FunctionComponent } from 'react';
import InternLenke from './InternLenke/InternLenke';
import { PATH_HISTORIKK } from '../konstanter';

interface Props {
    kildeSomSendesMedEvent: string;
}
export const LenkeTilHistorikk: FunctionComponent<Props> = ({ kildeSomSendesMedEvent }) => {
    return (
        <InternLenke
            pathname={PATH_HISTORIKK}
        >
            Gå til sykefravær over tid
        </InternLenke>
    );
};
