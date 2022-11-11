import React, { FunctionComponent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH_FORSIDE } from '../konstanter';
import { getForebyggeFraværUrl, getMinSideArbeidsgiverUrl } from './miljøUtils';

export const LegacyBarnehageSammenligningRedirect: FunctionComponent = () => {
    const location = useLocation();
    return <Navigate to={PATH_FORSIDE + location.search} replace={true} />;
};

export const LegacySammenligningRedirect: FunctionComponent = () => {
    const location = useLocation();
    return <Navigate to={PATH_FORSIDE + location.search} replace={true} />;
};

export const KalkulatorRedirect: FunctionComponent = () => {
    window.location.href = getForebyggeFraværUrl() + '/kalkulator';
    return null;
};

export const ManglerRettighetRedirect: FunctionComponent = () => {
    window.location.href = getMinSideArbeidsgiverUrl();
    return null;
};
