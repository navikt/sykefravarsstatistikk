import { FunctionComponent } from 'react';
import { getForebyggeFraværUrl, getMinSideArbeidsgiverUrl } from './miljøUtils';

export const KalkulatorRedirect: FunctionComponent = () => {
    window.location.replace(getForebyggeFraværUrl() + '/kalkulator');
    return null;
};

export const ManglerRettighetRedirect: FunctionComponent = () => {
    window.location.replace(getMinSideArbeidsgiverUrl());
    return null;
};
