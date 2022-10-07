import React, {FunctionComponent} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {PATH_FORSIDE} from '../konstanter';
import {getMinSideArbeidsgiverUrl} from './miljøUtils';

export const LegacyBarnehageSammenligningRedirect: FunctionComponent = () => {
  const location = useLocation();
  return <Navigate to={PATH_FORSIDE + location.search} replace={true}/>;
};

export const LegacySammenligningRedirect: FunctionComponent = () => {
  const location = useLocation();
  return <Navigate to={PATH_FORSIDE + location.search} replace={true}/>;
};

export const ManglerRettighetRedirect: FunctionComponent = () => {
  const minSideUrl = getMinSideArbeidsgiverUrl();
  window.location.href = minSideUrl;
  return null
};
