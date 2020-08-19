import React, { FunctionComponent } from 'react';
import { Bransjetype, RestVirksomhetMetadata } from '../api/virksomhetMetadata';
import { Redirect, useLocation } from 'react-router-dom';
import { RestStatus } from '../api/api-utils';
import { PATH_FORSIDE_BARNEHAGE, PATH_FORSIDE_VANLIG } from '../App';

export const BarnehageRedirect: FunctionComponent<{
    restVirksomhetMetadata: RestVirksomhetMetadata;
}> = ({ restVirksomhetMetadata }) => {
    const location = useLocation();
    if (restVirksomhetMetadata.status !== RestStatus.Suksess) {
        return null;
    }
    if (restVirksomhetMetadata.data.bransje !== Bransjetype.BARNEHAGER) {
        return null;
    }
    return <Redirect to={PATH_FORSIDE_BARNEHAGE + location.search} />;
};

export const VanligForsideRedirect: FunctionComponent<{
    restVirksomhetMetadata: RestVirksomhetMetadata;
}> = ({ restVirksomhetMetadata }) => {
    const location = useLocation();
    if (restVirksomhetMetadata.status !== RestStatus.Suksess) {
        return null;
    }
    if (restVirksomhetMetadata.data.bransje === Bransjetype.BARNEHAGER) {
        return null;
    }
    return <Redirect to={PATH_FORSIDE_VANLIG + location.search} />;
};
