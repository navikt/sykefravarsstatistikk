import React, { FunctionComponent } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import {PATH_FORSIDE, PATH_FORSIDE_BARNEHAGE, PATH_FORSIDE_GENERELL} from '../konstanter';

export const LegacyBarnehageSammenligningRedirect: FunctionComponent = () => {
    const location = useLocation();
    return <Redirect from={PATH_FORSIDE_BARNEHAGE} to={PATH_FORSIDE + location.search} />;
};

export const LegacySammenligningRedirect: FunctionComponent = () => {
    const location = useLocation();
    return <Redirect from={PATH_FORSIDE_GENERELL} to={PATH_FORSIDE + location.search} />;
};
